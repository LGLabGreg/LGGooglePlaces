import { Angular2GooglePlacesApiPage } from './app.po';

describe('angular2-google-places-api App', function() {
  let page: Angular2GooglePlacesApiPage;

  beforeEach(() => {
    page = new Angular2GooglePlacesApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
