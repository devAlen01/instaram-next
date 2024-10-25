import React, { FC } from "react";
import scss from "./Loading.module.scss";
import Image from "next/image";
import logo from "@/assets/instalogo.webp";
const Loading: FC = () => {
  return (
    <section className={scss.Loading}>
      <div className={scss.content}>
        <Image width={100} height={100} src={logo} alt="logo" />
      </div>
    </section>
  );
};

export default Loading;
