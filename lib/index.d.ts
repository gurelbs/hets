import getNews from './news/getNews';
export default class Answers {
    news(term: string | string[], lang?: string): Promise<any>;
}
export { Answers, getNews as news };
