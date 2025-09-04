import React from 'react';
import AboutHero from '../../components/About/AboutHero';
import StoryTimeline from '../../components/About/StoryTimeline';
import MissionVision from '../../components/About/MissionVision';
import TeamSection from '../../components/About/TeamSection';

const AboutPage = () => {
      return (
            <div>
         <AboutHero />  
         <StoryTimeline/>
         <MissionVision/>
         <TeamSection/>
            </div>
      );
};

export default AboutPage;