import React, { FC } from "react";
import scss from "./Footer.module.scss";
import { TbSquareRoundedPlus } from "react-icons/tb";
import Link from "next/link";
import { sideBarLinks } from "@/constants/side-bar-links";
import { useGetMeQuery } from "@/redux/api/auth";
import { usepostStore } from "@/store/usePostStore";

const Footer: FC = () => {
  const { data } = useGetMeQuery();
  const { setIsCreate } = usepostStore();
  const name = ["Messages", "Explore", "Notifications"];
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            {sideBarLinks
              .filter((el) => !name.includes(el.name))
              .map((item, index) => (
                <Link href={item.link} className={scss.item} key={index}>
                  <div className={scss.link}>
                    <span className={scss.icon}>{item.icon}</span>
                  </div>
                </Link>
              ))}
            <div className={scss.item} onClick={() => setIsCreate(true)}>
              <div className={scss.link}>
                <span className={scss.icon}>
                  <TbSquareRoundedPlus />
                </span>
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
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
