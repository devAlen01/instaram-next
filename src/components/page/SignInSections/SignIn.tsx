"use client";
import React, { FC, useEffect, useState } from "react";
import scss from "./SignIn.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import screen1 from "@/assets/screenshot1.png";
import screen2 from "@/assets/screenshot2.png";
import screen3 from "@/assets/screenshot3.png";
import screen4 from "@/assets/screenshot4.png";

const SignIn: FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const screens = [screen1, screen2, screen3, screen4];
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount: number) => (prevCount + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className={scss.SignIn}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.image}>
            <Image src={screens[counter]} alt="img" />
          </div>
          <div className={scss.auth}>
            <div className={scss.forms}>
              <Image src={logo} alt="logo" />
              <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
              </form>
              <div className={scss.or}>
                <div className={scss.line}></div>
                <span>OR</span>
                <div className={scss.line}></div>
              </div>
              <div className={scss.link}>
                <Link href={"#"} className={scss.faceBook}>
                  Log in with Facebook?
                </Link>
                <Link href={"#"} className={scss.forgot}>
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className={scss.register}>
              <span>Don't have an account yet?</span>{" "}
              <Link href={"#"}>Register</Link>
            </div>
            <div className={scss.store}>
              <h5>Install the application.</h5>
              <div className={scss.btn}>
                <button>App Store</button>
                <button> Google Play</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
