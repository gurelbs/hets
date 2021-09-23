import { getNews } from './news/getNews';

export class Answers {
  async news(term: string | string[], lang: string = 'he') {
    try {
      const answer = await getNews(term, lang);
      console.info(answer);
      return answer
    } catch (error) {
      return error;
    }
  }
}