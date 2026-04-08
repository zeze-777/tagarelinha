export interface Action {
  id: string;
  name: string;
  image_url: string;
  audio_url: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
}