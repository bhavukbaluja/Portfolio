import React, { useContext } from 'react';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import { Box } from '@mui/material';

const Resume = ({isMobile}) => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const resumeData = properties?.resume || {};

  return (
    <section id="resume" className="resume section">
      {/* Section Title */}
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].resume}</span>
        <p>{Literal[lang].resumeDesc}</p>
      </div>

      <div className="container">
        <div style={{display: 'flex', flexDirection: isMobile? 'column': 'row', gap: '20px'}}>
          
          {/* Left Column */}
          {/* <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100"> */}
            
            {/* Summary */}
            {/* <h3 className="resume-title">{Literal[lang].summary}</h3>
            {resumeData?.summary && (
                <div className="resume-item pb-0">
                <h4>{properties?.user?.firstName} {properties?.user?.lastName}</h4>
                <p><em>{resumeData.summary.description}</em></p>
                <ul>
                    <li>{properties?.user?.address}</li>
                    <li>{properties?.user?.mobile}</li>
                    <li>{properties?.user?.email}</li>
                </ul>
                </div>
            )} */}
            <Box data-aos="fade-up" data-aos-delay="100" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 2, padding: '20px', borderRadius: '10px', border: '1px solid var(--color-gray-300)', boxShadow: '0 5px 20px var(--color-gray-400)'}}>

              {/* Education */}
              <h3 className="resume-title">{Literal[lang].education}</h3>
              {resumeData?.education?.map((edu, index) => (
                  <div className="resume-item" key={index}>
                      <h5>{edu.degree}</h5>
                      <h6 style={{color: 'var(--secondarytext-color)'}}>{edu.years}</h6>
                      <p><em>{edu.institution}</em></p>
                      {/* ✅ Updated to handle Array of bullet points */}
                      <ul>
                        {Array.isArray(edu.description) ? (
                          edu.description.map((point, i) => (
                            <li key={i} style={{color: 'var(--secondarytext-color)', fontSize: '15px'}}>{point}</li>
                          ))
                        ) : (
                          <li style={{color: 'var(--secondarytext-color)', fontSize: '15px'}}>{edu.description}</li>
                        )}
                      </ul>
                  </div>
              ))}
            </Box>
          {/* </div> */}
          {/* Right Column */}
          {/* <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200"> */}
            <Box data-aos="fade-up" data-aos-delay="200" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 2, padding: '20px', borderRadius: '10px', border: '1px solid var(--color-gray-300)', boxShadow: '0 5px 20px var(--color-gray-400)'}}>
              <h3 className="resume-title">{Literal[lang].professionalExperience}</h3>
              
              {/* Experience */}
              {resumeData?.experience?.map((exp, index) => (
                  <div className="resume-item" key={index}>
                      <h5>{exp.title}</h5>
                      <h6 style={{color: 'var(--secondarytext-color)'}}>{exp.years}</h6>
                      <p><em>{exp.company}</em></p>
                      <ul>
                          {exp.tasks?.map((task, i) => (
                              <li key={i} style={{color: 'var(--secondarytext-color)', fontSize: '15px'}}>{task}</li>
                          ))}
                      </ul>
                  </div>
              ))}
            </Box>
          {/* </div> */}

        </div>
      </div>
    </section>
  );
};

export default Resume;