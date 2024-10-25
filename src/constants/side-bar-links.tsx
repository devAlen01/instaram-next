import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
export const sideBarLinks = [
  {
    link: "/",
    icon: <GoHomeFill />,
    name: "Home",
  },
  {
    link: "#",
    icon: <FiSearch />,
    name: "Search",
  },
  {
    link: "#",
    icon: <MdOutlineExplore />,
    name: "Explore",
  },
  {
    link: "#",
    icon: <BsFillCameraVideoFill />,
    name: "Reels",
  },
  {
    link: "#",
    icon: <BiMessageSquareDetail />,
    name: "Messages",
  },
  {
    link: "#",
    icon: <FiHeart />,
    name: "Notifications",
  },
];
