export default function PrivacyPolicy() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-kai-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
            PRIVACY <span className="text-kai-red">POLICY</span>
          </h1>
          <p className="text-kai-muted text-lg max-w-xl mx-auto">
            Last updated: July 12, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-kai-deeper">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            {/* Information We Collect */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Information We Collect</h2>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                When you make a booking through our website, we collect the following information:
              </p>
              <ul className="text-kai-muted text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Your name</li>
                <li>Your phone number</li>
                <li>Your email address (optional)</li>
                <li>Booking details (station, date, time slot)</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">How We Use Your Information</h2>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                We use your information solely to:
              </p>
              <ul className="text-kai-muted text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Process and confirm your gaming station booking</li>
                <li>Contact you via WhatsApp or phone to confirm your reservation</li>
                <li>Send booking notifications to our internal team via Discord</li>
              </ul>
            </div>

            {/* Data Storage */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Data Storage</h2>
              <p className="text-kai-muted text-sm leading-relaxed">
                Booking data is stored in Firebase Firestore, a cloud database service provided by Google. Your data is protected by Firebase security rules and is only accessible to authorized KaiGaming admin accounts. We do not sell, share, or transfer your personal information to third parties.
              </p>
            </div>

            {/* Discord Notifications */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Discord Notifications</h2>
              <p className="text-kai-muted text-sm leading-relaxed">
                When you make a booking, a notification containing your booking details (name, phone, email, station, date, time) is sent to a private Discord channel used by our team for operational purposes. This notification is not publicly visible and is only accessible to authorized KaiGaming staff.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Third-Party Services</h2>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                Our website uses the following third-party services:
              </p>
              <ul className="text-kai-muted text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li><strong>Firebase</strong> — Authentication and database (Google LLC)</li>
                <li><strong>Google Maps</strong> — Embedded map on our Contact page (Google LLC)</li>
                <li><strong>Discord</strong> — Internal booking notifications (Discord Inc.)</li>
              </ul>
              <p className="text-kai-muted text-sm leading-relaxed mt-4">
                Each service has its own privacy policy. We encourage you to review them.
              </p>
            </div>

            {/* Your Rights */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Your Rights</h2>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-kai-muted text-sm leading-relaxed space-y-2 list-disc list-inside">
                <li>Request deletion of your booking data</li>
                <li>Request a copy of the data we hold about you</li>
                <li>Opt out of any non-essential data collection</li>
              </ul>
              <p className="text-kai-muted text-sm leading-relaxed mt-4">
                To exercise these rights, contact us via WhatsApp or email.
              </p>
            </div>

            {/* Contact */}
            <div className="card-neo p-6 sm:p-8">
              <h2 className="text-xl font-black mb-4 text-kai-red">Contact Us</h2>
              <p className="text-kai-muted text-sm leading-relaxed">
                If you have any questions about this privacy policy, please contact us at{' '}
                <a href="mailto:kaigaming2k25@gmail.com" className="text-kai-red font-bold hover:underline">kaigaming2k25@gmail.com</a>{' '}
                or via WhatsApp at +91 9730093803.
              </p>
            </div>

            {/* Copyright Disclaimer */}
            <div className="card-neo p-6 sm:p-8 border-kai-red">
              <h2 className="text-xl font-black mb-4 text-kai-red">Copyright Disclaimer</h2>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                All game titles, cover art, logos, and related imagery displayed on this website are the intellectual property of their respective owners and publishers (e.g., Sony Interactive Entertainment, Rockstar Games, EA Sports, Bandai Namco, 2K Games, etc.).
              </p>
              <p className="text-kai-muted text-sm leading-relaxed mb-4">
                These images are used here solely for identification and informational purposes to indicate the games available at our gaming cafe. KaiGaming does not claim ownership of any game-related trademarks, copyrights, or intellectual property.
              </p>
              <p className="text-kai-muted text-sm leading-relaxed">
                All game images used on this site were sourced from public search results and are used under fair use for informational purposes. If you are a rights holder and wish to have your image removed, please contact us at{' '}
                <a href="mailto:kaigaming2k25@gmail.com" className="text-kai-red font-bold hover:underline">kaigaming2k25@gmail.com</a>{' '}
                and we will promptly remove the content.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
