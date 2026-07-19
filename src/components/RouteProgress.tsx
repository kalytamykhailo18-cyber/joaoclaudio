"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Barra de progresso no topo, exibida durante a navegação entre páginas.
// App Router navega no client; aqui damos um retorno visual de "carregando":
// começa ao clicar num link interno e completa quando a nova rota é montada.
export default function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);
  const lastPath = useRef<string>("");

  function start() {
    if (trickle.current) return; // já em andamento
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    setActive(true);
    setProgress(8);
    trickle.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p; // segura em 90% até a rota montar
        const inc = p < 40 ? 9 : p < 70 ? 4 : 1.5;
        return Math.min(90, p + inc);
      });
    }, 180);
  }

  function done() {
    if (trickle.current) { clearInterval(trickle.current); trickle.current = null; }
    setProgress(100);
    hideTimer.current = setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 280);
  }

  // Início: clique num link interno que troca de rota.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (a.hasAttribute("download") || (a.target && a.target !== "_self")) return;
      let url: URL;
      try { url = new URL(a.href, window.location.href); } catch { return; }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // mesma página / âncora
      start();
    }
    // Voltar/avançar do navegador: só mostra a barra em mudança real de rota
    // (ignora navegação de âncora #, que não altera o pathname).
    function onPopState() {
      if (window.location.pathname !== lastPath.current) start();
    }
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Fim: a rota mudou (nova página montada).
  useEffect(() => {
    lastPath.current = pathname;
    if (firstRender.current) { firstRender.current = false; return; }
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Limpeza dos timers ao desmontar.
  useEffect(() => () => {
    if (trickle.current) clearInterval(trickle.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  return (
    <div className={`route-progress${active ? " on" : ""}`} role="progressbar" aria-hidden={!active} aria-label="Carregando página">
      <div className="route-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
