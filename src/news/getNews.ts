import {launch} from 'puppeteer'
const CATCH = new Map()
interface News { 
  link: string; 
  header: string; 
  time: string; 
  origin: string; 
}
type Err = string
export async function getNews(term:string|object, lang:string = 'he'): Promise<News[] | Err> {
	let res:string | News[],
		isSearch = `search?q=${term}&hl=${lang}`, 
		isTopStories = `topstories?hl=${lang}`, 
		err = `לא מצאתי חדשות על ${term}`,
		url = `https://news.google.com/${ term ? isSearch : isTopStories }`;

	if (term && typeof term === 'object') {
		let resultArray = []
		for (let i = 0; i < Object.values(term).length; i++) {
			resultArray.push(await getNews(term[i], lang))
		}
		return resultArray
	}
	try {
		if (CATCH.has(url)) return CATCH.get(url)
		const browser = await launch({ args: ['--no-sandbox'] })
		const context = await browser.createIncognitoBrowserContext()
		const page = await context.newPage()
		await page.goto(url)
		let isNews = await page.$('body')
		if (isNews) {
			console.log('found news')
			await page.waitForSelector('body')
			res = await page.evaluate(() =>
				[...document.querySelectorAll('article')].map(x => ({
					link: x.parentElement.querySelector('a').href,
					header: x.children[1].textContent,
					time: [...x.children[2].children[0].children].filter(x => x.tagName === 'TIME')[0]
						?.textContent,
					origin: x.children[2].children[0].children[1].textContent,
				}))
			)
		} else return err
		if (res){
				CATCH.set(url, res)
			await context.close()
			return res
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

// if (res){
	// for (let i = 0; i < res.length; i++) {
		// 	try {
			// 		await page.goto(res[i].link, {
	// 			"waitUntil": "networkidle2",
	// 			"timeout": 10000
	// 		})
	// 		let directLink = await page.evaluate(() => document.location.href)
	// 		console.log(directLink);
	// 	} catch (error) {
		// 		console.log('timeout');
		// 	}
		// }
// console.log(await getNews(''));