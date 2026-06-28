import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Github, ExternalLink } from 'lucide-react';
import { styles } from '../styles';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import SectionWrapper from '../hoc/SectionWrapper';

const ProjectCard = ({ index, name, description, tags, source_code_link, live_link, accent }) => (
  <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
    <Tilt
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
    >
      <div
        className="relative w-full h-[230px] rounded-2xl flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}22 0%, #151030 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/20 rounded-full"
              style={{
                width: `${(i + 1) * 60}px`,
                height: `${(i + 1) * 60}px`,
              }}
            />
          ))}
        </div>
        <p
          className="text-white font-black text-[28px] text-center px-4 z-10"
          style={{ textShadow: `0 0 20px ${accent}` }}
        >
          {name}
        </p>
        {/* TODO: Replace the gradient above with a real screenshot:
            <img src={`/project-${name.toLowerCase().replace(/\s/g,'-')}.png`} className="w-full h-full object-cover" /> */}

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
          {live_link && (
            <div
              onClick={() => window.open(live_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <ExternalLink size={16} className="text-white" />
            </div>
          )}
          <div
            onClick={() => window.open(source_code_link, '_blank')}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <Github size={16} className="text-white" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-5">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>My projects</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </motion.div>

    <div className="w-full flex">
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Real projects that reflect how I think about systems. Each one is backed by a GitHub
        repository with the full source.
      </motion.p>
    </div>

    <div className="mt-20 flex flex-wrap gap-7">
      {projects.map((project, i) => (
        <ProjectCard key={project.name} index={i} {...project} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, 'work');
