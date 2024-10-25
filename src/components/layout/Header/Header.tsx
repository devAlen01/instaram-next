import React, { FC } from "react";
import scss from "./Header.module.scss";
import { stories } from "@/constants/stories";

const Header: FC = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          {stories.map((item, index) => (
            <div className={scss.item} key={index}>
              <div className={scss.image}>
                <img src={item.profile} alt="profile" />
              </div>
              <div className={scss.text}>
                <span className={scss.name}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
