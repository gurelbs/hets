"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getNews_1 = require("./news/getNews");
class Answers {
    async news(term) {
        try {
            let answer = await getNews_1.getNews(term);
            console.log(answer);
            return answer;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}
exports.default = Answers;
