"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  client?: string;
  slot?: string;
  format?: string;
}

export default function AdSense({
  client = "ca-pub-xxxxxxxxxxxxxxxx",
  slot = "xxxxxxxxxx",
  format = "auto"
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carrega o script do Google AdSense
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Inicializa o anúncio quando o script for carregado
    script.onload = () => {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    };

    return () => {
      // Limpa o script quando o componente for desmontado
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={adRef}>
      <div className="ad-placeholder">
        <div className="ad-placeholder-text">Anúncio</div>
      </div>
      <ins
        className="adsbygoogle"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
