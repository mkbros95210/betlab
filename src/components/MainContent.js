import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import IPLBanner from './IPLBanner';
import TrendingGames from './TrendingGames';
import BettingSection from './BettingSection';
import InPlaySection from './InPlaySection';

const MainContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 14, 26, 0.9) 0%, rgba(26, 31, 46, 0.8) 100%);
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MainContent = () => {
  return (
    <MainContainer>
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <IPLBanner />
        <TrendingGames />
        <BettingSection />
        <InPlaySection />
      </ContentWrapper>
    </MainContainer>
  );
};

export default MainContent;