import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { styles } from '../styles';
import { stats } from '../constants';
import { textVariant, fadeIn } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';
import GlobeCanvas from './canvas/Globe';

const StatCard = ({ platform, value, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="bg-tertiary rounded-2xl p-6 flex flex-col items-center gap-3 min-w-[160px] shadow-card border border-[#915EFF]/20"
    >
      <p className="text-secondary text-sm uppercase tracking-wider text-center">{platform}</p>
      <p
        className="font-mono font-black text-white text-center"
        style={{ fontSize: value.length > 6 ? '28px' : '36px' }}
      >
        {isInView ? value : '...'}
      </p>
    </motion.div>
  );
};

const Stats = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Competitive Programming</p>
      <h2 className={styles.sectionHeadText}>By the numbers.</h2>
    </motion.div>

    <div className="mt-16 flex flex-col lg:flex-row gap-10 items-center">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-wrap gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.platform} index={i} {...stat} />
          ))}
        </div>
        <motion.p
          variants={fadeIn('', '', 0.5, 1)}
          className="text-secondary text-[17px] leading-[30px] max-w-lg mt-4"
        >
          Problem solving from competitive programming is the backbone of how I reason about systems.
          Consistent practice across Codeforces, CodeChef and LeetCode sharpens both algorithm
          design and the mental discipline needed for hard backend correctness problems.
        </motion.p>
      </div>

      <motion.div
        variants={fadeIn('left', 'spring', 0.5, 0.75)}
        className="w-full lg:w-[380px] h-[380px] flex-shrink-0"
      >
        <GlobeCanvas />
      </motion.div>
    </div>
  </>
);

export default SectionWrapper(Stats, 'stats');
