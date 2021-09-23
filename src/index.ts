import {getNews}  from './news/getNews';
export {getNews};
export class Answers {
  async news(term: string | string[], lang: string = 'he') {
    try {
      return await getNews(term, lang);
    } catch (error) {
      return error;
    }
  }
}