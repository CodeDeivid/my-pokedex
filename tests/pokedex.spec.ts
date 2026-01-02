import { test, expect } from '@playwright/test';

test.describe('Pokédex', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.pokemon-card').first()).toBeVisible({ timeout: 20000 });
  });

  test('Deve carregar a lista de pokemons', async ({ page }) => {
    await expect(page).toHaveTitle(/Pokédex/i);

    const cards = page.locator('.pokemon-card');
    await expect(cards).toHaveCount(18);

    await expect(cards.first()).toContainText(/bulbasaur/i);
  });

  test('Deve buscar o Pokemon Ditto', async ({ page }) => {
    await page.fill('#search-input', 'ditto');

    await expect(page.locator('.pokemon-card')).toHaveCount(1);
    await expect(page.locator('.pokemon-name')).toHaveText(/^ditto$/i);
  });

  test('Deve mostrar mensagem de "Não encontrado"', async ({ page }) => {
    await page.fill('#search-input', 'Digimon');
    await expect(page.getByText('Nenhum Pokémon encontrado com este termo.')).toBeVisible();
  });

  test('Deve funcionar a paginação', async ({ page }) => {
    await page.click('#next-btn');

    await expect(page.locator('.page-number.active')).toHaveText('2');

    await expect(page.getByText('Bulbasaur')).not.toBeVisible();
  });
});