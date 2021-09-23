import {getNews} from './news/getNews';

export default class Answers {
  async news(term: string | string[], lang: string = 'he') {
    try {
      return await getNews(term, lang);
    } catch (error) {
      return error;
    }
  }
}