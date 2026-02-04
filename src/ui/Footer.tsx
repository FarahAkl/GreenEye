import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import ScrollToHash from "./ScrollToHash";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark shadow-[0_-2px_10px_rgba(0,0,0,0.12)]">
      <ScrollToHash />
      <div className="grid grid-cols-1 justify-between gap-10 px-8 py-16 md:grid-cols-3 md:gap-0 md:px-12 lg:px-24">
        <ul className="flex flex-col items-center gap-4 md:items-start">
          <li className="mb-7">
            <div className="flex items-center gap-1">
              <img src="/images/logo.png" alt="logo" className="h-12" />
              <div className="flex text-2xl font-bold text-white">GreenEye</div>
            </div>
          </li>
          <li className="mb-2 w-full text-center text-white sm:w-3/4 md:text-start">
            <p>Copyright © {year} GreenEye ltd.</p>
            <p>All rights reserved</p>
          </li>

          <li className="flex gap-4 sm:gap-6">
            <Link
              to={"https://www.facebook.com/share/17xzZxXDMG/"}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[#F8FCFB]"
            >
              <FaFacebookF size={20} />
            </Link>

            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[#F8FCFB]">
              <FaTwitter size={20} />
            </div>

            <Link
              to={"https://www.linkedin.com/company/greeneyee/"}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[#F8FCFB]"
            >
              <FaLinkedin size={20} />
            </Link>
          </li>
        </ul>
        <div className="grid grid-cols-2 justify-between gap-10 text-center sm:text-start md:gap-0">
          <ul className="flex flex-col gap-3 text-sm">
            <li className="mb-2 text-xl font-semibold text-white">Company</li>
            <li className="text-white">
              <p className="outline-none">About us</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Blog</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Contact us</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Pricing</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Testimonials</p>
            </li>
          </ul>
          <ul className="flex flex-col items-center gap-3 text-sm sm:items-start">
            <li className="mb-2 text-xl text-white">Support</li>
            <li className="text-white">
              <p className="outline-none">Help center</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Terms of service</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Legal</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Privacy policy</p>
            </li>
            <li className="text-white">
              <p className="outline-none">Status</p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className="mb-2 text-xl font-semibold text-white">
            Stay up to date
          </p>
          <div className="flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-white sm:w-4/5">
            <input
              type="text"
              placeholder="Your email address"
              className="border-none outline-none"
            />
            <LuSend size={18} className="shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
