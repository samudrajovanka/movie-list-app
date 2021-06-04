import Layout from '@components/Layout'
import Title from '@components/Title'
import CardMovie from '@components/CardMovie'
import { createUrlApi } from '@utils/createUrlApi';
import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@components/Button';

export default function Popular(props) {
  const [currentPage, setCurrentPage] = useState(props.popular.page);
  const [results, setResults] = useState(props.popular.results);

  useEffect(async () => {
    if (currentPage !== 1) {
      const resPopular = await fetch(createUrlApi('/movie/popular', [`page=${currentPage}`]));
      const popular = await resPopular.json();
  
      setResults([...results, ...popular.results]);
    }
  }, [currentPage])
  
  return (
    <Layout title="Popular">
      <Title title="Popular"/>
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
          disabled={currentPage > props.popular.total_pages}
        >
          Load more
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resPopular = await fetch(createUrlApi('/movie/popular'));
  const popular = await resPopular.json();

  return {
    props: { 
      popular,
    },
    revalidate: 1,
  }
}

