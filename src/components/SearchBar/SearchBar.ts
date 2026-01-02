import './SearchBar.css';

export function SearchBar(): string {
  return `
    <form class="search-container" role="search" onsubmit="return false;">
      <label for="search-input" class="sr-only">Buscar Pokémon</label>

      <input
        type="search"
        id="search-input"
        class="search-input"
        placeholder="Faça uma busca pelo nome do pokémon"
        autocomplete="off"
      />
      
      <button type="submit" class="search-icon-btn" aria-label="Realizar busca" tabindex="-1">
        <svg class="search-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  `;
}
