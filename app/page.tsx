"use client";
import mixer from "../assets/mixer.svg";

export default function Home() {
  return (
    <div className="flex h-full m-0-auto max-w-screen-2xl items-center justify-center bg-no-repeat flex-col 10p">
      <div className="flex flex-col xl:flex-row justify-center items-center">
        <div className="p-[5px]">
          <h1 className="font-bold text-5xl sm:text-6xl md:text-8xl text-center md:basis-3/4 lg:basis-auto">
            No <span className="text-tang">biographies</span>, no{" "}
            <span className="text-tang">history</span> lessons, just recipes
          </h1>
        </div>
        <div
          className="flex m-0-auto items-center justify-center bg-no-repeat flex-col p-[10rem] sm:p-60 md:p-80 rounded-ful"
          style={{
            backgroundImage: `url(${mixer.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      {/* <Link
        className="mt-4 px-4 py-2 font-bold bg-black rounded-md"
        href="/recipes"
      >
        VIEW RECIPES
      </Link> */}
    </div>
  );
}
