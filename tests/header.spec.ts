import { test, expect } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage.js';
import { Headers } from '../pages/Headers.js';

test.describe('Cheapflights Homepage Header Validation', () => {
  let headers: Headers;
  let flightsPage: FlightsPage;

  test.beforeEach(async ({ page }) => {
    headers = new Headers(page);
    flightsPage = new FlightsPage(page);
    await flightsPage.navigateToCheapFlights();
  });

  test('Validate website logo is visible', async () => {
    await expect(headers.cheapFlightsLogo).toBeVisible();
  });

  test('Validate Sign-In button is visible', async () => {
    await expect(headers.signInButton).toBeVisible();
  });
});