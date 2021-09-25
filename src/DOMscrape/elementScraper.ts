import puppeteer from 'puppeteer'
export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  let result = [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const element = await page.$(selector)
  const elementCount = await page.evaluate(element => element?.childElementCount,element)
  if (elementCount > 0) {
    const childNodes = await page.evaluate(element => element?.childNodes,element)
    const childNodesArray = [...childNodes]
    childNodesArray.map( childNode => elementScraper(url, childNode))
  } else {
    const textContent = await page.evaluate(element => element.textContent, element)
    result.push(textContent)
  }
  await browser.close()
  return result
}
