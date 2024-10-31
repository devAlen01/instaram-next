"use client";
import { FC, ReactNode, useEffect } from "react";
import { useRefreshTokenMutation } from "@/redux/api/auth";
import { usePathname } from "next/navigation";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const checkAccessToken = async () => {
    const tokensString = localStorage.getItem("tokens");
    if (!tokensString) return;

    let tokens;
    try {
      tokens = JSON.parse(tokensString);
    } catch (error) {
      console.error("Ошибка парсинга токенов", error);
      localStorage.removeItem("tokens");
      window.location.href = "/auth/sign-in";
      return;
    }

    const { accessTokenExpiration, refreshToken } = tokens;
    if (accessTokenExpiration <= Date.now()) {
      console.log("Токен истек!");
      try {
        const { data } = await refreshTokenMutation(refreshToken);
        localStorage.removeItem("tokens");
        localStorage.setItem("tokens", JSON.stringify(data));
        window.location.reload();
      } catch (error) {
        console.error("Ошибка обновления токена", error);
        localStorage.removeItem("tokens");
        window.location.href = "/auth/sign-in";
      }
    } else {
      console.log("Токен живой!");
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, [pathname]);

  return <>{children}</>;
};

export default SessionProvider;
