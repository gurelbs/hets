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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementScraper = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function elementScraper(url, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.waitForSelector(selector);
        const currentElement = yield page.$(selector);
        if (!currentElement)
            return 'element not found';
        const childElementCount = yield page.evaluate(el => el.childElementCount, currentElement);
        const childs = yield page.evaluate(el => [...el.childNodes], currentElement);
        const res = yield page.evaluate((el, i) => {
            const result = [];
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
            });
            return result;
        }, currentElement);
        yield browser.close();
        return res;
    });
}
exports.elementScraper = elementScraper;
//# sourceMappingURL=elementScraper.js.map