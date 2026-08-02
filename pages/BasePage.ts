import { Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToCheapFlights() {
        await this.page.goto('https://www.cheapflights.com.au/');
    }
}