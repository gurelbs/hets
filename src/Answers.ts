import {getNews} from './news/getNews';

export default class Answers {
  async news(term:string | object) {
    try {
      let answer = await getNews(term);
      console.log(answer);
      return answer;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}