import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class Headers extends BasePage {
  readonly cheapFlightsLogo: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cheapFlightsLogo = page.locator('a.gPDR-main-logo-link');
    this.signInButton = page.locator('//div[@aria-label="Sign in"]');
  }

}