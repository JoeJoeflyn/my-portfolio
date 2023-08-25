import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function SocialMedia() {
  return (
    <main className="bg-[#363636] m-6 xl:mx-auto my-6 max-w-7xl rounded-2xl p-2 lg:px-2">
      <div className="mx-auto max-w-7xl bg-[#fbfbfb] rounded-xl shadow-xl p-6 lg:px-8">
        <div className="text-2xl font-bold uppercase">
          <div className="flex justify-start">
            <p className="colorSliding p-2">social media 🔎 💬</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6 py-6">
          <a
            className="grid grid-cols-[40px_1fr_40px] items-center bg-white shadow-md rounded-lg p-2 hover:border-[#337CB6] hover:scale-105 hover:border-4 border-4 border-transparent transition duration-500 ease-in"
            href="https://www.linkedin.com/in/tai-nguyen-106a1624b/"
          >
            <Image
              width={42}
              height={42}
              src="/images/linkedin.png"
              alt="linkedin"
              className="shadow-lg shadow-[#337CB6]"
            />
            <span className="ml-3">Tai Nguyen</span>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
          </a>
          <a
            className="grid grid-cols-[40px_1fr_40px] items-center bg-white shadow-md rounded-lg p-2 hover:border-black hover:scale-105 hover:border-4 border-4 border-transparent transition duration-500 ease-in"
            href="https://github.com/JoeJoeflyn"
          >
            <Image
              width={42}
              height={42}
              src="/images/github2.png"
              alt="github"
              className="shadow-lg shadow-black"
            />
            <span className="ml-3">JoeJoeflyn</span>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
          </a>
          <a
            className="grid grid-cols-[40px_1fr_40px] items-center bg-white shadow-md rounded-lg p-2 hover:border-black hover:scale-105 hover:border-4 border-4 border-transparent transition duration-500 ease-in"
            href="https://wakatime.com/@Joe_juicer03"
          >
            <Image
              width={42}
              height={42}
              src="/images/wakatime3.png"
              alt="wakatime"
              className="shadow-lg shadow-black"
            />
            <span className="ml-3">Joe_juicer03</span>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </main>
  );
}
