"use client";

import { useState, useEffect } from "react";

interface Title3DProps {
  text: string;
  className?: string;
}

export default function Title3D({ text, className = "" }: Title3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  const calculateRotation = () => {
    if (!isHovering) return { x: 0, y: 0 };

    // Get the element's position
    const element = document.querySelector(
      ".title-3d-container"
    ) as HTMLElement;
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the rotation based on mouse position relative to center
    const rotateY = ((mousePosition.x - centerX) / (rect.width / 2)) * 10;
    const rotateX = ((centerY - mousePosition.y) / (rect.height / 2)) * 10;

    return { x: rotateX, y: rotateY };
  };

  const rotation = calculateRotation();

  return (
    <div
      className={`title-3d-container relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <h1
        className="title-3d relative"
        style={{
          transform: isHovering
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : "perspective(1000px) rotateX(0) rotateY(0)",
          transition: isHovering ? "none" : "transform 0.5s ease-out",
        }}
      >
        {text}
      </h1>
    </div>
  );
}
