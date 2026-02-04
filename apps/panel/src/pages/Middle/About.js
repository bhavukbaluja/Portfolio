import React, { useContext } from 'react';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import { formatDate, calculateAge } from "@utils/helper/Helper";
import "./Middle.scss";
import { Box } from '@mui/material';
import InfoSquarishTile from "@ui/components/UI/widgets/InfoSquarishTile";
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ReactCurvedText from 'react-curved-text';
import ProfileImage from './ProfileImage';
import ToolsSection from './ToolsSection';

const About = ({isMobile}) => {

  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  return (
    <section id="about" >
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].about}</span>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="50">
        <span style={{color: 'var(--primarytext-color)'}}>
              {properties?.aboutMe1}
        </span>
        <div style={{display: 'flex', flexDirection: isMobile? 'column':'row', width: '100%', gap: '30px', padding: '20px 0px'}}>
          <ProfileImage
            properties={properties}
            isMobile={isMobile}
          />
          <div style={{flex: 0.6, display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '5px'}}>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '5px'}}>
                <div><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].dobShort}:</strong> <span>{formatDate(properties?.user?.dob)}</span></div>
                  {/* <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.example.com</span></li> */}
                  {/* <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+123 456 7890</span></li> */}
                <div><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].freelance}:</strong> <span>{Literal[lang].available}</span></div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '5px'}}>
                  <div><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].age}:</strong> <span>{calculateAge(properties?.user?.dob)}</span></div>
                  {/* <li><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].degree}:</strong> <span>{properties?.user?.education}</span></li> */}
                  {/* <li><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].email}:</strong> <span>{properties?.user?.email}</span></li> */}
                  <div><i className="bi bi-chevron-right"></i> <strong>{Literal[lang].city}:</strong> <span>{properties?.user?.city}</span></div>
              </div>
            </div>
            <div style={{flex: 1}}>
                <div style={{display: 'flex', flexDirection: isMobile? 'column':'row', width: '100%', gap: '15px'}}>             
                  <InfoSquarishTile
                    isMobile={isMobile}
                    title={"education"}
                    icon={SchoolOutlinedIcon}
                    body={["education"]}
                  /> 
                  <InfoSquarishTile
                    isMobile={isMobile}
                    title={"projects"}
                    icon={WorkOutlineOutlinedIcon}
                    body={["projects"]}
                  /> 
                </div>
            </div>

            <InfoSquarishTile
              isMobile={isMobile}
              title={"languages"}
              icon={CodeOutlinedIcon}
              body={["languages"]}
            /> 
            <span style={{color: 'var(--primarytext-color)'}}>
                {properties?.aboutMe2}
            </span>
          </div>
        </div>

        <div>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '5px'}}>
              <ToolsSection isMobile={isMobile}/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;