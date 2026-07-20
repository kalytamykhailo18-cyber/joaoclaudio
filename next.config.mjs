import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [] },
  // Redirecionamentos de MIGRAÇÃO (URLs do site WordPress antigo indexadas no Google).
  // Ficam aqui (nível do framework) por serem estáticos e críticos — 100% confiáveis,
  // sem depender do middleware/banco. Redirecionamentos gerenciáveis pelo cliente
  // continuam na coleção `redirects` + middleware.
  async redirects() {
    return [
      { source: "/inicial", destination: "/", permanent: true },
      { source: "/links", destination: "/", permanent: true },
      { source: "/terapia-regenerativa", destination: "/tratamentos/medicina-regenerativa", permanent: true },
      { source: "/especialista-em-joelho", destination: "/joelho", permanent: true },
      { source: "/especialista-em-ombro", destination: "/ombro", permanent: true },
      { source: "/especialista-em-quadril", destination: "/quadril", permanent: true },
      { source: "/especialista-em-coluna", destination: "/coluna", permanent: true },
    ];
  },
};

export default withPayload(nextConfig);
