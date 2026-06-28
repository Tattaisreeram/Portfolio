import { motion } from 'framer-motion';
import { Server, Network, Workflow, Trophy, Globe } from 'lucide-react';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const iconMap = { Server, Network, Workflow, Trophy, Globe };

const ServiceCard = ({ index, title, icon }) => {
  const Icon = iconMap[icon] || Server;
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.15, 0.6)}
      className="w-full"
    >
      <div className="w-full rounded-2xl overflow-hidden relative group cursor-default"
        style={{ background: 'linear-gradient(90deg, #00cea8 0%, #bf61ff 100%)' }}
      >
        <div className="flex flex-col items-center justify-center py-10 px-8 gap-6 min-h-[200px]">
          <Icon
            size={36}
            className="text-white/70 group-hover:text-white transition-colors duration-300"
          />
          <h3 className="text-white font-bold text-[20px] text-center tracking-wide">
            {title}
          </h3>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
    </motion.div>
  );
};

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn('', '', 0.1, 1)}
      className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      Final year IT student at IIIT Lucknow (CGPA 8.0, graduating June 2026), currently an SDE
      intern at Hugohub shipping production backend microservices. I build full-stack systems with
      a backend-first mindset, working across web frontends (React, TypeScript) and distributed
      backends (Spring Boot, Kafka, gRPC). I enjoy event-driven design and the hard correctness
      problems in distributed systems (consistency, resilience, observability), backed by a
      competitive programming foundation of 500+ problems.
    </motion.p>

    <div className="mt-16 flex flex-col gap-6 max-w-3xl">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, 'about');
