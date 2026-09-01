import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToCheapFlights() {
        await this.page.goto('https://www.cheapflights.com.au/');
    }

    /**
     * Run this step ONLY when you expect a new tab to be open. It scans open tabs only once
     */
    async switchToLatestTab() {
        const context = this.page.context();
        const pages = context.pages();
        
        // If a new window opened, point this Page Object to the new window
        if (pages.length > 1) {
            const latestPage = pages[pages.length - 1];
            if (latestPage) {
                this.page = latestPage;
                await this.page.bringToFront();
            }
        }
    }
}