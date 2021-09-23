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
exports.Answers = void 0;
const getNews_1 = require("./news/getNews");
class Answers {
    news(term, lang = 'he') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield (0, getNews_1.getNews)(term, lang);
                console.info(answer);
                return answer;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.Answers = Answers;
//# sourceMappingURL=index.js.map