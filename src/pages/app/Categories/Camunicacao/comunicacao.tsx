import { useNavigate } from "react-router-dom";
import imgDor from "../../../../assets/images-category-communication/Dor_Comunicacao.png";
import imgSim from "../../../../assets/images-category-communication/Sim_Comunicacao.png";
import imgNao from "../../../../assets/images-category-communication/Nao_Comunicacao.png";
import imgNaoGostei from "../../../../assets/images-category-communication/NaoGostei_Comunicacao.png";
import imgQuero from "../../../../assets/images-category-communication/Quero_Comunicacao.png";
import imgAjuda from "../../../../assets/images-category-communication/Ajuda_Comunicacao.png";

export default function Comunicacao() {
  const comunicacao = [
    { img: imgDor, label: "Dor", sound: "/sounds/dor.mp3" },
    { img: imgSim, label: "Sim", sound: "/sounds/sim.mp3" },
    { img: imgNao, label: "Não", sound: "/sounds/nao.mp3" },
    { img: imgNaoGostei, label: "Não Gostei", sound: "/sounds/naogostei.mp3" },
    { img: imgQuero, label: "Quero", sound: "/sounds/quero.mp3" },
    { img: imgAjuda, label: "Ajuda", sound: "/sounds/ajuda.mp3" },
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
        Clique em uma tag de Comunicação para ouvir o som:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {comunicacao.map((s, i) => (
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
