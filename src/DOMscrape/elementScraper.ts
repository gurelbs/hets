import puppeteer from 'puppeteer'

export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  const result = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  const currentElementCount = await page.evaluate(el => el?.childElementCount,currentElement)
  if (currentElement && currentElementCount > 0) {
    const currentElementChildNodes = await page.evaluate(el => el?.childNodes,currentElement)
    console.log(currentElementChildNodes);
    const currentElementChildNodesArray = [...currentElementChildNodes]
    for (const childEl of currentElementChildNodesArray){
      elementScraper(url, childEl)
    }
  } else {
    const textContent = await page.evaluate(el => el?.innerText,currentElement)
    result.push(textContent)
  }
  await browser.close()
  return result
}
