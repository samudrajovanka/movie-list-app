import React from 'react'

export default function Button(props) {
  let colorButton = 'bg-indigo-900  hover:bg-indigo-800';

  if (props.disabled) {
    colorButton = 'bg-gray-400 pointer-events-none';
  }

  return (
    <div>
      <button
        className={`${props.className} py-3 px-10 rounded-lg text-white ${colorButton}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  )
}
