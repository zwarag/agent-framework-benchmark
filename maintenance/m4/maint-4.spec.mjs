import { test, expect } from '@playwright/test';
import { section, cards, cardFor, textOf } from './helpers.mjs';

test.describe('Change 4: types on every Pokémon card', () => {
  test('move pages', async ({ page }) => {
    await page.goto('/moves/thunderbolt');
    await expect(cardFor(section(page, 'Learned by'), /Rattata/)).toContainText('Normal');
  });

  test('ability pages, in slot order', async ({ page }) => {
    await page.goto('/abilities/chlorophyll');
    const bulbasaur = cardFor(section(page, 'Pokémon'), /Bulbasaur/);
    await expect(bulbasaur).toHaveCount(1);
    expect(await textOf(bulbasaur)).toMatch(/Grass.*Poison/);
  });

  test('type pages', async ({ page }) => {
    await page.goto('/types/fire');
    const charizard = cardFor(section(page, 'Pokémon'), /Charizard/);
    expect(await textOf(charizard)).toMatch(/Fire.*Flying/);
  });

  test('generation pages', async ({ page }) => {
    await page.goto('/generations/generation-i');
    expect(await textOf(cards(section(page, 'Pokémon')).first())).toMatch(/Grass.*Poison/);
  });

  test('species added after the build', async ({ page }) => {
    await page.goto('/types/normal');
    await expect(cardFor(section(page, 'Pokémon'), /Benchmon/)).toContainText('Normal');
  });
});
