import { useNavigate } from "react-router-dom";
import imgOla from "../../../../assets/images-category-communication/Ola_Comunicacao.png";
import imgTachau from "../../../../assets/images-category-communication/Tchau_Comunicacao.png";
import imgSim from "../../../../assets/images-category-communication/Sim_Comunicacao.png";
import imgNao from "../../../../assets/images-category-communication/Nao_Comunicacao.png";
import imgObrigado from "../../../../assets/images-category-communication/Obrigado_Comunicacao.png";
import imgPorFavor from "../../../../assets/images-category-communication/PorFavor_Comunicacao.png";
import type { SymbolFromAPI, Category } from "../Interfaces/interfaces-symbols";
import { api, API_BASE_URL } from '../../../../services/api';
import { useEffect, useMemo, useState } from "react";

const audioCache = new Map<string, HTMLAudioElement>();
const imageMap: Record<string, string> = {
  "Olá": imgOla,
  "Tchau": imgTachau,
  "Sim": imgSim,
  "Não": imgNao,
  "Obrigado": imgObrigado,
  "Por favor": imgPorFavor
};

export default function Comunicacao() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [symbolsFromAPI, setSymbolsFromAPI] = useState<SymbolFromAPI[]>([])

  useEffect(() => {
    async function fetchCategoryId() {
      const response = await api.get("/api/categories");
      const categ_comunicacao = response.data.find((c: Category) => c.name === "Comunicação");
      if (categ_comunicacao) {
        setCategoryId(categ_comunicacao.id);
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

  const comunicacaoMap = useMemo(() => {
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
        Comunicação
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
        {comunicacaoMap.map((s, i) => (
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
