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
    const tokens = JSON.parse(localStorage.getItem("tokens")!);
    if (!tokens) return;
    const { accessTokenExpiration, refreshToken } = tokens;
    if (accessTokenExpiration <= Date.now()) {
      console.log("Токен истек!");
      try {
        const { data } = await refreshTokenMutation(refreshToken);
        localStorage.removeItem("tokens");
        localStorage.setItem("tokens", JSON.stringify(data));
        window.location.reload();
      } catch (error) {
        console.error(error);
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
