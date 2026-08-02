import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js'

export class FlightsPage extends BasePage {
  readonly originInput: Locator;
  readonly originList: Locator;
  readonly originRemoveListButton: Locator;
  readonly originSearchResults: Locator;
  readonly originAirportCode: Locator;
  readonly destinationInput: Locator;
  readonly destinationSearchResults: Locator;
  readonly destinationAirportCode: Locator;

  readonly departureDateButton: Locator;
  readonly returnDateButton: Locator;
  readonly searchButton: Locator;

  readonly flightSearchDialogMessage: Locator;
  
  constructor(page: Page) {
    super(page);
    this.originInput = page.locator('//input[@aria-label="Origin location"]');
    this.originList = page.locator('//input[@aria-label="Origin location"]/..//div[@role="listitem"]');
    this.originRemoveListButton = page.locator('//input[@aria-label="Origin location"]/..//div[@role="listitem"]//div[@aria-label="Remove value"]');
    this.originSearchResults = page.locator('#flight-origin-smarty-input-list > li');
    this.originAirportCode = page.locator('#flight-origin-smarty-input-list > li span[class*="airport-code"]');
    this.destinationInput = page.locator('//input[@aria-label="Destination location"]');
    this.destinationSearchResults = page.locator('#flight-destination-smarty-input-list > li');
    this.destinationAirportCode = page.locator('#flight-destination-smarty-input-list > li span[class*="airport-code"]');

    this.departureDateButton = page.getByRole('button', { name: 'Departure date' });
    this.returnDateButton = page.getByRole('button', { name: 'Return date' });
    this.searchButton = page.locator('//button[@aria-label="Search"]');

    this.flightSearchDialogMessage = page.locator('div[role="dialog"] div[class*="content"] ol');
  }

  async removeFlightOrigin() {
    while (await this.originRemoveListButton.count() > 0) {
      await this.originRemoveListButton.first().click();
    }
  }

  async selectFlightOrigin(origin: string): Promise<string> {
    await this.originInput.fill(origin);
    const airportCode = await this.originAirportCode.first().textContent();
    if (!airportCode) {
      throw new Error('Airport code was not found for the selected origin.');
    }
    await this.originSearchResults.first().click();
    return airportCode.trim();
  }

  async selectFlightDestination(destination: string): Promise<string> {
    await this.destinationInput.fill(destination);
    const airportCode = await this.destinationAirportCode.first().textContent();
    if (!airportCode) {
      throw new Error('Airport code was not found for the selected destination.');
    }
    await this.destinationSearchResults.first().click();
    return airportCode.trim();
  }

  private formatDate(date: Date): string {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).replace(',', '');

    return formattedDate;
  }

  async selectDepartureAndReturnDate() {
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + 1);
    const departureDateFormatted = this.formatDate(departureDate);

    await this.departureDateButton.click();
    await this.page.getByRole('button', { name: departureDateFormatted }).click();

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    const returnDateFormatted = this.formatDate(returnDate);

    await this.returnDateButton.click();
    await this.page.getByRole('button', { name: returnDateFormatted }).click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
    const popup = await this.page.waitForEvent('popup', { timeout: 3000 }).catch(() => null);
    if (popup) {
      await popup.waitForLoadState();
      return popup;
    }

    await this.page.waitForLoadState('load');
    return this.page;
  }

  async verifyFlightSearchDialogMessage(expectedMessage: string) {
    await expect(this.flightSearchDialogMessage).toContainText(expectedMessage);
  }

}