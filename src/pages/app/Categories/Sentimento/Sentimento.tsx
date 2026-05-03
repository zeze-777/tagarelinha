import { useNavigate } from "react-router-dom";
import imgFeliz from "../../../../assets/images-category-feeling/Feliz_Sentimento.png";
import imgTriste from "../../../../assets/images-category-feeling/Triste_Sentimento.png";
import imgBravo from "../../../../assets/images-category-feeling/Bravo_Sentimento.png";
import imgSurpreso from "../../../../assets/images-category-feeling/Surpreso_Sentimento.png";
import imgCansado from "../../../../assets/images-category-feeling/Cansado_Sentimento.png";
import imgConfuso from "../../../../assets/images-category-feeling/Confuso_Sentimento.png";
import type { SymbolFromAPI, Category } from "../Interfaces/interfaces-symbols";
import {api} from '../../../../services/api';
import { useEffect, useState, useMemo } from "react";

const audioCache = new Map<string, HTMLAudioElement>();

const imageMap: Record<string, string> = {
    "Feliz": imgFeliz,
    "Triste": imgTriste,
    "Bravo": imgBravo,
    "Surpreso": imgSurpreso,
    "Cansado": imgCansado,
    "Confuso": imgConfuso,
  };

export default function Sentimento() {
  const[categoryId, setCategoryId] = useState<string | null>(null);
  const [symbolsFromAPI, setSymbolsFromAPI] = useState<SymbolFromAPI[]>([])

  useEffect(() => {
    Object.values(imageMap).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    async function fetchCategoryId() {
      const response = await api.get("/api/categories");
      const categ_sentimento = response.data.find((c: Category) => c.name === "Sentimentos");
      
      if (categ_sentimento) {
        setCategoryId(categ_sentimento.id);
      }
    }
    fetchCategoryId();  
  }, []);

  useEffect(() => {
    if (!categoryId) return;

    async function fetchSymbols() {
      const response = await api.get(`/api/categories/${categoryId}/symbols/active`);
      setSymbolsFromAPI(response.data);
    }
    fetchSymbols();
  }, [categoryId]);

  const sentimentosMapeados = useMemo(() => {
    return symbolsFromAPI.map((item) => ({
      img: imageMap[item.title],
      label: item.title,
      sound: item.audio_url,
    }));
  }, [symbolsFromAPI]);
  

  const navigate = useNavigate();
  
  const playSound = (soundPath: string) => {
    let audio = audioCache.get(soundPath);
    if (!audio) {
      audio = new Audio(`http://localhost:3000${soundPath}`);
      audioCache.set(soundPath, audio);
    }
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
        {sentimentosMapeados.map((s, i) => (
          <div
            key={i}
            style={{ textAlign: "center", cursor: "pointer"}}
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