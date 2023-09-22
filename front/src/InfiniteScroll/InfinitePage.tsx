import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import "./InfinitePage.css";
import axios from "axios";

interface ArticleProps {
    article: object;
    title: string;
}

const getUsers = async({pageParam = 0}) => {
    const res = await axios.get(`https://api.realworld.io/api/articles?limit=10&offset=${pageParam}`);
    const data = res.data
    return {...data, preOffset: pageParam};
}

const InfinitePage = () => {
    const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 10 > lastPage.articleCount) {
                return false;
            }

            return lastPage.prevOffset + 10;
        },
    });

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.articles];
    }, []); 

    return (
        <div>
            <h1>Infinite Scroll</h1>

            <InfiniteScroll
                dataLength={articles ? articles.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loading={<div>Loading...</div>}
            >
                <div>
                    {articles &&
                        articles.map((article: ArticleProps, idx: number) => (
                            <div key={idx} className="element">
                                {article.title}
                            </div>
                        ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default InfinitePage;
