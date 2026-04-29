import { useNavigate } from "react-router-dom";
import imgBasquete from "../../../../assets/images-category-entertainment/Basquete_Diversão.png";
import imgBicicleta from "../../../../assets/images-category-entertainment/Bicicleta_Diversao.png";
import imgBola from "../../../../assets/images-category-entertainment/Bola_Diversão.png";
import imgGame from "../../../../assets/images-category-entertainment/Game_Diversao.png";
import imgParque from "../../../../assets/images-category-entertainment/Parque_Diversao.png";
import imgPipa from "../../../../assets/images-category-entertainment/Pipa_Diversao.png";

export default function Diversao() {
  const diversoes = [
    { img: imgBasquete, label: "Basquete", sound: "/sounds/Basquete.mp3" },
    { img: imgBicicleta, label: "Bicicleta", sound: "/sounds/Bicicleta.mp3" },
    { img: imgBola, label: "Bola", sound: "/sounds/Bola.mp3" },
    { img: imgGame, label: "Game", sound: "/sounds/Game.mp3" },
    { img: imgParque, label: "Parque", sound: "/sounds/Parque.mp3" },
    { img: imgPipa, label: "Pipa", sound: "/sounds/Pipa.mp3" },
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
        Diversão
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          marginBottom: "2rem",
        }}
      >
        Clique em uma diversão para ouvir o som:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {diversoes.map((s, i) => (
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