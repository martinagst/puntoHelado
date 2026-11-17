import { useRef } from "react";
import { useLocation } from "wouter";

export default function Circulo() {
  const [, navigate] = useLocation();

  const toques = useRef(0);
  const temporizador = useRef(null);

  const handleClick = () => {
    toques.current += 1;
    clearTimeout(temporizador.current);

    if (toques.current >= 4) {
      toques.current = 0;
      navigate("/login-admin");
      return;
    }

    temporizador.current = setTimeout(() => {
      toques.current = 0;
    }, 2000);
  };

  return (
     <div
    onClick={handleClick}
    style={{
      position: "fixed",
      left: 45,
      bottom: 65,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background:
         "radial-gradient(circle, rgba(160,120,230,0.4) 0%, rgba(160,120,230,0) 70%)",
      filter: "blur(16px)",
      zIndex: 50,
      cursor: "default",
      userSelect: "none",
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
    }}
  />
  );
}