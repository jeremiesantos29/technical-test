import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FlightSearchPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  readonly flightOriginValue = this.page.locator('//div[@aria-hidden="false"]//div[@aria-label="Flight origin input"]//div[contains(@class,"item-value")]');
  readonly flightDestinationValue = this.page.locator('//div[@aria-hidden="false"]//div[@aria-label="Flight destination input"]//div[contains(@class,"item-value")]');

  async verifyFlightOrigin(flightOrigin: string) {
    await expect(this.flightOriginValue).toContainText(flightOrigin);
  }

  async verifyFlightDestination(flightDestination: string) {
    await expect(this.flightDestinationValue).toContainText(flightDestination);
  }

  async verifyFlightOriginSearchResult(origin: string, airportCode: string) {
    const firstFlightSearchResult = this.page.locator('#flight-results-list-wrapper div[class*="result-item-container"]:nth-child(1) li:nth-child(1) div[title*="'+ origin +'"]');
    await expect(firstFlightSearchResult).toContainText(airportCode);
  }

  async verifyFlightDestinationSearchResult(destination: string, airportCode: string) {
    const firstFlightSearchResult = this.page.locator('#flight-results-list-wrapper div[class*="result-item-container"]:nth-child(1) li:nth-child(1) div[title*="'+ destination +'"]');
    await expect(firstFlightSearchResult).toContainText(airportCode);
  }

}