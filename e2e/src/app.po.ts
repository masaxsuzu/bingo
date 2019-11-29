import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getCurrentNumberText() {
    return element(by.className('current-number active')).getText() as Promise<string>;
  }

  getCopyrightText() {
    return element(by.className('copyright')).getText() as Promise<string>;
  }

}
