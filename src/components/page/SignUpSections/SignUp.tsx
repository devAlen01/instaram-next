import React, { FC } from "react";
import scss from "./SignUp.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const SignUp: FC = () => {
  return (
    <section className={scss.SignUp}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.auth}>
            <div className={scss.forms}>
              <Image src={logo} alt="logo" />

              <p>Sign up to see your friends' photos and videos.</p>

              <form>
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Photo" />
                <input type="password" placeholder="Password" />
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

                <button>Register</button>
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
