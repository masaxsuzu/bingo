import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display MS', () => {
    page.navigateTo();
    expect(page.getCurrentNumberText()).toEqual('MS');
  });

  it('should have copyright', () => {
    page.navigateTo();
    const copyright = page.getCopyrightText();
    expect(copyright).toContain('sound effect:');
    expect(copyright).toContain('Maoudamashii');
  });

  it('should have version `bingo v3.2.0`', () => {
    page.navigateTo();
    expect(page.getVersionText()).toEqual('bingo v3.2.0');
  });

  it('should start', async () => {
    page.navigateTo();

    // start and wait
    await page.getStartButton().click();
    await page.wait(5);

    expect(page.getCurrentNumberText()).not.toEqual('MS');

  });

  it('should reset if OK is clicked', async () => {
    page.navigateTo();

    // start and wait
    await page.getStartButton().click();
    await page.wait(5);

    await page.getResetButton().click();
    await page.getOkButtonOnModal().click();

    expect(page.getCurrentNumberText()).toEqual('MS');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
