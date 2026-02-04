import React, { useContext } from 'react';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";

const Skills = () => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const skills = properties?.skills || [];
  
  // Split skills into two columns roughly equal
  const midPoint = Math.ceil(skills.length / 2);
  const leftSkills = skills.slice(0, midPoint);
  const rightSkills = skills.slice(midPoint);

  return (
    <section id="skills" className="skills section light-background">
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].skills}</span>
        <p>{Literal[lang].skillsDesc}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          <div className="col-lg-6">
            {leftSkills.map((skill, index) => (
                <SkillItem key={index} name={skill.name} val={skill.val} />
            ))}
          </div>
          <div className="col-lg-6">
            {rightSkills.map((skill, index) => (
                <SkillItem key={index} name={skill.name} val={skill.val} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for Skills
const SkillItem = ({ name, val }) => (
  <div className="progress">
    <span className="skill"><span>{name}</span> <i className="val">{val}</i></span>
    <div className="progress-bar-wrap">
      <div className="progress-bar" role="progressbar" style={{ width: val }} aria-valuenow={parseInt(val)} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
);

export default Skills;