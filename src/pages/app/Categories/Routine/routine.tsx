import { useNavigate } from "react-router-dom";
import imgAcordar from "../../../../assets/images-category-routine/Acordar_Rotina.png";
import imgAlmoco from "../../../../assets/images-category-routine/Almoco_Rotina.png";
import imgBanho from "../../../../assets/images-category-routine/Banho_Rotina.png";
import imgEscola from "../../../../assets/images-category-routine/Escola_Rotina.png";
import imgEscovarOsDentes from "../../../../assets/images-category-routine/Escovar_dentes_Rotina.png";
import imgJantar from "../../../../assets/images-category-routine/Jantar_Rotina.png";

export default function Sentimento() {
  const routine = [
    { img: imgAcordar, label: "Acordar", sound: "/sounds/acordar.mp3" },
    { img: imgAlmoco, label: "Almoço", sound: "/sounds/almoco.mp3" },
    { img: imgBanho, label: "Banho", sound: "/sounds/banho.mp3" },
    { img: imgEscola, label: "Escola", sound: "/sounds/escola.mp3" },
    { img: imgEscovarOsDentes, label: "Escovar os Dentes", sound: "/sounds/escovarosdentes.mp3" },
    { img: imgJantar, label: "Jantar", sound: "/sounds/jantar.mp3" },
    ];

  const navigate = useNavigate();
  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>
        Sentimento
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          marginBottom: "2rem",
        }}
      >
        Clique em um sentimento para ouvir o som:
      </p>

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
            onClick={() => playSound(s.sound)}
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
                cursor: "pointer",
              }}
            />
            <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/app/categories")}
        className="bg-[#128298] text-[#FFFFFF] hover:bg-blue-600 font-bold rounded-full shadow-lg flex items-center justify-center uppercase"
        style={{
          position: "absolute",
          left: "100px",
          top: "550px",
          width: "70px",
          height: "25px",
        }}
      >
        Voltar
      </button>
    </div>
  );
}
