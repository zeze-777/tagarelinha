import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.tagarelinha.com/v1', // URL do servidor da equipe de Back
});
