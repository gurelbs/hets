import { News, Err } from './../types';
export declare function getNews(term: string | object, lang?: string): Promise<News[] | Err>;
