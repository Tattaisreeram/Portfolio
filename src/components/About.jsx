import { motion } from 'framer-motion';
import { Server, Network, Workflow, Trophy } from 'lucide-react';
import { Tilt } from 'react-tilt';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const iconMap = { Server, Network, Workflow, Trophy };

const ServiceCard = ({ index, title, icon }) => {
  const Icon = iconMap[icon] || Server;
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <div className="w-16 h-16 rounded-full bg-[#915EFF]/20 flex items-center justify-center">
            <Icon size={32} className="text-[#915EFF]" />
          </div>
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
      </motion.div>
    </Tilt>
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
      intern at Hugohub shipping production backend microservices. I enjoy event-driven design and
      the hard correctness problems in distributed systems (consistency, resilience, observability),
      with a competitive programming foundation of 500+ problems across Codeforces, CodeChef and
      LeetCode that sharpens how I reason about systems under constraint.
    </motion.p>

    <div className="mt-20 flex flex-wrap gap-10">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, 'about');
