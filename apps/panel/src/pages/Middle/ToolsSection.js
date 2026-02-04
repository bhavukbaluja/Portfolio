import React, { useContext } from 'react';
import SmallImageTile from "@ui/components/UI/widgets/SmallImageTile";
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';

// --- 1. Import Images ---
import IntellijImg from '@assets/tools/intellij.png';
import VsCodeImg from '@assets/tools/vscode.png';
import EclipseImg from '@assets/tools/eclipse.svg';
import GitImg from '@assets/tools/git.png';
import AWSImg from '@assets/tools/aws.png';
import GithubImg from '@assets/tools/github.png';
import MysqlImg from '@assets/tools/mysql.png';
import MongodbImg from '@assets/tools/mongodb.png';
import DockerImg from '@assets/tools/docker.png';
import JenkinsImg from '@assets/tools/jenkins.png';
import JiraImg from '@assets/tools/jira.png';
import PostmanImg from '@assets/tools/postman.png';

const ToolsSection = ({ isMobile }) => {
  const { lang } = useContext(LanguageContext);

  // --- 2. Define Data Locally ---
  const toolsData = [
    { title: "intellij", imageUrl: IntellijImg },
    { title: "vscode", imageUrl: VsCodeImg },
    { title: "eclipse", imageUrl: EclipseImg },
    { title: "git", imageUrl: GitImg },
    { title: "aws", imageUrl: AWSImg },
    { title: "github", imageUrl: GithubImg },
    { title: "mysql", imageUrl: MysqlImg },
    { title: "mongodb", imageUrl: MongodbImg },
    { title: "docker", imageUrl: DockerImg },
    { title: "jenkins", imageUrl: JenkinsImg },
    { title: "jira", imageUrl: JiraImg },
    { title: "postman", imageUrl: PostmanImg },
  ];

  // --- 3. Render Component ---
  return (
    <div style={{ marginTop: '30px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Section Header */}
      <span className='heading' style={{fontSize: '20px'}}>
        {Literal[lang].toolsTitle}
      </span>
      
      {/* Grid Container */}
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'row', 
          width: '100%', 
          gap: '10px', 
          flexWrap: 'wrap', 
          justifyContent: isMobile ? 'center' : 'space-evenly'
        }}
      >
        {toolsData.map((tool, index) => (
          <SmallImageTile
            key={index}
            isMobile={isMobile}
            title={tool.title}
            imageUrl={tool.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsSection;