import Link from 'next/link';
import Title from '@components/Title'
import styles  from './styles.module.scss';
import CardMovie from '@components/CardMovie';
import ChoiceList from '@components/ChoiceList';

export default function Section(props) {
  let choiceButton;
  if (props.choiceList) {
    choiceButton = (
      <ChoiceList
        name={props.choiceName}
        list={props.choiceList}
        className="ml-3"
        onChangeList={props.onChangeList}
      />
    )
  }

  return (
    <section className="pb-5">
        <Title title={props.title}/>
        {choiceButton}
        <div className={`${styles["hide-scrollbar"]} grid grid-rows-1 grid-flow-col gap-5 my-5 overflow-x-auto`}>
          {props.data.results.map((movie) => {
            return (
              <Link
                href={{
                  pathname: '/movies/[movie_id]',
                  query: { movie_id: movie.id }
                }}
                key={movie.id}
              >
                <a className="cursor-pointer w-48">
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

      </section>
  )
}
