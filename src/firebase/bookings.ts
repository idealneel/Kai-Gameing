import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// ─── Types ───

export interface BookingData {
  stationId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  game?: string;
}

export interface Station {
  id: string;
  name: string;
  status: 'open' | 'closed' | 'full';
  games: string[];
}

export interface BookingRecord extends BookingData {
  id: string;
  createdAt: Timestamp;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// ─── Constants ───

export const TIME_SLOTS = [
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
  '21:00 - 22:00',
  '22:00 - 23:00',
];

export const DEFAULT_STATIONS: Omit<Station, 'id'>[] = [
  { name: 'PS5 Station 1', status: 'open', games: ['WWE 2K25', 'Spider-Man 2', 'God of War Ragnarok'] },
  { name: 'PS5 Station 2', status: 'open', games: ['FC25', 'Tekken 8', 'Mortal Kombat'] },
  { name: 'PS5 Station 3', status: 'open', games: ['GTA 5', 'Ghost of Tsushima', 'The Last of Us'] },
];

// ─── Station Operations ───

export async function getStations(): Promise<Station[]> {
  try {
    const snap = await getDocs(collection(db, 'stations'));
    if (snap.empty) {
      // Seed default stations
      for (const s of DEFAULT_STATIONS) {
        await addDoc(collection(db, 'stations'), s);
      }
      return getStations();
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Station));
  } catch {
    // Fallback to defaults if Firestore unavailable
    return DEFAULT_STATIONS.map((s, i) => ({ ...s, id: `station-${i + 1}` }));
  }
}

export async function updateStationStatus(
  stationId: string,
  status: 'open' | 'closed' | 'full'
): Promise<void> {
  await updateDoc(doc(db, 'stations', stationId), { status });
}

export function subscribeToStations(callback: (stations: Station[]) => void): () => void {
  return onSnapshot(collection(db, 'stations'), async (snap) => {
    if (snap.empty) {
      // Seed default stations on first load
      for (const s of DEFAULT_STATIONS) {
        await addDoc(collection(db, 'stations'), s);
      }
      return; // The snapshot listener will fire again after seeding
    }
    const stations = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Station));
    callback(stations);
  });
}

// ─── Discord Webhook ───

const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

async function sendDiscordEmbed(embed: object): Promise<boolean> {
  if (!DISCORD_WEBHOOK_URL) return false;
  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    return response.ok || response.status === 204;
  } catch {
    return false;
  }
}

// ─── Booking Operations ───

export async function createBooking(booking: BookingData): Promise<{ success: boolean; error?: string }> {
  try {
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...booking,
      createdAt: Timestamp.now(),
      status: 'pending',
    });

    // Find station name
    let stationName = booking.stationId;
    try {
      const stationDoc = await getDoc(doc(db, 'stations', booking.stationId));
      if (stationDoc.exists()) {
        stationName = stationDoc.data()?.name ?? stationName;
      }
    } catch {}

    // Send to Discord
    const embed = {
      title: 'New Booking Request',
      color: 0xf39c12, // Yellow = pending
      fields: [
        { name: 'Customer', value: booking.customerName, inline: true },
        { name: 'Phone', value: booking.customerPhone, inline: true },
        { name: 'Email', value: booking.customerEmail || 'Not provided', inline: true },
        { name: 'Station', value: stationName, inline: true },
        { name: 'Game', value: booking.game || 'Not specified', inline: true },
        { name: 'Date', value: booking.date, inline: true },
        { name: 'Time Slot', value: booking.timeSlot, inline: true },
        { name: 'Status', value: 'PENDING — Admin must confirm', inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'KaiGaming Booking System — Reply CONFIRM <booking_id> or CANCEL <booking_id>' },
    };

    const sent = await sendDiscordEmbed(embed);
    // Booking stays pending — admin confirms via Discord or admin panel
    if (!sent) {
      // If Discord fails, still create the booking but mark as needing attention
      await updateDoc(docRef, { status: 'pending', discordFailed: true });
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to create booking. Please try again.' };
  }
}

export async function getBookings(): Promise<BookingRecord[]> {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BookingRecord));
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<void> {
  await updateDoc(doc(db, 'bookings', bookingId), { status });
}

export async function deleteBooking(bookingId: string): Promise<void> {
  await deleteDoc(doc(db, 'bookings', bookingId));
}

export async function getBookingsForDate(date: string): Promise<BookingRecord[]> {
  const q = query(collection(db, 'bookings'), where('date', '==', date));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BookingRecord));
}

export async function getBusySlots(date: string): Promise<Map<string, string[]>> {
  const bookings = await getBookingsForDate(date);
  const busy = new Map<string, string[]>();
  for (const b of bookings) {
    if (b.status === 'cancelled') continue;
    const existing = busy.get(b.stationId) || [];
    existing.push(b.timeSlot);
    busy.set(b.stationId, existing);
  }
  return busy;
}

export function isSlotBusy(busySlots: Map<string, string[]>, stationId: string, timeSlot: string): boolean {
  const slots = busySlots.get(stationId) || [];
  return slots.includes(timeSlot);
}

export function subscribeToBookingsForDate(date: string, callback: (bookings: BookingRecord[]) => void): () => void {
  const q = query(collection(db, 'bookings'), where('date', '==', date));
  return onSnapshot(q, (snap) => {
    const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() } as BookingRecord));
    callback(bookings);
  });
}
