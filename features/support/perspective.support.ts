import { After, Before, World, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import type Playwright from 'playwright';

export class Perspective<Parameters=unknown> extends World<Parameters> {
  browser: Playwright.Browser;
  page: Playwright.Page;
  baseURL = "http://localhost:5173";
  parameters = {} as Parameters

  async openBrowser() {
    this.browser = await chromium.launch({
      headless: import.meta.env.VITE_E2E_TEST_HEADLESS === "true",
      slowMo: Number.parseInt(import.meta.env.VITE_E2E_TEST_SLOWMO ?? "0", 10),
    });
  }

  async openNewTab() {
    this.page = await this.browser.newPage();
  }


  async closeCurrentTab() {
    await this.page.close();
  }
}

setDefaultTimeout(60_000)
setWorldConstructor(Perspective);

Before(async function (this: Perspective) {
  await this.openBrowser();
  await this.openNewTab();
});

After(async function (this: Perspective) {
  await this.closeCurrentTab()
});