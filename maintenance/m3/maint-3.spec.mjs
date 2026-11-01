import { test, expect } from '@playwright/test';
import { main, cards, countText } from './helpers.mjs';

test.describe('Change 3: sorting the Pokémon list', () => {
  test('has a labelled sort control', async ({ page }) => {
    await page.goto('/');
    const sort = page.getByLabel('Sort', { exact: true });
    await expect(sort.locator('option')).toHaveCount(2);
    expect((await sort.locator('option').allInnerTexts()).map((t) => t.trim())).toEqual(['Dex number', 'Name']);
    await expect(cards(main(page)).first()).toContainText('Bulbasaur');
  });

  test('sorts all matches by name from the URL', async ({ page }) => {
    await page.goto('/?sort=name');
    const m = main(page);
    await expect(countText(m, 1026)).toBeVisible();
    await expect(cards(m).first()).toContainText('Abomasnow');
    await expect(m.getByText('Page 1 of 22')).toBeVisible();
    const next = m.getByRole('link', { name: 'Next page' });
    expect(new URL(await next.getAttribute('href'), 'http://x').searchParams.get('sort')).toBe('name');
  });

  test('combines sorting with filters', async ({ page }) => {
    await page.goto('/?type=fire&generation=generation-i&sort=name');
    const m = main(page);
    await expect(cards(m)).toHaveCount(12);
    await expect(cards(m).first()).toContainText('Arcanine');
    await expect(cards(m).last()).toContainText('Vulpix');
  });

  test('changing the sort updates the URL and resets to page 1', async ({ page }) => {
    await page.goto('/?page=3');
    await page.getByLabel('Sort', { exact: true }).selectOption({ label: 'Name' });
    await expect.poll(() => new URL(page.url()).searchParams.get('sort')).toBe('name');
    expect(new URL(page.url()).searchParams.get('page')).toBeNull();
    await expect(cards(main(page)).first()).toContainText('Abomasnow');
  });

  test('sorts species added after the build', async ({ page }) => {
    await page.goto('/?q=bench&sort=name');
    await expect(cards(main(page))).toHaveCount(1);
    await expect(cards(main(page)).first()).toContainText('Benchmon');
  });
});
