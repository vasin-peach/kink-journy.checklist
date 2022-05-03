import React from "react";
import logo from "../assets/images/logo.svg";
import fb from "../assets/images/fb.svg";
import twitter from "../assets/images/twitter.svg";

const Header: React.FC = () => {
  return (
    <div className="header-container ">
      <div className="wrapper flex flex-row justify-between">
        <div>
          <img src={logo} />
        </div>

        <div className="flex flex-row items-center">
          <div>
            <a href="https://twitter.com/inner_taboo" target="_blank">
              <img src={fb} />
            </a>
          </div>
          <div className="ml-2">
            <a href="https://twitter.com/inner_taboo" target="_blank">
              <img src={twitter} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
