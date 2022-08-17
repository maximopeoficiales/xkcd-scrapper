import axios from "axios";
import fs from "fs-extra";
export interface Comic {
    alt: string;
    day: string;
    img: string;
    link: string;
    month: string;
    news: string;
    num: number;
    safe_title: string;
    title: string;
    transcript: string;
    year: string;
}

const INITIAL_ID_XKCD_COMIC = 2500;
const MAX_ID_XKCD_COMICS = 2588;


(async () => {
    for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMICS; id++) {
        const url = `https://xkcd.com/${id}/info.0.json`;
        const { data } = await axios.get<Comic>(url);
        const { num, news, transcript, ...restData } = data;
        const comicStore = {
            id, ...restData
        };
        await fs.writeJSON(`./comics/${id}.json`, comicStore);
    }
})()
