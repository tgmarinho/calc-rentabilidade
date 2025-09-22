"use client";

import { useState, useEffect, useRef } from "react";

interface Title3DProps {
  text: string;
  className?: string;
}

export default function Title3D({ text, className = "" }: Title3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering && titleRef.current) {
        const element = titleRef.current;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the rotation based on mouse position relative to center
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
        const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 10;

        setRotation({ x: rotateX, y: rotateY });

        // Aplicar a transformação diretamente para evitar estilos inline
        const titleElement = element.querySelector(".title-3d") as HTMLElement;
        if (titleElement) {
          titleElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div
      ref={titleRef}
      className={`title-3d-container relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });

        // Resetar a transformação quando sair do hover
        const titleElement = titleRef.current?.querySelector(
          ".title-3d"
        ) as HTMLElement;
        if (titleElement) {
          titleElement.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
      }}
    >
      <h1 className="title-3d relative">{text}</h1>
    </div>
  );
}
