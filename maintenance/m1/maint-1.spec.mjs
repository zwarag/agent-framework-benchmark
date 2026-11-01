import { test, expect } from '@playwright/test';
import { main, expectText } from './helpers.mjs';

test.describe('Change 1: capture and growth rate', () => {
  test('shows capture rate and growth rate after weight', async ({ page }) => {
    await page.goto('/pokemon/pikachu');
    const m = main(page);
    await expect(m.getByRole('term').filter({ hasText: /^Capture rate$/ })).toBeVisible();
    await expect(m.getByRole('term').filter({ hasText: /^Growth rate$/ })).toBeVisible();
    await expectText(m, /Weight 6\.0 kg Capture rate 190 Growth rate Medium(?! Slow)/);
  });

  test('humanizes multi-word growth rates', async ({ page }) => {
    await page.goto('/pokemon/bulbasaur');
    await expectText(main(page), /Capture rate 45 Growth rate Medium Slow/);
  });

  test('uses live data', async ({ page }) => {
    await page.goto('/pokemon/benchmon');
    await expectText(main(page), /Capture rate 35/);
  });
});
