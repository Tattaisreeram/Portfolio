import { motion } from 'framer-motion';
import { styles } from '../styles';
import SystemCoreCanvas from './canvas/SystemCore';

const Hero = () => (
  <section className="relative w-full h-screen mx-auto">
    <div
      className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
    >
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
        <div className="w-1 sm:h-80 h-40 violet-gradient" />
      </div>

      <div>
        <h1 className={`${styles.heroHeadText} text-white`}>
          Hi, I'm{' '}
          <span className="text-[#915EFF]">Sreeram</span>
        </h1>
        <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          Full-stack engineer with a backend focus. I build{' '}
          <br className="sm:block hidden" />
          event-driven systems with Spring Boot, Kafka, gRPC and React.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#work"
            className="bg-[#915EFF] hover:bg-[#7b4fd6] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="border border-[#915EFF] text-[#915EFF] hover:bg-[#915EFF] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>

    <SystemCoreCanvas />

    <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
      <a href="#about">
        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
          />
        </div>
      </a>
    </div>
  </section>
);

export default Hero;
