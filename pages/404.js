import Layout from "@components/Layout";
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col">
        <Image
          src="/images/not-found.svg"
          alt="Not found image"
          width={100}
          height="fill"
        />
        <p className="self-center text-2xl mt-4">Sorry, Page Not Found</p>
        <p className="self-center text-lg">
          Back to{' '}
          <Link
            href="/">
            <a className="underline hover:text-indigo-500">
              home
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
