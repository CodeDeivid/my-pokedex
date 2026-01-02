import './styles/variables.css';
import './styles/main.css';
import { PokedexApp } from './app';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const app = new PokedexApp('#app');
    app.init();
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
});