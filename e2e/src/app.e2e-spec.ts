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

  it('should have version `bingo v2.1.2`', () => {
    page.navigateTo();
    expect(page.getVersionText()).toEqual('bingo v2.1.2');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
