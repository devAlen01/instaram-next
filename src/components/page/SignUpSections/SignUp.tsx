"use client";
import React, { FC, useState } from "react";
import scss from "./SignUp.module.scss";
import Link from "next/link";

import { useSignUpMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InstaIcon from "@/assets/icons/insta-icon";

const SignUp: FC = () => {
  const [signUpMutation] = useSignUpMutation();
  const [apiResponse, setApiResponse] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<ISignUpAuth>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ISignUpAuth> = async (data) => {
    try {
      const newUser: ISignUpAuth = {
        email: data.email,
        username: data.username,
        photo:
          "https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png",
        password: data.password,
      };
      const response: any = await signUpMutation(newUser);
      response.error
        ? setApiResponse(response?.error.data.message)
        : (localStorage.setItem("tokens", JSON.stringify(response.data)),
          setTimeout(() => router.push("/"), 1000),
          reset());
    } catch (error: any) {
      console.log("Неверные входные данные", error.message);
      setApiResponse(error.message);
    }
  };

  return (
    <section className={scss.SignUp}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth}>
            <div className={scss.forms}>
              <div className={scss.icon}>
                <InstaIcon />
              </div>
              {apiResponse.length > 0 ? (
                <p style={{ color: "red" }}>{apiResponse}</p>
              ) : (
                <p>Sign up to see your friends&apos; photos and videos.</p>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  {...register("email", { required: true })}
                />
                <input
                  required
                  type="text"
                  placeholder="Name"
                  {...register("username", { required: true })}
                />

                <input
                  required
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <div className={scss.text}>
                  <p>
                    People who use our service may have downloaded your contact
                    information on Instagram. More details
                  </p>
                  <p>
                    By registering, you accept our Terms, <span></span>
                    <Link
                      href={
                        "https://help.instagram.com/581066165581870/?locale=ru_RU"
                      }
                      target="blank"
                    >
                      Policy privacy
                    </Link>{" "}
                    <span></span>
                    and
                    <span> </span>
                    <Link
                      href={
                        "https://privacycenter.instagram.com/policies/cookies/"
                      }
                      target="blank"
                    >
                      cookie policy
                    </Link>
                    .
                  </p>
                </div>

                <button type="submit">Register</button>
              </form>
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

export default SignUp;
