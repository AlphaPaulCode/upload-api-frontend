import "../css/nav.css";
import Logo from "./logo";
import Ham from "../pages/landing-page/icon/hamburger.png";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import axios from "../api/axios";
// import {useAuth, useAuthContext} from "../Contexts/AuthContext";

export default function Nav({ faq, feature, handleActive }) {
 const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // Send a request to the server's logout endpoint
      const response = await axios.post('/logout'); // Adjust the endpoint URL as needed
      navigate('/home')
      // Handle the server response (e.g., clear user session, update UI, etc.)
      // For simplicity, we'll just log the response
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const scrollDown = (offsetTop) => {
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollDownToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between landing-header">
        <div className={`logo-mobile landing-navbg1`}>
          <Link to="/">
            <Logo />
          </Link>
          <img
            className="nav-cancel"
            onClick={handleToggle}
            src={isOpen ? Ham : Cancel} // Toggle Ham and Cancel icons based on the isOpen state
            alt="Toggle Navigation"
          />
        </div>

        {!isOpen && (
          <NavMobile
            handleClick={handleActive}
            scrollDown={scrollDown}
            scrollDownToTop={scrollDownToTop} // Fix: Use scrollDownToTop function
            scrollDownToFeature={() => scrollDown(feature.current.offsetTop)}
          />
        )}

        <nav className="nav">
          <ul className="flex ml-8 space-x-4">
            <li className="relative">
              <a href="/list" onClick={() => scrollDownToTop()}> {/* Fix: Use scrollDownToTop function */}
                Operations
              </a>
            </li>

            <li className="relative" onClick={handleToggle}>
              <a href="#" className="flex items-center">
                WorkCentral{' '}
                {isOpen ? (
                  <AiFillCaretUp className="ml-1" />
                ) : (
                  <AiFillCaretDown className="ml-1" />
                )}
              </a>

              {isOpen && (
                <div className="absolute left-0 flex flex-col items-start w-[100%] md:w-[300px] bg-red-100 rounded-lg top-7">
                <a href="/folder/NDPR" className="w-full p-2 break-all hover:bg-slate-400 text-center">
                  NDPR
                </a>
                <a href="/folder/PCIDSS" className="w-full p-2 break-all hover-bg-slate-400">
                  PCIDSS
                </a>
                <a href="/folder/ISO-27001" className="w-full p-2 break-all hover:bg-slate-400">
                  ISO-27001
                </a>
                <a href="/folder/Compliance" className="w-full p-2 break-all hover:bg-slate-400">
                  Compliance
                </a>
                <a href="/folder/Organogram" className="w-full p-2 break-all hover:bg-slate-400">
                  Organogram
                </a>
                <a href="/folder/Documentations" className="w-full p-2 break-all hover:bg-slate-400">
                  Documentations
                </a>
                <a href="/folder/SLA" className="w-full p-2 break-all hover:bg-slate-400">
                  SLA
                </a>
                <a href="/folder/TAT" className="w-full p-2 break-all hover:bg-slate-400">
                  TAT
                </a>
                <a href="/folder/culture" className="w-full p-2 break-all hover:bg-slate-400">
                  culture
                </a>
                <a href="/folder/Information security management" className="w-full p-2 break-all hover:bg-slate-400">
                  Information security management.
                </a>
                {/* Add more menu items as needed */}
              </div>              
              )}
            </li>

            <li>
              <a className="nav-links" href="/quicklinks" onClick={() => scrollDown(faq.current.offsetTop)}>
                Quick links
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex">
          <button onClick={handleActive} className="landing-header-button w-[130px]">
            Upload
          </button>
          <button onClick={handleLogout} className="bg-orange-500 text-white w-[130px] ml-2  hover:bg-orange-300 hover:text-white">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
function NavMobile({
  handleClick,
  scrollDownToTop,
  scrollDownToFeature,
  scrollDown,
}) {
  return (
    <div className="nav-mobile">
      <nav>
        <ul>
          <li>
            <a href="#about" onClick={scrollDownToTop}>
              About Us
            </a>
          </li>
          <li>
            <a href="#feature" onClick={scrollDownToFeature}>
              Features
            </a>
          </li>
          <li>
            <a href="#faq" onClick={scrollDown}>
              FAQS
            </a>
          </li>
        </ul>
      </nav>
      <button onClick={handleClick} className="landing-header-button">
      Join Waitlist
      </button>
    </div>
    
  );
}

function Cancel({ handleClick }) {
  return (
    <svg
      className="nav-cancel"
      onClick={handleClick}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.35"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.382812 11.75C0.382812 5.26065 5.64347 0 12.1328 0C18.6222 0 23.8828 5.26065 23.8828 11.75C23.8828 18.2393 18.6222 23.5 12.1328 23.5C5.64347 23.5 0.382812 18.2393 0.382812 11.75Z"
        fill="#CCCCCC"
      />
      <path
        d="M17.7647 7.65638L17.2265 7.11823C17.077 6.96873 16.8347 6.96873 16.6852 7.11823L12.6328 11.1706L8.58042 7.11823C8.43092 6.96873 8.18854 6.96873 8.03904 7.11823L7.50089 7.65638C7.35139 7.80588 7.35139 8.04826 7.50089 8.19776L11.5533 12.2501L7.50089 16.3025C7.3514 16.452 7.3514 16.6944 7.50089 16.8439L8.03905 17.382C8.18854 17.5315 8.43093 17.5315 8.58043 17.382L12.6328 13.3296L16.6852 17.382C16.8347 17.5315 17.077 17.5315 17.2265 17.382L17.7647 16.8439C17.9142 16.6944 17.9142 16.452 17.7647 16.3025L13.7123 12.2501L17.7647 8.19776C17.9142 8.04826 17.9142 7.80588 17.7647 7.65638Z"
        fill="black"
        fill-opacity="0.65"
      />
    </svg>
  );
}

