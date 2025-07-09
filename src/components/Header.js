import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #1a1f2e 0%, #2d3748 100%);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;

const LogoText = styled.span`
  background: linear-gradient(45deg, #ff7b2d, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: 10px;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 123, 45, 0.3);
  border-radius: 20px;
  padding: 0 50px 0 20px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff7b2d;
    box-shadow: 0 0 10px rgba(255, 123, 45, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff7b2d;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffa500;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.a)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(45deg, #ff7b2d, #ffa500);
    color: #ffffff;
  }

  &.active {
    background: linear-gradient(45deg, #ff7b2d, #ffa500);
    color: #ffffff;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 123, 45, 0.2);
    color: #ff7b2d;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff3333;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const [activeNav, setActiveNav] = useState('Sports');
  
  const navItems = ['Sports', 'Casino', 'Promotion', 'E-Sports', 'Sportsbook', 'Jetx'];

  return (
    <HeaderContainer>
      <Logo
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: '30px',
            height: '30px',
            background: 'linear-gradient(45deg, #ff7b2d, #ffa500)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          I
        </motion.div>
        <LogoText>BE<span style={{color: '#ffffff'}}>X</span>WIN</LogoText>
      </Logo>

      <SearchContainer>
        <SearchInput placeholder="Events, Markets, and more" />
        <SearchIcon />
      </SearchContainer>

      <Navigation>
        {navItems.map((item) => (
          <NavItem
            key={item}
            className={activeNav === item ? 'active' : ''}
            onClick={() => setActiveNav(item)}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {item}
          </NavItem>
        ))}
      </Navigation>

      <UserActions>
        <IconButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        <IconButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaUser />
        </IconButton>
      </UserActions>
    </HeaderContainer>
  );
};

export default Header;