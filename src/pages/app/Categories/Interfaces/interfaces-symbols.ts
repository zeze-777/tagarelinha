

export interface SymbolFromAPI {
  id: string;
  title: string;
  image_url: string;
  audio_url: string;
  is_active: boolean;
  category_id: string;
}
export interface Category {
  id: string;
  name: string;
}