"use client";

import React, { FC, useState } from "react";
import scss from "./Forgot.module.scss";
import Link from "next/link";
import ForgotIcon from "@/assets/icons/forgot-icon";
import { useForgotPasswordMutation } from "@/redux/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";

const Forgot: FC = () => {
  const { register, reset, handleSubmit } =
    useForm<AUTH.ForgotPasswordRequest>();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [apiResponse, setApiResponse] = useState<string>("");
  const [apiResponseError, setApiResponseError] = useState<string>("");

  const onSubmit: SubmitHandler<AUTH.ForgotPasswordRequest> = async (data) => {
    try {
      const newData: AUTH.ForgotPasswordRequest = {
        email: data.email,
        frontEndUrl: process.env.NEXT_PUBLIC_REDIRECT!,
      };
      const response: any = await forgotPasswordMutation(newData);
      response.error
        ? setApiResponseError(response?.error.data.message)
        : (setApiResponse(response.data.message), reset());
    } catch (error: any) {
      console.error(error);
      setApiResponseError(error.message);
    }
  };
  return (
    <section className={scss.Forgot}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth}>
            <div className={scss.forms}>
              <div className={scss.icon}>
                <ForgotIcon />
                <p>Having trouble logging in?</p>
              </div>
              <p className={scss.text}>
                Enter your email address and we will send you a link to regain
                access to your account.
              </p>
              {apiResponseError && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {apiResponseError}
                </p>
              )}

              {apiResponse && (
                <p style={{ color: "yellowgreen", textAlign: "center" }}>
                  {apiResponse}
                </p>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <button type="submit">Get login link</button>
              </form>
              <div className={scss.or}>
                <div className={scss.line}></div>
                <span>OR</span>
                <div className={scss.line}></div>
              </div>
              <Link href={"/auth/sign-up"} className={scss.register}>
                Create new account
              </Link>
            </div>

            <div className={scss.bottom}>
              <Link href={"/auth/sign-in"}>Go to Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
