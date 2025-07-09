import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GiCricketBat } from 'react-icons/gi';
import { FaPlay, FaClock, FaFire } from 'react-icons/fa';

const InPlayContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff7b2d, #ffa500);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LiveBadge = styled.span`
  background: #ff3333;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const MatchCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff7b2d;
    background: rgba(255, 123, 45, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 123, 45, 0.2);
  }
`;

const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MatchTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const MatchTime = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InPlayLabel = styled.div`
  background: linear-gradient(135deg, #ff7b2d, #ffa500);
  color: white;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TeamsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const TeamInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const TeamName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const TeamFlag = styled.div`
  width: 30px;
  height: 20px;
  background: ${props => props.color || 'linear-gradient(45deg, #667eea, #764ba2)'};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const VsText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ff7b2d;
`;

const OddsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
`;

const OddsCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 123, 45, 0.2);
    border-color: #ff7b2d;
    transform: translateY(-2px);
  }
`;

const OddsValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3px;
`;

const OddsLabel = styled.div`
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
`;

const PulsingDot = styled.div`
  width: 8px;
  height: 8px;
  background: #ff3333;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

const InPlaySection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const matches = [
    {
      id: 1,
      title: 'MUS Akademik Ravens vs CC Yullsi MU Trakia',
      league: 'ECS Bulgaria',
      team1: { name: 'MUS AKD', flag: '#ff4444', code: 'MUS' },
      team2: { name: 'CC YUL', flag: '#4444ff', code: 'CCY' },
      odds: {
        home: '1.13',
        draw: '1.23',
        away: '5.4',
        over: '8.69'
      },
      isInPlay: true,
      time: 'Live'
    }
  ];

  return (
    <InPlayContainer>
      <SectionHeader>
        <SectionIcon>
          <GiCricketBat />
        </SectionIcon>
        <SectionTitle>
          <FaFire />
          Cricket
          <LiveBadge>
            <PulsingDot />
            (10)
          </LiveBadge>
        </SectionTitle>
      </SectionHeader>

      {matches.map((match, index) => (
        <MatchCard
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <MatchHeader>
            <MatchInfo>
              <MatchTitle>{match.title}</MatchTitle>
              <MatchTime>
                <FaClock />
                {match.league}
              </MatchTime>
            </MatchInfo>
            {match.isInPlay && (
              <InPlayLabel>
                <FaPlay style={{ fontSize: '10px' }} />
                IN-PLAY
              </InPlayLabel>
            )}
          </MatchHeader>

          <TeamsContainer>
            <TeamInfo>
              <TeamFlag color={match.team1.flag}>
                {match.team1.code}
              </TeamFlag>
              <TeamName>{match.team1.name}</TeamName>
            </TeamInfo>
            <VsText>VS</VsText>
            <TeamInfo>
              <TeamFlag color={match.team2.flag}>
                {match.team2.code}
              </TeamFlag>
              <TeamName>{match.team2.name}</TeamName>
            </TeamInfo>
          </TeamsContainer>

          <OddsContainer>
            <OddsCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OddsValue>{match.odds.home}</OddsValue>
              <OddsLabel>1</OddsLabel>
            </OddsCard>
            <OddsCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OddsValue>{match.odds.draw}</OddsValue>
              <OddsLabel>X</OddsLabel>
            </OddsCard>
            <OddsCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OddsValue>-</OddsValue>
              <OddsLabel>2</OddsLabel>
            </OddsCard>
            <OddsCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OddsValue>{match.odds.away}</OddsValue>
              <OddsLabel>Home</OddsLabel>
            </OddsCard>
            <OddsCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <OddsValue>{match.odds.over}</OddsValue>
              <OddsLabel>Away</OddsLabel>
            </OddsCard>
          </OddsContainer>
        </MatchCard>
      ))}
    </InPlayContainer>
  );
};

export default InPlaySection;