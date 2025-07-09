import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const BannerContainer = styled(motion.div)`
  position: relative;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #ff4500 0%, #ff8c00 50%, #ffd700 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  box-shadow: 0 10px 30px rgba(255, 69, 0, 0.3);
  cursor: pointer;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.05) 10px,
      rgba(255, 255, 255, 0.05) 20px
    );
  animation: shimmer 3s infinite linear;
`;

const ContentLeft = styled.div`
  flex: 1;
  z-index: 2;
`;

const DateRange = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  display: inline-block;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  line-height: 1.1;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  background: linear-gradient(45deg, #ffff00, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
  margin-bottom: 20px;
`;

const ComingSoonButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff1744, #ff4569);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 5px 15px rgba(255, 23, 68, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 23, 68, 0.6);
  }
`;

const PlayersContainer = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerCircle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #1e3c72, #2a5298);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  position: absolute;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const TeamBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${props => props.color || '#ff7b2d'};
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

const IPLBanner = () => {
  const players = [
    { name: 'V', team: 'RCB', color: '#ff0000', position: { top: '20%', left: '60%' } },
    { name: 'R', team: 'MI', color: '#004ba0', position: { top: '20%', right: '20%' } },
    { name: 'M', team: 'CSK', color: '#ffff00', position: { top: '50%', right: '10%' } },
    { name: 'D', team: 'DC', color: '#17479e', position: { bottom: '20%', right: '25%' } },
    { name: 'K', team: 'KKR', color: '#3a225d', position: { bottom: '20%', left: '65%' } },
    { name: 'S', team: 'SRH', color: '#ff822a', position: { top: '40%', left: '75%' } },
    { name: 'H', team: 'PBKS', color: '#dd1f2d', position: { bottom: '35%', right: '40%' } },
    { name: 'J', team: 'RR', color: '#254aa5', position: { top: '60%', left: '55%' } },
  ];

  return (
    <BannerContainer
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundPattern />
      
      <ContentLeft>
        <DateRange
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          MAR 22 - MAY 25
        </DateRange>
        
        <MainTitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          INDIAN PREMIER
        </MainTitle>
        
        <Subtitle
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          LEAGUE 2025
        </Subtitle>
        
        <ComingSoonButton
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlay />
          COMING SOON!
        </ComingSoonButton>
      </ContentLeft>

      <PlayersContainer>
        {players.map((player, index) => (
          <PlayerCircle
            key={player.name}
            style={player.position}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            {player.name}
            <TeamBadge color={player.color}>
              {player.team[0]}
            </TeamBadge>
          </PlayerCircle>
        ))}
      </PlayersContainer>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </BannerContainer>
  );
};

export default IPLBanner;