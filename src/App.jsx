import { BrowserRouter } from 'react-router-dom';
import {
  Navbar,
  Hero,
  About,
  Tech,
  Experience,
  Works,
  Stats,
  Contact,
  StarsCanvas,
} from './components';

const Footer = () => (
  <footer className="bg-primary border-t border-[#232631] py-8 px-6 text-center">
    <div className="flex items-center justify-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#915EFF] to-[#2DD4BF] flex items-center justify-center">
        <span className="font-black text-white text-xs font-mono">TS</span>
      </div>
      <span className="text-secondary text-sm">
        Built with React, three.js and Tailwind. &copy; {new Date().getFullYear()} Tatta I Sreeram.
      </span>
    </div>
  </footer>
);

const App = () => (
  <BrowserRouter>
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <About />
      <Experience />
      <Tech />
      <Works />
      <Stats />

      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>

      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
