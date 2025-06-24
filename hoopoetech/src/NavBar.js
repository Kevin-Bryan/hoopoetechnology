import React from "react";
import { Link } from "react-scroll";
import { useState } from "react";

export default function NavBar(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="text-white">
      <ul className="flex gap-x-7 p-4 font-thin text-[20px]">
        <li>
          <Link
            className="hover:text-gray-500"
            to="home"
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-gray-500"
            to="features"
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleClick}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-gray-500"
            to="why-us"
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleClick}
          >
            Why-us?
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-gray-500"
            to="testimonials"
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleClick}
          >
            Testimonials
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-gray-500"
            to="contact"
            smooth={true}
            offset={50}
            duration={500}
            onClick={handleClick}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
