import type { Pokemon } from '../../domain/pokemon';
import './Card.css';

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  dark: '#705746',
  default: '#263156'
};

export function Card(pokemon: Pokemon, index: number = 0) {
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const allTypes = pokemon.types.join(' / ');

  const mainType = pokemon.types[0].toLowerCase();
  const typeColor = typeColors[mainType] || typeColors.default;

  return `
    <article class="pokemon-card" tabindex="0" aria-label="Pokémon ${pokemon.name}, tipos: ${allTypes}">
      <div class="card-header" aria-hidden="true">
        <span class="pokemon-type-text" style="color: ${typeColor}">
          ${allTypes}
        </span>
        <span class="pokemon-id">${formattedId}</span>
      </div>
      
      <img 
        class="pokemon-image" 
        src="${pokemon.image}" 
        alt="Ilustração oficial do ${pokemon.name}" 
        loading="eager" 
        fetchpriority="${index < 4 ? 'high' : 'auto'}"
        width="140" height="140"
        decoding="async"
        onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';"
      />
      
      <h2 class="pokemon-name">${pokemon.name}</h2>
    </article>
  `;
}