import axios from "axios";
import fs from "fs-extra";
import { getImageSize } from "./getImageSize";
import { log, time } from "./log";
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

const endTime = time();

(async () => {
    for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMICS; id++) {
        const url = `https://xkcd.com/${id}/info.0.json`;
        log("Obteniendo informacion de: ", url)
        const { data } = await axios.get<Comic>(url);
        const { num, news, transcript, ...restData } = data;
        const { height, width } = await getImageSize(data.img)
        log(`Imagen con ${height}x${width}`)
        const comicStore = {
            id, height, width, ...restData
        };
        const nameFile = `./comics/${id}.json`;
        await fs.writeJSON(nameFile, comicStore);
        log(`Archivo: ${nameFile} escrito correctamente ✔ `);

    }
    endTime();
})()
