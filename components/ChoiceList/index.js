import { useState } from 'react';

export default function ChoiceList(props) {
  const [value, setValue] = useState(props.list[0].title);
  const [showDialog, setShowDialog] = useState(false);

  const handleClickButton = () => {
    if (showDialog) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  }

  const handleClickOption = (value) => {
    setValue(value);
    setShowDialog(false);
  }

  return (
    <div className={`${props.className} relative inline-block`}>
      <button
        onClick={handleClickButton}
        className={`w-32 bg-indigo-100 px-3 py-1 border-2 border-indigo-500 rounded-full focus:outline-none`}
      >
        {value}
      </button>
      <div className={`${(showDialog) ? '' : 'hidden'} bg-white border-2 border-indigo-100 w-32 absolute z-10 rounded-md mt-2 shadow-2xl`}>
        {props.list.map((item, i) => {
          return (
            <label
              key={i}
              htmlFor={item.value}
              className={`${(i !== props.list.length -1) ? 'border-b-2 border-indigo-100' : '' } ${(value === item.value) ? 'bg-indigo-100' : ''} block p-3 hover:bg-indigo-100 cursor-pointer`}
              onChange={props.onChangeList}
              onClick={() => handleClickOption(item.title)}
            >
              <input
                type="radio"
                value={item.value}
                name={props.name}
                id={item.value}
                checked={value === item.value}
                onChange={() => setValue(value)}
                className="appearance-none"
              />
              {item.title}
            </label>
          )
        })}
      </div>
    </div>
  )
}
