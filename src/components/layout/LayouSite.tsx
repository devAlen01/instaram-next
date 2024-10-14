"use client";

import { ReactNode, useEffect, useState } from "react";
import scss from "./LayouSite.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { usePathname } from "next/navigation";

const LayouSite = ({ children }: { children: ReactNode }) => {
  const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/sign-in":
      case "/sign-up":
        setIsAuthPage(true);
        break;

      default:
        setIsAuthPage(false);
        break;
    }
  }, [pathname]);
  return (
    <div className={scss.LayouSite}>
      {!isAuthPage && <Header />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default LayouSite;
