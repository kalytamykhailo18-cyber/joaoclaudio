// Observer compartilhado por todos os <Reveal> — um único IntersectionObserver
// para o site inteiro. Ao entrar na viewport, chama o callback do elemento
// (que atualiza o estado React do <Reveal>) em vez de mexer no className na mão
// — assim um re-render do componente não apaga a classe de revelado.
const callbacks = new WeakMap<Element, () => void>();
let io: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (io) return io;
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.();
          io?.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );
  return io;
}

// Observa `el`; chama `onShow` quando visível. Sem IO/SSR → revela na hora.
export function observeReveal(el: Element, onShow: () => void): (() => void) | void {
  const obs = getObserver();
  if (!obs) {
    onShow();
    return;
  }
  callbacks.set(el, onShow);
  obs.observe(el);
  return () => {
    obs.unobserve(el);
    callbacks.delete(el);
  };
}
