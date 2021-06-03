import Layout from '@components/Layout'
import Section from '@components/Section'
import { createUrlApi } from '@utils/createUrlApi';
import { useState, useEffect } from 'react'

export default function Home(props) {
  const [time, setTime] = useState('day');
  const [dataTrending, setDataTrending] = useState(props.trendingDay);

  useEffect(() => {
    if (time === 'day') {
      setDataTrending(props.trendingDay);
    } else if (time === 'week') {
      setDataTrending(props.trendingWeek);
    }
  }, [time]);

  return (
    <Layout>
      <Section
        title="Trending"
        data={dataTrending}
        choiceName="time"
        choiceList={[
          {value: "day", title: "Day"},
          {value: "week", title: "Week"},
        ]}
        onChangeList={(e) => setTime(e.target.value)}
      />
      <Section
        title="Most Popular"
        data={props.popular}
      />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const resPopular = await fetch(createUrlApi('/movie/popular'));
  const popular = await resPopular.json();

  const resTrendingDay = await fetch(createUrlApi('/trending/movie/day'));
  const trendingDay = await resTrendingDay.json();

  const resTrendingWeek = await fetch(createUrlApi('/trending/movie/week'));
  const trendingWeek = await resTrendingWeek.json();

  return {
    props: { 
      popular,
      trendingDay,
      trendingWeek,
    },
    revalidate: 1,
  }
}
