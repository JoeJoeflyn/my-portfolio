import Image from "next/image";

export default function About() {
  return (
    <main className="bg-[#363636] m-6 xl:mx-auto my-6 max-w-7xl rounded-2xl p-2 lg:px-2">
      <div className="mx-auto max-w-7xl bg-[#fbfbfb] rounded-xl shadow-xl p-6 lg:px-8">
        <div className="text-2xl font-bold uppercase">
          <div className="flex justify-start">
            <h1 className="colorSliding p-2">about me 🤗 🗒</h1>
          </div>
        </div>
        <p className="font-medium py-6">
          Bonjour 👋! I am Joe Juicer 21 years old 🇻🇳, student of web develope
          at FPT Polytechnic College of CanTho. I love reading comic and manga,
          playing games and sports(🎾 ⚽ 🏀), listening US-UK&apos;s song 🎶 and
          news 📰. It&apos;s very nice to meet y&apos;all 🧡.
        </p>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <Image
                src="/../public/JavaScript-logo.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/tailwind.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/nextjs1.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/typescript.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/reactjs.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/nodejs.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image
                src="/../public/html.png"
                height="100"
                width="100"
                alt=""
              />
            </div>
            <div className="slide">
              <Image src="/../public/css.png" height="100" width="100" alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
