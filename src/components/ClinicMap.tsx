// Mapa do consultório (Google Maps embed sem chave de API — não custa nada e não
// exige billing). Lazy-load para não pesar no LCP.
//   full = variante de largura total / sem moldura (seção de tela cheia da home).
export default function ClinicMap({
  address,
  clinicName,
  full = false,
}: {
  address: string;
  clinicName: string;
  full?: boolean;
}) {
  const query = encodeURIComponent(`${clinicName} ${address}`);
  const src = `https://maps.google.com/maps?q=${query}&z=16&hl=pt-BR&output=embed`;
  return (
    <div className={full ? "clinic-map clinic-map-full" : "clinic-map"}>
      <iframe
        src={src}
        title={`Localização — ${clinicName}`}
        width="100%"
        height={full ? 560 : 360}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, display: "block" }}
        allowFullScreen
      />
    </div>
  );
}
