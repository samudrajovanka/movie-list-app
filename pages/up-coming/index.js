import Layout from '@components/Layout'
import Title from '@components/Title'
import CardMovie from '@components/CardMovie'
import { createUrlApi } from '@utils/createUrlApi';
import React from 'react'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@components/Button';

export default function UpComing(props) {
  const [currentPage, setCurrentPage] = useState(props.upComing.page);
  const [results, setResults] = useState(props.upComing.results);

  useEffect(async () => {
    if (currentPage !== 1) {
      const resUpComing = await fetch(createUrlApi('/movie/upcoming', [`page=${currentPage}`]));
      const upComing = await resUpComing.json();
  
      setResults([...results, ...upComing.results]);
    }
  }, [currentPage])
  
  return (
    <Layout title="Up Coming">
      <Title title="Up Coming"/>
      <div className="flex flex-wrap justify-between gap-8 my-5">
        {results.map((movie) => {
          return (
            <Link
              href="/"
              key={movie.id}
            >
              <a className="cursor-pointer">
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
          disabled={currentPage > props.upComing.total_pages}
        >
          Load more
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resUpComing = await fetch(createUrlApi('/movie/upcoming'));
  const upComing = await resUpComing.json();

  return {
    props: { 
      upComing,
    },
    revalidate: 1,
  }
}

