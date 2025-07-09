import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GiCricketBat } from 'react-icons/gi';
import { FaTableTennis, FaFootballBall, FaHorseHead, FaDog, FaRunning, FaCrown } from 'react-icons/fa';

const BettingContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const BettingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const BettingCard = styled(motion.div)`
  background: ${props => props.active ? 'linear-gradient(135deg, #ff7b2d, #ffa500)' : 'rgba(255, 255, 255, 0.08)'};
  border: 2px solid ${props => props.active ? '#ff7b2d' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #ff7b2d;
    background: ${props => props.active ? 'linear-gradient(135deg, #ff7b2d, #ffa500)' : 'rgba(255, 123, 45, 0.1)'};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 123, 45, 0.3);
  }
`;

const CardIcon = styled.div`
  font-size: 24px;
  color: ${props => props.active ? '#ffffff' : '#ff7b2d'};
  margin-bottom: 10px;
  transition: color 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.active ? '#ffffff' : '#ffffff'};
  margin: 0 0 5px 0;
  transition: color 0.3s ease;
`;

const CardNumber = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.active ? '#ffffff' : '#ff7b2d'};
  margin-bottom: 3px;
  transition: color 0.3s ease;
`;

const CardBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : '#ff7b2d'};
  color: ${props => props.active ? '#ffffff' : '#ffffff'};
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
`;

const LiveIndicator = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 5px;
`;

const Tab = styled(motion.button)`
  flex: 1;
  background: ${props => props.active ? 'linear-gradient(135deg, #ff7b2d, #ffa500)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#ffffff' : '#cccccc'};
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #ff7b2d, #ffa500)' : 'rgba(255, 123, 45, 0.1)'};
    color: #ffffff;
  }
`;

const BettingSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCard, setActiveCard] = useState('In-play');

  const tabs = ['1', 'X', '2'];
  
  const bettingCategories = [
    {
      id: 'inplay',
      title: 'In-play',
      number: '98',
      icon: <GiCricketBat />,
      badge: '17',
      isLive: true,
      color: '#ff7b2d'
    },
    {
      id: 'cricket',
      title: 'Cricket',
      number: '30',
      icon: <GiCricketBat />,
      badge: '10',
      color: '#4caf50'
    },
    {
      id: 'tennis',
      title: 'Tennis',
      number: '53',
      icon: <FaTableTennis />,
      badge: '0',
      color: '#2196f3'
    },
    {
      id: 'kabaddi',
      title: 'Kabaddi',
      number: '1',
      icon: <FaRunning />,
      badge: '0',
      color: '#9c27b0'
    },
    {
      id: 'soccer',
      title: 'Soccer',
      number: '29',
      icon: <FaFootballBall />,
      badge: '25',
      color: '#ff5722'
    },
    {
      id: 'horseracing',
      title: 'Horse Racing',
      number: '5',
      icon: <FaHorseHead />,
      badge: '5',
      color: '#795548'
    },
    {
      id: 'greyhound',
      title: 'Greyhound Racing',
      number: '5',
      icon: <FaDog />,
      badge: '5',
      color: '#607d8b'
    },
    {
      id: 'biggboss',
      title: 'BIGG BOSS',
      number: '5',
      icon: <FaCrown />,
      badge: '0',
      color: '#ffc107'
    }
  ];

  return (
    <BettingContainer>
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>

      <BettingGrid>
        {bettingCategories.map((category, index) => (
          <BettingCard
            key={category.id}
            active={activeCard === category.title}
            onClick={() => setActiveCard(category.title)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.isLive && <LiveIndicator />}
            <CardBadge active={activeCard === category.title}>
              {category.badge}
            </CardBadge>
            <CardIcon active={activeCard === category.title}>
              {category.icon}
            </CardIcon>
            <CardTitle active={activeCard === category.title}>
              {category.title}
            </CardTitle>
            <CardNumber active={activeCard === category.title}>
              {category.number}
            </CardNumber>
          </BettingCard>
        ))}
      </BettingGrid>
    </BettingContainer>
  );
};

export default BettingSection;