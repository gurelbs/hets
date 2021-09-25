import puppeteer from 'puppeteer'
export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  const result = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  const elementCount = await page.evaluate(el => el?.childElementCount,currentElement)
  if (elementCount > 0) {
    const childNodes = await page.evaluate(el => el?.childNodes,currentElement)
    const childNodesArray = [...childNodes]
    childNodesArray.map( childNode => elementScraper(url, childNode))
  } else {
    const textContent = await page.evaluate(el => el.textContent, currentElement)
    result.push(textContent)
  }
  await browser.close()
  return result
}
