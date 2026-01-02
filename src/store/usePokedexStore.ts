export interface PokemonData {
  name: string;
  url: string;
  id: number;
}

export class PokedexStore {
  private globalList: PokemonData[] = [];
  private filteredList: PokemonData[] = [];
  private currentPage: number = 1;
  public readonly ITEMS_PER_PAGE = 18;

  setGlobalList(list: PokemonData[]) {
    this.globalList = list;
    this.filteredList = list;
  }

  filter(term: string) {
    if (!term) {
      this.filteredList = this.globalList;
    } else {
      this.filteredList = this.globalList.filter(p =>
        p.name.includes(term) || p.id.toString().includes(term)
      );
    }
    this.currentPage = 1;
  }

  getPageData(): PokemonData[] {
    const start = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
    const end = start + this.ITEMS_PER_PAGE;
    return this.filteredList.slice(start, end);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPage() { return this.currentPage; }

  getTotalPages() {
    return Math.ceil(this.filteredList.length / this.ITEMS_PER_PAGE);
  }
}