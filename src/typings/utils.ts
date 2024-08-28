export type SearchParams = { [key: string]: string | string[] | undefined };

export type AsyncFunction = (...args: any[]) => Promise<unknown>;
