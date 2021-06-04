import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex h-screen justify-center">
      <div className="flex-none self-center">
        <Image
          src="/images/loader.svg"
          alt="Loading..."
          width="100"
          height="100"
        />
      </div>
    </div>
  )
}
