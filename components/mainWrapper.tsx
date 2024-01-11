"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [stickyBool, setStickyBool] = useState(true);
  // const [pageHeight, setPageHeight] = useState(0);
  // const ref = useRef<any>(null);

  // const { width, height } = useWindowDimensions();

  // useEffect(() => {
  //   console.log("height", height);
  //   console.log("pageHeight", pageHeight);
  //   if (height) {
  //     setStickyBool(height > pageHeight ? true : false);
  //   }
  // }, [pageHeight, height, width]);

  // useEffect(() => {
  //   const measuredHeight = ref.current.offsetHeight;
  //   setPageHeight(measuredHeight);
  // }, [ref, height, width]);

  return (
    <>
      <Navbar />
      <main
        // ref={ref}
        className={`${"min-h-[calc(100vh-120px)]"} h-full mx-auto bg-heavy-grey flex`}
      >
        <div className="flex min-h-full flex-col items-center w-full">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
