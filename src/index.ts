const getNews = require('./news/getNews')

export default class Answers {
  async news(term: string | string[], lang: string = 'he') {
    try {
      const answer = await getNews(term, lang);
      // console.info(answer);
      return answer
    } catch (error) {
      return error;
    }
  }
}