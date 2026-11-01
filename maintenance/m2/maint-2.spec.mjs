import { test, expect } from '@playwright/test';
import { main, section, cards, cardFor, countText, expectText, expectHref } from './helpers.mjs';

test.describe('Change 2: generation pages', () => {
  test('shows a generation with its region and species', async ({ page }) => {
    await page.goto('/generations/generation-i');
    const m = main(page);
    await expect(m.getByRole('heading', { level: 1 })).toHaveText('Generation I');
    await expect(m.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page).toHaveTitle('Generation I – Pokédex');
    await expectText(m, /Region Kanto/);
    const pokemon = section(page, 'Pokémon');
    await expect(countText(pokemon, 151)).toBeVisible();
    await expect(cards(pokemon)).toHaveCount(151);
    await expect(cards(pokemon).first()).toContainText('Bulbasaur');
    await expect(cards(pokemon).first()).toContainText('#0001');
    await expect(cards(pokemon).last()).toContainText('Mew');
    await expectHref(cards(pokemon).first().getByRole('link'), '/pokemon/bulbasaur');
  });

  test('includes species added after the build', async ({ page }) => {
    await page.goto('/generations/generation-ix');
    await expectText(main(page), /Region Paldea/);
    const pokemon = section(page, 'Pokémon');
    await expect(countText(pokemon, 121)).toBeVisible();
    await expect(cardFor(pokemon, /Benchmon/)).toHaveCount(1);
  });

  test('links the Pokémon page to its generation', async ({ page }) => {
    await page.goto('/pokemon/pikachu');
    await expectHref(main(page).getByRole('link', { name: 'Generation I', exact: true }), '/generations/generation-i');
    await page.goto('/pokemon/benchmon');
    await expectHref(main(page).getByRole('link', { name: 'Generation IX', exact: true }), '/generations/generation-ix');
  });

  test('unknown generations show the not-found page', async ({ page }) => {
    await page.goto('/generations/generation-x');
    await expect(main(page).getByRole('heading', { level: 1 })).toHaveText('Not found');
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('follows the rendering mode', async ({ page }) => {
      const response = await page.goto('/generations/generation-i');
      const html = await response.text();
      if (process.env.RENDER_MODE === 'ssr') await expect(main(page)).toContainText('Kanto');
      if (process.env.RENDER_MODE === 'csr') expect(html).not.toContain('Kanto');
    });
  });
});
