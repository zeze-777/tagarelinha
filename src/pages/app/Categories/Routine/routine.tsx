import { useNavigate } from "react-router-dom";
import imgAcordar from "../../../../assets/images-category-routine/Acordar_Rotina.png";
import imgAlmoco from "../../../../assets/images-category-routine/Almoco_Rotina.png";
import imgBanho from "../../../../assets/images-category-routine/Banho_Rotina.png";
import imgEscola from "../../../../assets/images-category-routine/Escola_Rotina.png";
import imgEscovarOsDentes from "../../../../assets/images-category-routine/Escovar_dentes_Rotina.png";
import imgJantar from "../../../../assets/images-category-routine/Jantar_Rotina.png";
import type { SymbolFromAPI, Category } from "../Interfaces/interfaces-symbols";
import { api, API_BASE_URL } from '../../../../services/api';
import { useEffect, useMemo, useState } from "react";

const audioCache = new Map<string, HTMLAudioElement>();
const imageMap: Record<string, string> = {
  "Acordar": imgAcordar,
  "Almoço": imgAlmoco,
  "Banho": imgBanho,
  "Escola": imgEscola,
  "Escovar os dentes": imgEscovarOsDentes,
  "Jantar": imgJantar
};

export default function Rotina() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
    const [symbolsFromAPI, setSymbolsFromAPI] = useState<SymbolFromAPI[]>([])
  
    useEffect(() => {
      async function fetchCategoryId() {
        const response = await api.get("/api/categories");
        const categ_comunicacao = response.data.find((c: Category) => c.name === "Rotinas");
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
  
    const routineMap = useMemo(() => {
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
        Rotina
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.3rem",
          marginBottom: "2rem",
        }}
      >
        Clique em uma tag de Rotina para ouvir o som:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {routineMap.map((s, i) => (
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
