import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  async wait(second: number): Promise<void> {
    return sleep(second);
  }

  getCurrentNumberText() {
    return element(by.className('current-number active')).getText() as Promise<string>;
  }

  getCopyrightText() {
    return element(by.className('copyright')).getText() as Promise<string>;
  }

  getVersionText() {
    return element(by.className('version')).getText() as Promise<string>;
  }

  getStartButton() {
    return element(by.className('spin start'));
  }

  getResetButton() {
    return element(by.className('reset'));
  }

  getOkButtonOnModal() {
    return element(by.id('button-modal-ok'));
  }

}

const sleep = (waitSeconds: number): Promise<void> => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, waitSeconds * 1000);
});
