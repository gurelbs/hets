"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = void 0;
const puppeteer_1 = require("puppeteer");
const CATCH = new Map();
function getNews(term, lang = 'he') {
    return __awaiter(this, void 0, void 0, function* () {
        let res, isSearch = `search?q=${term}&hl=${lang}`, isTopStories = `topstories?hl=${lang}`, err = `לא מצאתי חדשות על ${term}`, url = `https://news.google.com/${term ? isSearch : isTopStories}`;
        if (term && typeof term === 'object') {
            let resultArray = [];
            for (let i = 0; i < Object.values(term).length; i++) {
                resultArray.push(yield getNews(term[i], lang));
            }
            return resultArray;
        }
        try {
            if (CATCH.has(url))
                return CATCH.get(url);
            const browser = yield puppeteer_1.launch({ args: ['--no-sandbox'] });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            yield page.goto(url);
            let isNews = yield page.$('body');
            if (isNews) {
                console.log('found news');
                yield page.waitForSelector('body');
                res = yield page.evaluate(() => [...document.querySelectorAll('article')].map(x => {
                    var _a;
                    return ({
                        link: x.parentElement.querySelector('a').href,
                        header: x.children[1].textContent,
                        time: (_a = [...x.children[2].children[0].children].filter(x => x.tagName === 'TIME')[0]) === null || _a === void 0 ? void 0 : _a.textContent,
                        origin: x.children[2].children[0].children[1].textContent,
                    });
                }));
            }
            else
                return err;
            if (res) {
                CATCH.set(url, res);
                yield context.close();
                return res;
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.getNews = getNews;
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
