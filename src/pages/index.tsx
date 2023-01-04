import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

const fetchCatImage =async (): Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = (await res.json()) as SearchCatImageResponse;
    return result[0];
};

fetchCatImage().then((image) => {
    console.log(`Cat Image: ${image.url}`);
});

interface CatCategory {
    id: number;
    name: string;
}

interface SearchCatImage {
    breeds: string[];
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

interface IndexPageProps {
    initialCatImageUrl: string;
}

type SearchCatImageResponse = SearchCatImage[];

const IndexPage: NextPage<IndexPageProps> = ({initialCatImageUrl}) => {
    const[catImageUrl,setCatImageUrl] = useState(initialCatImageUrl);

    const handleClick = async () => {
        const image = await fetchCatImage();
        setCatImageUrl(image.url);
    };

    return (
        <div>
            <button onClick={handleClick}>Todays Cat</button>
            <div style={{marginTop: 8}}>
                <img src={catImageUrl} />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const catImage = await fetchCatImage();
    return {
        props: {
            initialCatImageUrl: catImage.url,
        },
    };
};

export default IndexPage;