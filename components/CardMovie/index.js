import Image from 'next/image';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import Badge from '@components/Badge';

export default function CardMovie(props) {
  const [icon, setIcon] = useState();
  const [release, setRelease] = useState(props.release);

  useEffect(() => {
    const renderIcon = () => {
      if (props.rating > 7.5 ) {
        setIcon(<FontAwesomeIcon
          icon={faStar}
          className={`text-green-500 text-sm self-center`}/>
        )
      } else if (props.rating > 5 && props.rating <= 7.5) {
        setIcon(<FontAwesomeIcon
          icon={faStar}
          className={`text-yellow-500 text-sm self-center`}/>
        )
      } else if (props.rating > 0 && props.rating <= 5) {
        setIcon(<FontAwesomeIcon
          icon={faStar}
          className={`text-red-500 text-sm self-center text-sm`}/>
        )
      }
    }

    const renderRelease = () => {
      if (release !== undefined) {
        const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const releaseSplit = release.split('-');
        const [year, month, day] = releaseSplit;
  
        setRelease(`${day} ${monthString[parseInt(month)-1]} ${year}`);
      }
    }

    renderIcon();
    renderRelease();

  }, []);

  return (
    <div className="w-full p-2 pb-3 border-2 border-gray-200 rounded-xl hover:shadow-lg hover:bg-gray-100">
      <div className="relative h-80 md:h-60">
        <Image
          src={props.image}
          alt="Picture movie"
          layout="fill"
          loading="eager"
          objectFit="cover"
          className="rounded-xl bg-gray-200"/>
      </div>
      <Badge
        icon={icon}
        text={`${props.rating * 10}%`}
      />
      <h5 className={`text-lg font-bold leading-tight line-clamp-2 mb-2`}>{props.title}</h5>
      <p className="text-gray-500 text-xs">Release at {release !== undefined ? release : '-' }</p>
    </div>
  )
}
