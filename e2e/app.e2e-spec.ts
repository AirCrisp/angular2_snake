import { SnakePage } from './app.po';

describe('snake App', () => {
  let page: SnakePage;

  beforeEach(() => {
    page = new SnakePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
