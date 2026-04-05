interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className={`my-6 grid gap-3 ${images.length === 1 ? "" : "sm:grid-cols-2"}`}>
      {images.map((img, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-radius-card border border-border-subtle bg-surface"
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
