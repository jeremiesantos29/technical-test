import { test, expect } from '@playwright/test';
import { Headers } from '../pages/Headers.js';

test.describe('Cheapflights Homepage Header Validation', () => {
  let headers: Headers;

  test.beforeEach(async ({ page }) => {
    headers = new Headers(page);
    await headers.navigateToCheapFlights();
  });

  test('Validate website logo is visible', async () => {
    await expect(headers.cheapFlightsLogo).toBeVisible();
  });

  test('Validate Sign-In button is visible', async () => {
    await expect(headers.signInButton).toBeVisible();
  });
});