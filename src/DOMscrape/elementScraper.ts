import puppeteer from 'puppeteer'

export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  const result:any= [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  const currentElementCount = await page.evaluate(el => el?.childElementCount,currentElement)
  if (currentElement && currentElementCount > 0) {
    const currentElementChildNodes = await page.evaluate(el => el?.childNodes,currentElement)
    const currentElementChildNodesArray = [...currentElementChildNodes]
    currentElementChildNodesArray.map( childEl => {
      if (childEl){
        if (childEl.textContent) {
          result.push({
            tagName: childEl.tagName,
            textContent: childEl.textContent,
          })
        }
      elementScraper(url, childEl.tagName)
      }
    })
  } else {
    await page.evaluate(el => result.push({
      tagName: el.tagName,
      textContent: el.textContent,
    }),currentElement)
  }
  await browser.close()
  return result
}
