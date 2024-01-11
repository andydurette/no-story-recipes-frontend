import { useEffect } from "react";

const Footer = (stickyBool: any) => {
  return (
    <div
      className={`${
        !stickyBool ? "sticky bottom-0" : ""
      }  p-4 bg-heavy-grey text-white m-auto`}
    >
      <p className="text-center">Copyright © Andy Durette 2023</p>
    </div>
  );
};
export default Footer;
