import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class Headers extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  readonly cheapFlightsLogo = this.page.locator('a.gPDR-main-logo-link');
  readonly signInButton = this.page.locator('//div[@aria-label="Sign in"]');

}