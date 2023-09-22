// import { useInfiniteQuery } from "react-query";
// import "./App.css";
// import { useEffect } from "react";

// const fetchRepo = async (pageParam = 1) => {
//   const response = await fetch(
//     `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${pageParam}`
//   );
//   return response.json();
// };

// function App() {
//   const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
//     "repositories",
//     ({ pageParam = 1 }) => fetchRepo(pageParam),
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         const nextPages = lastPage.total_count / 30;
//         const nextPage = allPages.length + 1;
//         return nextPage <= nextPages ? nextPage : undefined;
//       },
//     }
//   );

//   useEffect(() => {
//     let fetching = false;

//     const onScroll = async (event) => {
//       const { scrollHeight, scrollTop, clientHeight } =
//         event.target.scrollingElement;

//       if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
//         fetching = true;
//         if (hasNextPage) await fetchNextPage();
//         fetching = false;
//       }
//     };
//     document.addEventListener("scroll", onScroll);
//     return () => {
//       document.removeEventListener("scroll", onScroll);
//     };
//   }, []);
//   // console.log(data);

//   return (
//     <>
//       <h1>Infinite Scroll</h1>
//       <ul>
//         {data?.pages.map((page) =>
//           page.items.map((repo) => (
//             <li key={repo.id} className="repo-item">
//               <div className="repo-box">
//                 <p>
//                   <b>{repo.name}</b>
//                 </p>
//                 <p>{repo.description}</p>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>
//     </>
//   );
// }

// export default App;
/* 여기서부터는 IntersectionObserver  */

import { useInfiniteQuery } from "react-query";
import "./App.css";
import { useEffect, useRef } from "react";

const fetchRepo = async (pageParam = 1) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=topic:reactjs&per_page=30&page=${pageParam}`
  );
  return response.json();
};

function App() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    "repositories",
    ({ pageParam = 1 }) => fetchRepo(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPages = lastPage.total_count / 30;
        const nextPage = allPages.length + 1;
        return nextPage <= nextPages ? nextPage : undefined;
      },
    }
  );

  const observer = useRef(null);
  const observerCallback = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    if (observer.current) {
      observer.current.observe(document.querySelector("#loadMoreTrigger"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <>
      <h1>Infinite Scroll</h1>
      <ul>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((repo) => (
            <li key={repo.id} className="repo-item">
              <div className="repo-box">
                <p>
                  <b>{repo.name}</b>
                </p>
                <p>{repo.description}</p>
              </div>
            </li>
          ))
        )}
      </ul>
      {hasNextPage && (
        <div id="loadMoreTrigger" style={{ height: "1px" }}></div>
      )}
    </>
  );
}

export default App;
