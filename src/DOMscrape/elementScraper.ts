import puppeteer from 'puppeteer'

export async function elementScraper(url:string, selector:string): Promise<string | string[]>{
  const result:any= [];
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  await page.evaluate((el, i) => {
    if (el) {
      result.push({
        number: `${++i}`,
        name: el.name,
        childNumber: el.childElementCount,
        innerText: el.innerText,
        innerHTML: el.innerHTML,
        attributes: el.attributes,
        className: el.className,
        id: el.id,
        value: el.value,
        checked: el.checked,
        selected: el.selected,
        disabled: el.disabled,
        type: el.type,
        placeholder: el.placeholder,
        src: el.src,
        href: el.href 
      })
      if (el.childElementCount > 0) {
        el.childNodes.forEach((child:any) => {
          result.push({
            number: `${++i}`,
            name: child.name,
            childNumber: child.childElementCount,
            innerText: child.innerText,
            innerHTML: child.innerHTML,
            attributes: child.attributes,
            className: child.className,
            id: child.id,
            value: child.value,
            checked: child.checked,
            selected: child.selected,
            disabled: child.disabled,
            type: child.type,
            placeholder: child.placeholder,
            src: child.src,
            href: child.href
          })
        })
      }
    }
  },currentElement)
  await browser.close()
  return result
}
