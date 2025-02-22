import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Home from './components/Home';
import { theme } from './styles/theme';

// 导航栏组件
const Navbar = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(${theme.blur.lg});
  border-bottom: 1px solid ${theme.colors.glass.border};
  z-index: 1000;
  
  a {
    color: ${theme.colors.text.primary};
  }
`;

// 导航链接
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  
  a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: #000;
      transition: width 0.3s ease;
    }
    
    &:hover:after {
      width: 100%;
    }
  }
`;

// 主要内容区域
const MainContent = styled(motion.main)`
  padding-top: 100px;
  min-height: 100vh;
  background: transparent;
`;

// 页面切换动画配置
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

function App() {
  const location = useLocation();
  
  // 导航项配置
  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/art', label: 'Art Gallery' },
    { id: '/dev', label: 'Development' },
    { id: '/academic', label: 'Academic' },
    { id: '/life', label: 'Life & Blog' },
    { id: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <Navbar
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <NavLinks>
          {navItems.map(item => (
            <motion.div key={item.id}>
              <Link to={item.id}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </NavLinks>
      </Navbar>

      <MainContent>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/art" element={<div>Gallery - Coming Soon</div>} />
            <Route path="/dev" element={<div>Development - Coming Soon</div>} />
            <Route path="/academic" element={<div>Academic - Coming Soon</div>} />
            <Route path="/life" element={<div>Blogs - Coming Soon</div>} />
            <Route path="/contact" element={<div>Contact - Coming Soon</div>} />
          </Routes>
        </AnimatePresence>
      </MainContent>
    </>
  );
}

export default App; 