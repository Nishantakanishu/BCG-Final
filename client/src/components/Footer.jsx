import Logo from "../assets/Logo.png"
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-15 px-5 md:px-10">
      <div className="top flex flex-col gap-2 md:gap-5 md:flex-row md:justify-between">
        <div className="left">
          <img className=" w-40 md:w-52 " src={Logo} alt="logo" />
        </div>
        <div className="right text-gray-900 md:text-right">
          <div className="mobile font-bold text-lg tracking-tighter">+91 7777 012161 </div>
          <div className="email text-sm font-serif">E. ops@brightcg.com</div>
          <div className="address text-sm font-serif">A. India, Belgium and UAE</div>
        </div>
      </div>
      <div className="bottom flex justify-between items-center pt-4">
        <div className="left font-semibold text-gray-800 flex items-center gap-2">
          <span>@ 2021 All Rights Reserved.</span>
          <a href="/admin/login" className="text-xs text-gray-400 hover:text-primary hover:underline font-normal transition-all" title="Portal Access">
            | Admin Login
          </a>
        </div>
        <div className="right flex items-center gap-4  ">
          <a href="https://www.linkedin.com/company/bright-citrine-global" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 text-lg text-gray-800 hover:bg-gray-200">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  )
}
