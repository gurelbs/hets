import puppeteer from 'puppeteer'

export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  const result:any= [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  const currentElementCount = await page.evaluate(el => el?.childElementCount,currentElement)
  result.push({counter: currentElementCount})
  await browser.close()
  return result
}
