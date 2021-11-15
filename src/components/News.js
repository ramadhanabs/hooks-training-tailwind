/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { LinkIcon } from '@heroicons/react/solid';

const defaultNews = {
  status: 'ok',
  totalResult: 0,
  articles: [],
};
const endpoint = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=1ae15db81f084fefafad8b7e1e603798';
const itemLength = 5;

const News = function () {
  const [news, setNews] = useState(defaultNews);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log('effect hit');
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${endpoint}&page=${page}&pageSize=${itemLength}`);
        const result = await response.json();
        console.log(result);
        setNews((current) => ({

          ...result,
          articles: [...current.articles, ...result.articles],
          totalResult: result.totalResult,
          status: result.status,
        }));
        if (result.status !== 'ok') {
          throw new Error('error');
        }
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, isRefresh]);
  return (
    <div>
      <div className="container text-center">
        <div className="text-l font-medium text-gray-700">Top Headline News Indonesia 🇲🇨</div>
        <div className="text-xs font-thin text-gray-500">All over Indonesia 😎</div>
        {isLoading && <p>Loading data...</p>}
        {isError && <p>Gagal memuat...</p>}

        <ol className="list-decimal">
          {news.articles.map((item, index) => {
            const pureTitle = item.title.slice(0, item.title.indexOf('-'));
            const {
              author, description, urlToImage, url,
            } = item;
            const source = item.source.name;
            return (
              <div className="w-100 h-100 bg-white rounded-xl border border-opacity-70 my-5 px-5 py-5">
                <img src={urlToImage} alt="thumbnail" className="my-3 rounded-lg" />
                <p className="text-left text-sm font-bold text-gray-700">{pureTitle}</p>
                <p className="text-left text-xs font-light text-gray-400">{author}</p>
                <p className="mt-3 text-left text-xs font-light text-gray-400">{description}</p>
                <div className="grid grid-cols-2">
                  <div className="w-min mt-3 text-left text-xs font-medium text-yellow-500 bg-yellow-200 px-3 py-1 rounded-lg justify-self-start">{source}</div>
                  <a href={url} className=" w-min mt-3 text-right text-xs font-medium animate-pingtext-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-500 ease-in-out px-3 py-1 rounded-lg justify-self-end">
                    <LinkIcon className="h-4 w-4 text-gray-500 animate-pulse" />
                  </a>
                </div>
              </div>
            );
          })}
        </ol>
        <button onClick={() => setPage((current) => current + 1)} type="button" className="bg-blue-400 hover:bg-blue-700 ring-4 ring-blue-100 text-white py-2 px-4 rounded text-l font-medium">Load More</button>
      </div>
    </div>
  );
};

export default News;
