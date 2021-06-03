import Layout  from '@components/Layout';
import Badge from '@components/Badge';
import CardMovie from '@components/CardMovie'
import { createUrlApi } from '@utils/createUrlApi';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function MovieDetail(props) {
  const [adult, setAdult] = useState();

  if (props.movie.adult) {
    setAdult(
      <p className="text-red-500">adults</p>
    )
  }


  return (
    <Layout title="Detail Movie">
      <div className="flex gap-5">
        <div className="flex-none relative h-80 w-60 rounded-2xl overflow-hidden">
          <Image
            src={`http://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
            layout="fill"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{props.movie.original_title}</h2>
          {/* {adult} */}
          <div className="flex gap-2 mt-1">
            {props.movie.genres.map((genre, i) => {
              return (
                <Badge
                  key={i}
                  text={genre.name}
                />
              )
            })}
          </div>
          {adult}

          <div className="my-5">
            <h3 className="text-xl mb-1">Data</h3>
            <table>
              <tr>
                <td width={150}>Companie</td>
                <td>: {props.movie.production_companies[0].name}</td>
              </tr>
              <tr>
                <td>Release Date</td>
                <td>: {props.movie.release_date}</td>
              </tr>
              <tr>
                <td>Rate</td>
                <td>: {props.movie.vote_average * 10}%</td>
              </tr>
            </table>
          </div>

          <div className="my-5">
            <h3 className="text-xl mb-1">Overview</h3>
            <p>{props.movie.overview}</p>
          </div>
        </div>
      </div>
      
      <hr className="my-5"/>
      <div>
        <h2 className="text-2xl mb-1">Similar Movies</h2>
        <div className="flex flex-wrap justify-between gap-8 my-5">
        {props.similarMovies.results.map((movie) => {
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
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { movie_id } = ctx.query;
  
  const resMovie = await fetch(createUrlApi(`/movie/${movie_id}`));
  const movie = await resMovie.json();

  const resSimilarMovies = await fetch(createUrlApi(`/movie/${movie_id}/similar`));
  const similarMovies = await resSimilarMovies.json();

  return {
    props: {
      movie,
      similarMovies
    },
  }
}