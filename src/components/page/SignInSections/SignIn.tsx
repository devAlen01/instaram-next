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
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignInMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import InstaIcon from "@/assets/icons/insta-icon";

const SignIn: FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState<string>("");
  const screens = [screen1, screen2, screen3, screen4];
  const { register, handleSubmit, reset } = useForm<ISignIn>();
  const [signInMutation] = useSignInMutation();
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount: number) => (prevCount + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    console.log("🚀 ~ constonSubmit:SubmitHandler<ISignIn>= ~ data:", data);
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const response: any = await signInMutation(user);
      response.error
        ? setApiResponse(response?.error.data.message)
        : (localStorage.setItem("tokens", JSON.stringify(response.data)),
          setTimeout(() => router.push("/"), 400),
          reset());
    } catch (error: any) {
      console.log("Неверные входные данные", error.message);
      setApiResponse(error.message ? "Неверные входные данные" : "");
    }
  };
  let windowSize = window.innerWidth < 900;
  return (
    <section className={scss.SignIn}>
      <div className="container">
        <div className={scss.content}>
          <div
            className={scss.image}
            style={{ display: windowSize ? "none" : "" }}
          >
            <Image
              width={300}
              height={500}
              src={screens[counter]}
              alt="img"
              priority
            />
          </div>
          <div className={scss.auth}>
            <div className={scss.forms}>
              {/* <Image width={200} height={60} src={logo} alt="logo" priority /> */}
              <div className={scss.icon}>
                <InstaIcon />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {apiResponse.length > 0 ? (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {apiResponse}
                  </p>
                ) : (
                  <p style={{ padding: "5px 0" }}></p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button type="submit">Login</button>
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
                <Link href={"/auth/forgot"} className={scss.forgot}>
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className={scss.register}>
              <span>Don&apos;t have an account yet?</span>{" "}
              <Link href={"/auth/sign-up"}>Register</Link>
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
