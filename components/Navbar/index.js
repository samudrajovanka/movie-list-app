import { useState } from 'react'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-900 mb-3 sticky top-0 z-50">
        <div className="container mx-auto w-4/5 flex flex-wrap items-center">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              >
                {process.env.APP_NAME}
              </a>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={navbarOpen ? faTimes : faBars} />
            </button>
          </div>
          <div
            className={
              "lg:flex items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link href="/popular">
                  <a
                    className={`${styles.link} ${(router.pathname === '/popular') ? styles.active : ''} relative inline-block mx-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white`}
                  >
                    Popular
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/now-playing">
                  <a
                    className={`${styles.link} ${(router.pathname === '/now-playing') ? styles.active : ''} relative inline-block mx-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white`}
                  >
                    Now Playing
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/up-coming">
                  <a
                    className={`${styles.link} ${(router.pathname === '/up-coming') ? styles.active : ''} relative inline-block mx-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white`}
                  >
                    Up Coming
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/top-rated">
                  <a
                    className={`${styles.link} ${(router.pathname === '/top-rated') ? styles.active : ''} relative inline-block mx-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white`}
                  >
                    Top Rated
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}