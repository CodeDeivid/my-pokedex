import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Card } from './components/Card/Card';
import { SkeletonCard } from './components/SkeletonCard/SkeletonCard';
import { renderPagination } from './components/Pagination/Pagination';
import { getAllPokemonNames, getPokemonDetails } from './services/api';
import { PokedexStore } from './store/usePokedexStore';
import { debounce } from './utils';

export class PokedexApp {
  private store: PokedexStore;
  private appElement: HTMLDivElement;

  private listElement: HTMLElement | null = null;
  private searchElement: HTMLInputElement | null = null;

  constructor(rootSelector: string) {
    this.store = new PokedexStore();
    const el = document.querySelector<HTMLDivElement>(rootSelector);

    if (!el) {
      throw new Error(`Elemento raiz '${rootSelector}' não encontrado.`);
    }

    this.appElement = el;
  }

  public async init() {
    this.renderLayout();
    this.cacheDomElements();
    this.bindEvents();

    await this.fetchInitialData();
  }

  private renderLayout() {
    this.appElement.innerHTML = `
      ${Header()}
      
      <main>
        <h1 class="sr-only">Pokédex - Lista de Pokémon</h1>

        <div class="container">
          ${SearchBar()}
          
          <div id="pokemon-list" class="pokemon-grid" aria-live="polite"></div>
        </div>
      </main>

      <footer>
        <div id="pagination"></div>
      </footer>
    `;
  }

  private cacheDomElements() {
    this.listElement = document.getElementById('pokemon-list');
    this.searchElement = document.getElementById('search-input') as HTMLInputElement;
  }

  private bindEvents() {
    if (!this.searchElement) return;

    const handleInput = debounce((e: Event) => {
      const target = e.target as HTMLInputElement;
      const term = target.value.toLowerCase().trim();

      this.store.filter(term);
      this.renderPage();
    }, 300);

    this.searchElement.addEventListener('input', handleInput as EventListener);
  }

  private async fetchInitialData() {
    this.showLoading();

    try {
      const allPokemon = await getAllPokemonNames();
      this.store.setGlobalList(allPokemon);
      this.renderPage();
    } catch (error) {
      console.error('Falha ao inicializar:', error);
      this.renderError();
    }
  }

  private async renderPage() {
    this.showLoading();

    const pageItems = this.store.getPageData();

    if (pageItems.length === 0) {
      this.renderEmpty();
      this.updatePagination();
      return;
    }

    try {
      const urls = pageItems.map(p => p.url);
      const details = await getPokemonDetails(urls);

      if (this.listElement) {
        this.listElement.innerHTML = details.map((p, i) => Card(p, i)).join('');
      }

      this.updatePagination();

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error(error);
      this.renderError();
    }
  }

  private updatePagination() {
    renderPagination('pagination', {
      currentPage: this.store.getCurrentPage(),
      totalPages: this.store.getTotalPages(),
      onPageChange: (page) => {
        this.store.setCurrentPage(page);
        this.renderPage();
      }
    });
  }

  private showLoading() {
    if (this.listElement) {
      this.listElement.innerHTML = Array(this.store.ITEMS_PER_PAGE).fill(SkeletonCard()).join('');
    }
  }

  private renderEmpty() {
    if (this.listElement) {
      this.listElement.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--color-text-gray); padding: 40px;">
          <p>Nenhum Pokémon encontrado com este termo.</p>
        </div>
      `;
    }
  }

  private renderError() {
    if (this.listElement) {
      this.listElement.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: #d32f2f;">
          <p>Ocorreu um erro ao carregar os dados. Por favor, recarregue a página.</p>
        </div>
      `;
    }
  }
}