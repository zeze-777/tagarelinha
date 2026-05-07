import { useNavigate } from "react-router-dom";
import imgBasquete from "../../../../assets/images-category-entertainment/Basquete_Diversão.png";
import imgBicicleta from "../../../../assets/images-category-entertainment/Bicicleta_Diversao.png";
import imgBola from "../../../../assets/images-category-entertainment/Bola_Diversão.png";
import imgGame from "../../../../assets/images-category-entertainment/Game_Diversao.png";
import imgParque from "../../../../assets/images-category-entertainment/Parque_Diversao.png";
import imgPipa from "../../../../assets/images-category-entertainment/Pipa_Diversao.png";
import type { SymbolFromAPI, Category } from "../Interfaces/interfaces-symbols";
import {api, API_BASE_URL} from '../../../../services/api'
import { useEffect, useState, useMemo } from "react";

const audioCache = new Map<string, HTMLAudioElement>();

const imageMap: Record<string, string> = {
    "Basquete": imgBasquete,
    "Bicicleta": imgBicicleta,
    "Bola": imgBola,
    "Game": imgGame,
    "Parque": imgParque,
    "Pipa": imgPipa,
  };

export default function Diversao() {
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
      const categ_diversao = response.data.find((c: Category) => c.name === "Diversão");
      
      if (categ_diversao) {
        setCategoryId(categ_diversao.id);
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

  const diversaoMapeados = useMemo(() => {
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
      audio = new Audio(`${API_BASE_URL}${soundPath}`);
      audioCache.set(soundPath, audio);
    }
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
        {diversaoMapeados.map((s, i) => (
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
