interface DefaultSectionProps {
  sectionTitle: string;
}

export default function DefaultSection({ sectionTitle }: DefaultSectionProps) {
  return (
    <p>
      Konten untuk bagian <strong>{sectionTitle}</strong> belum tersedia.
    </p>
  );
}
