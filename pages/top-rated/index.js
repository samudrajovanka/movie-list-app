import Layout from '@components/Layout'
import Title from '@components/Title'
import CardMovie from '@components/CardMovie'
import { createUrlApi } from '@utils/createUrlApi';
import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@components/Button';

export default function TopRated(props) {
  const [currentPage, setCurrentPage] = useState(props.topRated.page);
  const [results, setResults] = useState(props.topRated.results);

  useEffect(async () => {
    if (currentPage !== 1) {
      const resTopRated = await fetch(createUrlApi('/movie/top_rated', [`page=${currentPage}`]));
      const topRated = await resTopRated.json();
  
      setResults([...results, ...topRated.results]);
    }
  }, [currentPage])
  
  return (
    <Layout title="Top Rated">
      <Title title="Top Rated"/>
      <div className="flex flex-wrap justify-between gap-4 my-5">
        {results.map((movie) => {
          return (
            <Link
              href={{
                  pathname: '/movies/[movie_id]',
                  query: { movie_id: movie.id }
                }}
              key={movie.id}
            >
              <a className="cursor-pointer w-full sm:w-60 md:w-48 xl:w-48">
                <CardMovie
                  title={movie.title}
                  release={movie.release_date}
                  image={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  rating={movie.vote_average}
                />
              </a>
            </Link>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage > props.topRated.total_pages}
        >
          Load more
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resTopRated = await fetch(createUrlApi('/movie/top_rated'));
  const topRated = await resTopRated.json();

  return {
    props: { 
      topRated,
    },
    revalidate: 1,
  }
}

