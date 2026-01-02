import type { Pokemon, PokemonListResponse, PokemonAPIResponse } from '../domain/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

let allPokemonCache: Array<{ name: string, url: string, id: number }> | null = null;

export async function getAllPokemonNames() {
  if (allPokemonCache) return allPokemonCache;

  try {
    const initialRes = await fetch(`${BASE_URL}/pokemon?limit=1`);
    const initialData: PokemonListResponse = await initialRes.json();
    const totalCount = initialData.count;

    const response = await fetch(`${BASE_URL}/pokemon?limit=${totalCount}`);
    const data: PokemonListResponse = await response.json();

    allPokemonCache = data.results.map(p => {
      const parts = p.url.split('/');
      const id = parseInt(parts[parts.length - 2]);

      return {
        name: p.name,
        url: p.url,
        id
      };
    });

    return allPokemonCache;
  } catch (error) {
    console.error('Erro ao buscar índice global:', error);
    return [];
  }
}

export async function getPokemonDetails(urls: string[]): Promise<Pokemon[]> {
  const promises = urls.map(async (url) => {
    const res = await fetch(url);
    const details: PokemonAPIResponse = await res.json();
    return {
      id: details.id,
      name: details.name,
      image: details.sprites.other['official-artwork'].front_default,
      types: details.types.map(t => t.type.name)
    };
  });

  return Promise.all(promises);
}
