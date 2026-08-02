import { Page, Locator } from '@playwright/test';

export class Headers {
  private readonly page: Page;
  readonly cheapFlightsLogo: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cheapFlightsLogo = page.locator('a.gPDR-main-logo-link');
    this.signInButton = page.locator('//div[@aria-label="Sign in"]');
  }

}