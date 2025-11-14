const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://twitter.com/explore/tabs/trending');

  // Wait for the trends to load
  await page.waitForSelector('[data-testid="trend"]');

  const trends = await page.evaluate(() => {
    const trendElements = Array.from(document.querySelectorAll('[data-testid="trend"]'));
    return trendElements.map(trend => {
      const topicElement = trend.querySelector('div > div > div > span');
      const volumeElement = trend.querySelector('div > div > div:nth-child(2) > span');
      return {
        topic: topicElement ? topicElement.innerText : '',
        tweet_volume: volumeElement ? volumeElement.innerText : '',
      };
    });
  });

  console.log(JSON.stringify(trends));

  await browser.close();
})();
