import useIntersectionObserver from "../InfiniteScroll_IntersectionObserver/useIntersection";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import './InfinitePage.css'

interface ArticleProps {
    article: object;
    title: string;
}

const getUsers = async ({pageParam = 0}) => {
    const res = await axios.get(
        `https://api.realworld.io/api/articles?limit=10&offset=${pageParam}`
    );
    const data = res.data;
    return {...data, preOffset: pageParam};
};

const InfinitePageObserver = () => {
    const {data, fetchNextPage, hasNextPage} = useInfiniteQuery(
        ["articles"],
        getUsers,
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.prevOffset + 10 > lastPage.articleCount) {
                    return false;
                }

                return lastPage.prevOffset + 10;
            },
        }
    );

    const articles = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.articles];
    }, []);

    // 커스텀 훅에 hasNextPage와 fetchNextPage를 넣어 setTarget을 받아옵니다.
    const {setTarget} = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    });

    return (
        <>
            <h2>Infinite Scroll</h2>

            {/* 페이지 최하단에 작은 div요소 만들어 ref에 setTarget적용 */}
            <div>
                {articles &&
                    articles.map((article: ArticleProps, idx: number) => (
                        <div ref={setTarget} key={idx} className="element">
                            {article.title}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default InfinitePageObserver;
