import Layout from '@components/Layout'
import Title from '@components/Title'
import CardMovie from '@components/CardMovie'
import { createUrlApi } from '@utils/createUrlApi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@components/Button';

export default function NowPlaying(props) {
  const [currentPage, setCurrentPage] = useState(props.nowPlaying.page);
  const [results, setResults] = useState(props.nowPlaying.results);

  useEffect(async () => {
    if (currentPage !== 1) {
      const resNowPlaying = await fetch(createUrlApi('/movie/now_playing', [`page=${currentPage}`]));
      const nowPlaying = await resNowPlaying.json();
  
      setResults([...results, ...nowPlaying.results]);
    }
  }, [currentPage])
  
  return (
    <Layout title="Now Playing">
      <Title title="Now Playing"/>
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
          disabled={currentPage > props.nowPlaying.total_pages}
        >
          Load more
        </Button>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resNowPlaying = await fetch(createUrlApi('/movie/now_playing'));
  const nowPlaying = await resNowPlaying.json();

  return {
    props: { 
      nowPlaying,
    },
    revalidate: 1,
  }
}

