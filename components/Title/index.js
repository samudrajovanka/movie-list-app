import styles from './styles.module.scss';

export default function Title(props) {
  return (
    <>
      <h2 className={`${styles.title} text-2xl font-bold pb-2 inline-block`}>{props.title}</h2> 
    </>
  )
}
