import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const Tech = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>What I work with</p>
      <h2 className={styles.sectionHeadText}>Skills.</h2>
    </motion.div>

    <div className="flex flex-row flex-wrap justify-center gap-10 mt-16">
      {technologies.map((tech) => (
        <div key={tech.name} className="w-28 h-28 flex flex-col items-center gap-2">
          <BallCanvas label={tech.label} accent={tech.accent} imgUrl={tech.icon} />
          <p className="text-secondary text-xs text-center font-mono">{tech.name}</p>
        </div>
      ))}
    </div>
  </>
);

export default SectionWrapper(Tech, 'tech');
