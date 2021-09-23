import getNews from './news/getNews';

export default class Answers {
  async news(term: string | string[], lang: string = 'he') {
    try {
      let answer = await getNews(term, lang);
      console.info(answer);
      return answer
    } catch (error) {
      return error;
    }
  }
}