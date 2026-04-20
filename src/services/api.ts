import axios from 'axios';

export const api = axios.create({
  baseURL:  'http://localhost:3000'  
});

//'https://api.tagarelinha.com/v1', // URL do servidor da equipe de Back


api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');

  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})