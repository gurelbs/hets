var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import puppeteer from 'puppeteer';
var CATCH = new Map();
export function getNews(term, lang) {
    if (lang === void 0) { lang = 'he'; }
    return __awaiter(this, void 0, void 0, function () {
        var res, isSearch, isTopStories, err, url, resultArray, i, result, browser, context, page, isNews, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isSearch = "search?q=" + term + "&hl=" + lang;
                    isTopStories = "topstories?hl=" + lang;
                    err = "\u05DC\u05D0 \u05DE\u05E6\u05D0\u05EA\u05D9 \u05D7\u05D3\u05E9\u05D5\u05EA \u05E2\u05DC " + term;
                    url = "https://news.google.com/" + (term ? isSearch : isTopStories);
                    if (!(term && typeof term === 'object')) return [3 /*break*/, 5];
                    resultArray = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < Object.values(term).length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, getNews(term[i], lang)];
                case 2:
                    result = _a.sent();
                    resultArray.push(result);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, resultArray];
                case 5:
                    _a.trys.push([5, 17, , 18]);
                    if (CATCH.has(url))
                        return [2 /*return*/, CATCH.get(url)];
                    return [4 /*yield*/, puppeteer.launch({ args: ['--no-sandbox'] })];
                case 6:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.createIncognitoBrowserContext()];
                case 7:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 8:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.$('body')];
                case 10:
                    isNews = _a.sent();
                    if (!isNews) return [3 /*break*/, 13];
                    // console.log('found news')
                    return [4 /*yield*/, page.waitForSelector('body')];
                case 11:
                    // console.log('found news')
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            return __spreadArray([], document.querySelectorAll('article')).map(function (article) {
                                var _a, _b, _c;
                                return ({
                                    link: (_b = (_a = article === null || article === void 0 ? void 0 : article.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('a')) === null || _b === void 0 ? void 0 : _b.href,
                                    header: article.children[1].textContent,
                                    time: (_c = __spreadArray([], article.children[2].children[0].children).filter(function (x) { return x.tagName === 'TIME'; })[0]) === null || _c === void 0 ? void 0 : _c.textContent,
                                    origin: article.children[2].children[0].children[1].textContent
                                });
                            });
                        })];
                case 12:
                    res = _a.sent();
                    return [3 /*break*/, 14];
                case 13: return [2 /*return*/, err];
                case 14:
                    if (!res) return [3 /*break*/, 16];
                    CATCH.set(url, res);
                    return [4 /*yield*/, context.close()];
                case 15:
                    _a.sent();
                    return [2 /*return*/, res];
                case 16: return [3 /*break*/, 18];
                case 17:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 18: return [2 /*return*/];
            }
        });
    });
}
