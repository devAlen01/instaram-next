"use client";
import React, { FC, useState } from "react";
import scss from "./SideBar.module.scss";
import InstaIcon from "@/assets/icons/insta-icon";
import { sideBarLinks } from "@/constants/side-bar-links";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { usepostStore } from "@/store/usePostStore";

const SideBar: FC = () => {
  const { data } = useGetMeQuery();
  const router = useRouter();
  const { setIsCreate } = usepostStore();

  return (
    <section className={scss.SideBar}>
      <div className={scss.container}>
        <div className={scss.content}>
          <div onClick={() => router.push("/")} className={scss.logo}>
            <InstaIcon />
          </div>
          <div className={scss.nav}>
            {sideBarLinks.map((item, index) => (
              <Link href={item.link} className={scss.item} key={index}>
                <div className={scss.link}>
                  <span className={scss.icon}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            <div className={scss.item} onClick={() => setIsCreate(true)}>
              <div className={scss.link}>
                <span className={scss.icon}>
                  <TbSquareRoundedPlus />
                </span>
                <span>Create</span>
              </div>
            </div>

            <Link href={"/profile"} className={scss.profile}>
              <img
                src={
                  data?.profile.photo ||
                  "https://www.pngfind.com/pngs/b/110-1102775_download-empty-profile-hd-png-download.png"
                }
                alt="profile"
              />
              <span className={scss.name}>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
