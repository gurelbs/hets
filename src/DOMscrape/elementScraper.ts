import puppeteer from 'puppeteer'

export async function elementScraper(url:string, selector:string): Promise<any>{
  const browser = await puppeteer.launch({ headless:false, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector(selector)
  const currentElement = await page.$(selector)
  const res = await page.evaluate((el, i) => {
    const result:any = [];
    if (el && el.childElementCount > 0) {
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
        href: el.href,
      })
      let childs = [...el.childNodes]
      childs.map((child:any) => elementScraper(url, child))
    } else {
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
        href: el.href,
      })
    }
    return result
  },currentElement)
  await browser.close()
  return res
}
