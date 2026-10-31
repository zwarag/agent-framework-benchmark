import { test, expect } from '@playwright/test';

const MODE = process.env.RENDER_MODE;

const PAGES = [
  ['/', 'Pokémon', ['Bulbasaur', '#0001']],
  ['/?type=fire&generation=generation-i', 'Pokémon', ['Charmander', '#0004']],
  ['/pokemon/pikachu', 'Pikachu', ['Mouse Pokémon', '#0025']],
  ['/moves/thunderbolt', 'Thunderbolt', ['Has a chance to paralyze the target.']],
  ['/abilities/static', 'Static', ['Has a 30% chance of paralyzing attacking Pokémon on contact.']],
  ['/types', 'Types', ['Fairy']],
  ['/types/fire', 'Fire', ['Charmander', 'Armor Cannon']],
];

test('RENDER_MODE is ssr or csr', () => {
  expect(['ssr', 'csr']).toContain(MODE);
});

test('the app answers under any hostname', async ({ page, baseURL }) => {
  const url = new URL('/types', baseURL);
  url.hostname = `proxy-${Math.random().toString(36).slice(2, 10)}.test`;
  const response = await page.goto(url.href);
  expect(response.status()).toBeLessThan(400);
  await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Types');
});

test.describe('Rendering mode without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const [url, h1, data] of PAGES) {
    if (MODE === 'ssr') {
      test(`ssr: ${url} shows its content`, async ({ page }) => {
        await page.goto(url);
        await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText(h1);
        for (const text of data) await expect(page.getByRole('main')).toContainText(text);
      });
    }

    if (MODE === 'csr') {
      test(`csr: ${url} sends no API data`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response.status()).toBeLessThan(400);
        const html = await response.text();
        const body = await page.locator('body').innerText();
        for (const text of data) {
          expect(html).not.toContain(text);
          expect(body).not.toContain(text);
        }
      });
    }
  }
});

test.describe('Rendering mode with JavaScript', () => {
  test.skip(MODE !== 'csr', 'csr only');

  test('csr: the browser fetches the data from the API', async ({ page }) => {
    const api = new URL(process.env.API_BASE_URL ?? 'http://localhost:9000').origin;
    const calls = [];
    page.on('request', (r) => {
      if (r.url().startsWith(`${api}/api/`)) calls.push(r.url());
    });
    await page.goto('/pokemon/pikachu');
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('Pikachu');
    expect(calls.length).toBeGreaterThan(0);
  });
});
