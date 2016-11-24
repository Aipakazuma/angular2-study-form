import { Angular2FormDemoPage } from './app.po';

describe('angular2-form-demo App', function() {
  let page: Angular2FormDemoPage;

  beforeEach(() => {
    page = new Angular2FormDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
