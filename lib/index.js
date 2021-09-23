"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Answers;
