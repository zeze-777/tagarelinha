import { Link } from "react-router-dom";
import imgFeliz from "../../../assets/images-category-feeling/Feliz_Sentimento.png";
import imgTriste from "../../../assets/images-category-feeling/Triste_Sentimento.png";
import imgBravo from "../../../assets/images-category-feeling/Bravo_Sentimento.png";
import imgSurpreso from "../../../assets/images-category-feeling/Surpreso_Sentimento.png";
import imgCansado from "../../../assets/images-category-feeling/Cansado_Sentimento.png";
import imgConfuso from "../../../assets/images-category-feeling/Confuso_Sentimento.png";

export default function Sentimento() {
  const sentimentos = [
    { img: imgFeliz, label: "Feliz", sound: "/sounds/feliz.mp3" },
    { img: imgTriste, label: "Triste", sound: "/sounds/triste.mp3" },
    { img: imgBravo, label: "Bravo", sound: "/sounds/bravo.mp3" },
    { img: imgSurpreso, label: "Surpreso", sound: "/sounds/surpreso.mp3" },
    { img: imgCansado, label: "Cansado", sound: "/sounds/cansado.mp3" },
    { img: imgConfuso, label: "Confuso", sound: "/sounds/confuso.mp3" },
  ];

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sentimento</h1>
      <p>Clique em um sentimento para ouvir o som:</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {sentimentos.map((s, i) => (
          <div
            key={i}
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => playSound(s.sound)} // ✅ agora chama a função
          >
            <img
              src={s.img}
              alt={s.label}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                borderRadius: "12px",
                border: "2px solid #ccc",
              }}
            />
            <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Botão para ir até /categories/sentimento/actions */}
      <Link to="/categories/sentimento/actions">
        <button style={{ marginTop: "2rem" }}>Ir para Ações</button>
      </Link>
    </div>
  );
}
