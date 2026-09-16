const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/91908/.gemini/antigravity-ide/brain/c1b5cd06-79be-4222-a944-1a0905d0cc60';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Top Section
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_top.png') });
  console.log('Saved clone_top.png');

  // 2. Middle Details Section (scroll by 700px)
  await page.evaluate(() => window.scrollTo(0, 700));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_overview_details.png') });
  console.log('Saved clone_overview_details.png');

  // 3. Calendar & Amenities Section
  await page.evaluate(() => window.scrollTo(0, 1400));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_calendar_reserve.png') });
  console.log('Saved clone_calendar_reserve.png');

  // 4. Reviews Section
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_reviews.png') });
  console.log('Saved clone_reviews.png');

  // 5. Map & Location Section
  await page.evaluate(() => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_location_host.png') });
  console.log('Saved clone_location_host.png');

  // 6. Meet Your Host Section
  await page.evaluate(() => {
    const el = document.getElementById('host-section');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_host.png') });
  console.log('Saved clone_host.png');

  // 7. Things to know & Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clone_footer.png') });
  console.log('Saved clone_footer.png');

  await browser.close();
  console.log('All detailed screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
