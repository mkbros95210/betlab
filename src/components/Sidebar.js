import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaFootballBall, 
  FaGamepad, 
  FaBaseballBall, 
  FaTableTennis, 
  FaHorseHead, 
  FaDog, 
  FaChess, 
  FaBoxing, 
  FaRunning,
  FaVolleyballBall,
  FaHockeyPuck,
  FaChevronRight,
  FaStar,
  FaCrown
} from 'react-icons/fa';
import { GiCricketBat, GiDart, GiCubes } from 'react-icons/gi';
import { IoFootballOutline } from 'react-icons/io5';

const SidebarContainer = styled(motion.aside)`
  width: 260px;
  background: linear-gradient(180deg, #1a1f2e 0%, #0f1419 100%);
  position: fixed;
  left: 0;
  top: 70px;
  height: calc(100vh - 70px);
  overflow-y: auto;
  z-index: 999;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.open {
      transform: translateX(0);
    }
  }
`;

const CategorySection = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CategoryTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoryItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  color: ${props => props.active ? '#ff7b2d' : '#ffffff'};
  background: ${props => props.active ? 'rgba(255, 123, 45, 0.1)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: ${props => props.active ? '3px solid #ff7b2d' : '3px solid transparent'};

  &:hover {
    background: rgba(255, 123, 45, 0.1);
    color: #ff7b2d;
    border-left: 3px solid #ff7b2d;
  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemIcon = styled.div`
  font-size: 18px;
  color: ${props => props.active ? '#ff7b2d' : '#888'};
  transition: color 0.3s ease;
`;

const ItemText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  background: #ff7b2d;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
`;

const Arrow = styled(FaChevronRight)`
  font-size: 12px;
  color: #666;
  transition: transform 0.3s ease;
  
  ${CategoryItem}:hover & {
    transform: translateX(3px);
    color: #ff7b2d;
  }
`;

const FavoriteButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover, &.favorited {
    color: #ffd700;
  }
`;

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('Cricket');
  const [favorites, setFavorites] = useState(['Cricket', 'Tennis']);

  const sportsCategories = [
    { name: 'Sports', icon: <IoFootballOutline />, isTitle: true },
    { name: 'E-Sports', icon: <FaGamepad />, isTitle: true }
  ];

  const sportsItems = [
    { name: 'Cricket', icon: <GiCricketBat />, count: '98', isLive: true },
    { name: 'Tennis', icon: <FaTableTennis />, count: '30' },
    { name: 'Soccer', icon: <FaFootballBall />, count: '53' },
    { name: 'Horse Racing', icon: <FaHorseHead />, count: '29' },
    { name: 'Greyhound Racing', icon: <FaDog />, count: '5' },
    { name: 'BIGG BOSS', icon: <FaCrown />, count: '5' },
    { name: 'Politics', icon: <FaChess />, count: '1' },
    { name: 'Volleyball', icon: <FaVolleyballBall />, count: '25' },
    { name: 'Baseball', icon: <FaBaseballBall />, count: '1' },
    { name: 'Ice Hockey', icon: <FaHockeyPuck />, count: '5' },
    { name: 'Virtual Cricket', icon: <GiCricketBat />, count: '1' },
    { name: 'Boxing', icon: <FaBoxing />, count: '5' },
    { name: 'Rugby League', icon: <FaRunning />, count: '0' },
    { name: 'Darts', icon: <GiDart />, count: '0' },
    { name: 'Esoccer', icon: <GiCubes />, count: '0' }
  ];

  const toggleFavorite = (itemName) => {
    setFavorites(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <SidebarContainer
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {sportsCategories.map((category, index) => (
        <CategorySection key={category.name}>
          <CategoryTitle>
            <ItemIcon>{category.icon}</ItemIcon>
            {category.name}
          </CategoryTitle>
        </CategorySection>
      ))}
      
      <CategorySection>
        {sportsItems.map((item, index) => (
          <CategoryItem
            key={item.name}
            active={activeCategory === item.name}
            onClick={() => handleCategoryClick(item.name)}
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ItemLeft>
              <ItemIcon active={activeCategory === item.name}>
                {item.icon}
              </ItemIcon>
              <ItemText>{item.name}</ItemText>
            </ItemLeft>
            <ItemRight>
              <FavoriteButton
                className={favorites.includes(item.name) ? 'favorited' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.name);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaStar />
              </FavoriteButton>
              {item.isLive && (
                <Badge>
                  {item.count}
                </Badge>
              )}
              {item.count && !item.isLive && (
                <span style={{ color: '#666', fontSize: '12px' }}>
                  {item.count}
                </span>
              )}
              <Arrow />
            </ItemRight>
          </CategoryItem>
        ))}
      </CategorySection>
    </SidebarContainer>
  );
};

export default Sidebar;