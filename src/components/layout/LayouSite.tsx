"use client";
import { ReactNode, useEffect, useState } from "react";
import scss from "./LayouSite.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { usePathname } from "next/navigation";
import { useGetMeQuery, useRefreshTokenMutation } from "@/redux/api/auth";
import SideBar from "./SideBar/SideBar";
import Loading from "@/ui/Loading/Loading";
import CreatePost from "../page/HomeSections/CreatePost";

const LayouSite = ({ children }: { children: ReactNode }) => {
  const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const { isLoading, data } = useGetMeQuery();
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/forgot":
      case "/auth/reset-password":
        setIsAuthPage(true);
        break;
      default:
        setIsAuthPage(false);
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const refreshToken = async () => {
      const tokens = JSON.parse(localStorage.getItem("tokens")!);
      const res = await refreshTokenMutation(tokens.refreshToken);
      console.log("🚀 ~ refreshToken ~ res:", res);
      localStorage.setItem("tokens", JSON.stringify(res.data));
    };
    const interval = setInterval(refreshToken, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshTokenMutation]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [data?.profile]);

  if (loading) return <Loading />;
  return (
    <div className={scss.LayouSite}>
      <div className={scss.site}>
        {!isAuthPage && <SideBar />}
        <div className={scss.content}>
          {!isAuthPage && !pathname.includes("profile") ? <Header /> : null}
          <main>{children}</main>
          {!isAuthPage && <Footer />}
        </div>
        <div
          style={{
            display: pathname.includes("profile") ? "none" : "",
          }}
          className={
            !isAuthPage || pathname.includes("profile") ? scss.right : ""
          }
        ></div>
        <CreatePost />
      </div>
    </div>
  );
};

export default LayouSite;
