interface CircularGalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

declare const CircularGallery: (props: CircularGalleryProps) => JSX.Element;
export default CircularGallery;
