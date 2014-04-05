describe('homepage', function() {
  'use strict';
  it('should render title', function() {
    browser.driver.get('http://localhost:9000');
    browser.sleep(1000);

    var greeting = browser.driver.findElement(by.className('text-muted'));
    expect(greeting.getText()).toEqual('primediser');
  });
});
