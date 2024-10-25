"use client";

import React, { FC, useState } from "react";
import scss from "./ResetPassword.module.scss";
import Link from "next/link";
import ForgotIcon from "@/assets/icons/forgot-icon";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/redux/api/auth";

const ResetPassword: FC = () => {
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState<string>("");
  const [apiResponseError, setApiResponseError] = useState<string>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { register, handleSubmit, reset } =
    useForm<AUTH.ResetPasswordRequest>();
  const [resetPasswordMutation] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<AUTH.ResetPasswordRequest> = async (data) => {
    const newData: AUTH.ResetPasswordRequest = {
      newPassword: data.newPassword,
      token: `${token}`,
    };

    try {
      const response: any = await resetPasswordMutation(newData);
      console.log("ResetPasswordRes", response);
      response.error
        ? setApiResponseError(response?.error.data.message)
        : (setApiResponse(response.data.message), router.push("/auth/sign-in"));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={scss.ResetPassword}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth}>
            <div className={scss.forms}>
              <div className={scss.icon}>
                <ForgotIcon />
                <p>Enter new password.</p>
                {apiResponseError && (
                  <p style={{ color: "orange" }}>{apiResponseError}</p>
                )}

                {apiResponse && (
                  <p style={{ color: "yellowgreen" }}>{apiResponse}</p>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="password"
                  placeholder="New password"
                  {...register("newPassword", { required: true })}
                />
                <button type="submit">Submit</button>
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

export default ResetPassword;
