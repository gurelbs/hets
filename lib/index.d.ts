import getNews from './news/getNews';
export default class Answers {
    news(term: string | string[], lang?: string): Promise<unknown>;
}
export { Answers, getNews as news };
