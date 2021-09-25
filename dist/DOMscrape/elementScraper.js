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
        const result = [];
        const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.waitForSelector(selector);
        const currentElement = yield page.$(selector);
        const currentElementCount = yield page.evaluate(el => el === null || el === void 0 ? void 0 : el.childElementCount, currentElement);
        if (currentElement && currentElementCount > 0) {
            const currentElementChildNodes = yield page.evaluate(el => el === null || el === void 0 ? void 0 : el.childNodes, currentElement);
            const currentElementChildNodesArray = [...currentElementChildNodes];
            for (const childEl of currentElementChildNodesArray) {
                if (childEl) {
                    elementScraper(url, childEl);
                }
            }
        }
        else {
            const textContent = yield page.evaluate(el => el === null || el === void 0 ? void 0 : el.innerText, currentElement);
            result.push(textContent);
        }
        yield browser.close();
        return result;
    });
}
exports.elementScraper = elementScraper;
//# sourceMappingURL=elementScraper.js.map