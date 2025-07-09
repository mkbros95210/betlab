import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #0f1419 100%);
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  margin-left: 260px;
  background: rgba(10, 14, 26, 0.8);
  min-height: calc(100vh - 70px);
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainLayout>
        <Sidebar />
        <ContentArea>
          <MainContent />
        </ContentArea>
      </MainLayout>
    </AppContainer>
  );
}

export default App;