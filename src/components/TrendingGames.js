import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

const TrendingContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const CarouselControls = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 123, 45, 0.2);
  border: 1px solid rgba(255, 123, 45, 0.3);
  color: #ff7b2d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 123, 45, 0.3);
    border-color: #ff7b2d;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
`;

const GameCard = styled(motion.div)`
  min-width: 200px;
  height: 120px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(135deg, ${props => props.gradient || '#1a1f2e, #2d3748'});
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff7b2d;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 123, 45, 0.3);
  }
`;

const GameContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 15px;
  color: white;
`;

const GameTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const GameSubtitle = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 123, 45, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${GameCard}:hover & {
    opacity: 1;
  }
`;

const GameIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  backdrop-filter: blur(10px);
`;

const TrendingGames = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const games = [
    {
      id: 1,
      title: 'Dragon Tiger',
      subtitle: 'Card Game',
      gradient: '#ff6b35, #f7931e',
      icon: '🐅'
    },
    {
      id: 2,
      title: 'Andar Bahar',
      subtitle: 'Classic Game',
      gradient: '#667eea, #764ba2',
      icon: '🃏'
    },
    {
      id: 3,
      title: 'Teen Patti',
      subtitle: 'Poker Game',
      gradient: '#f093fb, #f5576c',
      icon: '♠️'
    },
    {
      id: 4,
      title: 'Colour Game',
      subtitle: 'Prediction',
      gradient: '#4facfe, #00f2fe',
      icon: '🎨'
    },
    {
      id: 5,
      title: 'Roulette',
      subtitle: 'Wheel Game',
      gradient: '#43e97b, #38f9d7',
      icon: '🎰'
    },
    {
      id: 6,
      title: 'Blackjack',
      subtitle: 'Card Game',
      gradient: '#fa709a, #fee140',
      icon: '🂡'
    }
  ];

  const itemsPerView = 5;
  const maxIndex = Math.max(0, games.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <TrendingContainer>
      <SectionHeader>
        <SectionTitle>Trending Games</SectionTitle>
        <CarouselControls>
          <ControlButton
            onClick={prevSlide}
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft />
          </ControlButton>
          <ControlButton
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight />
          </ControlButton>
        </CarouselControls>
      </SectionHeader>

      <CarouselContainer>
        <CarouselTrack
          animate={{ x: -currentIndex * 220 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              gradient={game.gradient}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <GameIcon>{game.icon}</GameIcon>
              <PlayButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlay style={{ marginLeft: '2px' }} />
              </PlayButton>
              <GameContent>
                <GameTitle>{game.title}</GameTitle>
                <GameSubtitle>{game.subtitle}</GameSubtitle>
              </GameContent>
            </GameCard>
          ))}
        </CarouselTrack>
      </CarouselContainer>
    </TrendingContainer>
  );
};

export default TrendingGames;