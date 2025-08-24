export {ImportWebP, ImportAvif, ImportJpg, ImportPng};
import { getImage } from "astro:assets";

async function ImportWebP(source: ImageMetadata, width: number, quality: string = "max"): Promise<any> {
    
    const ImageObject: any = await getImage({
        src: source,
        format: "webp",
        width: width,
        quality: quality
    });

    return ImageObject;
};

async function ImportAvif(source: ImageMetadata, width: number, quality: string = "max"): Promise<any> {

    const ImageObject: any = await getImage({
        src: source,
        format: "avif",
        width: width,
        quality: quality
    });

    return ImageObject;
}


async function ImportJpg(source: ImageMetadata, width: number, quality: string = "medium"): Promise<any> {

    const ImageObject: any = await getImage({
        src: source,
        format: "jpg",
        width: width,
        quality: quality
    });

    return ImageObject;
}

async function ImportPng(source: ImageMetadata, width: number, quality: string = "medium"): Promise<any> {

    const ImageObject: any = await getImage({
        src: source,
        format: "png",
        width: width,
        quality: quality
    })

    return ImageObject;
}