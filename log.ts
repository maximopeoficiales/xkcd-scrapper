const LOG_PREFIX = "[XKCD Scrapper] ✔ "
export const log = (...args: any) => {
    console.log(LOG_PREFIX, ...args);
}

export const time = (text: string = "") => {
    console.time(`${LOG_PREFIX}${text}`);
    return () => console.timeEnd(`${LOG_PREFIX}${text}`);
}