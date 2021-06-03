export default function Badge(props) {
  return (
    <div className="inline-flex flex gap-x-2 p-2 rounded-xl bg-indigo-500 bg-opacity-20 my-2">
      {props.icon}
      <p className="self-center text-sm">{props.text}</p>
    </div>
  )
}
