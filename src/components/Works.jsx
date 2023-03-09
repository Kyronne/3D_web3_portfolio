import Tilt from 'react-tilt';
import { motion } from 'framer-motion'
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div 
    variants={fadeIn("up", "spring", 
    index * 0.5, 0.75) }> test

    </motion.div>
  )
}

const Works = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>
      <div className='w-full flex'>
        <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        > Each project showcases my ability to produce 
        high quality web pages and web apps through 
        real world examples. Working with 
        different technologies to create 
        intuitive, responsive applications 
        that are useful to users.

        </motion.p>
      </div>
      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => ( 
        <ProjectCard 
        key={`project-${index}`}
        index={index}
        {...project} />
        ))}
      </div>
      </>
  )
}

export default SectionWrapper(Works, "")