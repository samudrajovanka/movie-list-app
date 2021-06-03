import Head from 'next/head';

export default function Layout(props) {
  const title = props.title ? `${props.title} | ${process.env.APP_NAME}` : process.env.APP_NAME;
  
  return (
    <div className='container mx-auto w-4/5 py-3'>
      <Head>
        <title>{title}</title>
      </Head>
      
      {props.children}
    </div>
  )
}