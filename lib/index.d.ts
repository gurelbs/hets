import getNews from './news/getNews';
export default class Answers {
    news(term: string | string[], lang?: string): Promise<unknown>;
}
export { getNews as news };
