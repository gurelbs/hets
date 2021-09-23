"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answers = void 0;
const getNews_1 = require("./news/getNews");
class Answers {
    async news(term, lang = 'he') {
        try {
            return await (0, getNews_1.getNews)(term, lang);
        }
        catch (error) {
            return error;
        }
    }
}
exports.Answers = Answers;
