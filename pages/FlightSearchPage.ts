import { Page, Locator, expect } from '@playwright/test';

export class FlightSearchPage {
  private readonly page: Page;
  readonly flightOriginValue: Locator;
  readonly flightDestinationValue: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.flightOriginValue = page.locator('//div[@aria-hidden="false"]//div[@aria-label="Flight origin input"]//div[contains(@class,"item-value")]');
    this.flightDestinationValue = page.locator('//div[@aria-hidden="false"]//div[@aria-label="Flight destination input"]//div[contains(@class,"item-value")]');
  }

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