import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="text-4xl text-center font-bold">
        <h1 className="p-2">Bonjour! Welcome to Joe Juicer&apos;s portfolio</h1>
      </div>
      <main className="bg-[#363636] m-6 xl:mx-auto my-6 max-w-7xl rounded-2xl p-2 lg:px-2">
        <div className="mx-auto max-w-7xl bg-[#fbfbfb] rounded-xl shadow-xl p-6 lg:px-8">
          <div className="text-2xl font-bold uppercase">
            <div className="flex justify-start">
              <p className="colorSliding p-2">about me 🤗 🗒</p>
            </div>
          </div>
          <p className="font-medium py-6">
            Bonjour 👋! I am Joe Juicer 21 years old 🇻🇳, student of web
            development at FPT Polytechnic College of CanTho. I love reading
            comic and manga, playing games and sports(🎾 ⚽ 🏀), listening
            US-UK&apos;s song 🎶 and news 📰. It&apos;s very nice to meet
            y&apos;all 🧡.
          </p>
          <div className="relative flex overflow-x-hidden">
            <div className="py-12 flex animate-marquee whitespace-nowrap">
              <Image
                className="mx-5"
                src="/images/JavaScript-logo.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/tailwind.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5 border"
                src="/images/nextjs1.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/typescript.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/reactjs.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/nodejs.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/html.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/css.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="absolute flex top-0 py-12 animate-marquee2 whitespace-nowrap">
              <Image
                className="mx-5"
                src="/images/JavaScript-logo.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/tailwind.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5 border"
                src="/images/nextjs1.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/typescript.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/reactjs.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/nodejs.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/html.png"
                height="100"
                width="100"
                alt=""
              />
              <Image
                className="mx-5"
                src="/images/css.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
