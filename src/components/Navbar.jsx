import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { navLinks } from '../constants';
import { styles } from '../styles';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? 'bg-primary border-b border-[#232631]' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(''); window.scrollTo(0, 0); }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#915EFF] to-[#2DD4BF] flex items-center justify-center">
            <span className="font-black text-white text-sm font-mono">TS</span>
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Sreeram&nbsp;
            <span className="hidden sm:block text-secondary font-normal">| Full-Stack &amp; Backend Engineer</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li className="flex items-center gap-3">
            <a
              href="https://github.com/tattaisreeram"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-secondary hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/tatta-i-sreeram-794385257/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-secondary hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="border border-[#915EFF] text-[#915EFF] hover:bg-[#915EFF] hover:text-white px-4 py-1.5 rounded text-sm font-medium transition-all"
            >
              Resume
              {/* TODO: Add your actual resume PDF to /public/resume.pdf */}
            </a>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-white"
            aria-label="Toggle menu"
          >
            {toggle ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 bg-[#1d1836] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => { setActive(nav.title); setToggle(false); }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
