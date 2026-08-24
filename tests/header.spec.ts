import { test, expect } from '../fixtures/BaseTest';

test.describe('Cheapflights Homepage Header Validation', () => {

  test('Validate website logo is visible', async ({ headers }) => {
    await expect(headers.cheapFlightsLogo).toBeVisible();
  });

  test('Validate Sign-In button is visible', async ({ headers }) => {
    await expect(headers.signInButton).toBeVisible();
  });
});