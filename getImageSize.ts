import { get } from 'https'
import sizeOf from 'image-size'
import { ISizeCalculationResult } from 'image-size/dist/types/interface';


export const getImageSize = async (url: string): Promise<ISizeCalculationResult> => {
    return new Promise((resolve, reject) => {
        try {
            get(url, response => {
                const chunks: any[] = []
                response
                    .on('data', (chunk) => {

                        chunks.push(chunk)
                    })
                    .on('end', () => {
                        const buffer = Buffer.concat(chunks)
                        const sizes = sizeOf(buffer)
                        resolve(sizes)
                    })
            })
        } catch (error) {
            reject(error)
        }
    });
}
