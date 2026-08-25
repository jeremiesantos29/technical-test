import { test as base } from '@playwright/test';
import { FlightSearchPage } from '../pages/FlightSearchPage';
import { FlightsPage } from '../pages/FlightsPage';
import { Headers } from '../pages/Headers';

type AppFixtures = {
  navigateToCheapFlightsPage: void;
  flightSearchPage: FlightSearchPage;
  flightsPage: FlightsPage;
  headers: Headers;
};

// Extend the base to include app fixtures
export const test = base.extend<AppFixtures>({
  navigateToCheapFlightsPage: [async ({ page, baseURL }, use) => {
    await page.goto(baseURL || '/'); 
    await use(); 
  }, { auto: true }],

  headers: async ({ page }, use) => {
    await use(new Headers(page));
  },

  flightsPage: async ({ page }, use) => {
    await use(new FlightsPage(page));
  },

  flightSearchPage: async ({ page }, use) => {
    await use(new FlightSearchPage(page));
  },
});

export { expect } from '@playwright/test';