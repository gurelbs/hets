interface News {
    link: string;
    header: string;
    time: string;
    origin: string;
}
declare type Err = string;
export declare function getNews(term: string | object, lang?: string): Promise<News[] | Err>;
export {};
