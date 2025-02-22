import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

// 动态背景
const DynamicBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.background};
  z-index: -1;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 1500px;
    height: 1500px;
    border-radius: 50%;
    filter: blur(${theme.blur.xl});
    opacity: 0.15;
    animation: float 30s ease-in-out infinite;
  }
  
  &::before {
    top: -600px;
    left: -600px;
    background: ${theme.colors.gradient.glow};
    animation-delay: -10s;
  }
  
  &::after {
    bottom: -600px;
    right: -600px;
    background: ${theme.colors.gradient.accent};
    animation-delay: -20s;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
    25% { transform: translate(100px, 100px) rotate(5deg) scale(1.1); }
    50% { transform: translate(0, 200px) rotate(-5deg) scale(1); }
    75% { transform: translate(-100px, 100px) rotate(3deg) scale(1.2); }
  }
`;

// 光效网格
const GridPattern = styled.div`
  position: fixed;
  inset: 0;
  background-image: linear-gradient(
    to right,
    ${theme.colors.glass.border} 1px,
    transparent 1px
  ),
  linear-gradient(
    to bottom,
    ${theme.colors.glass.border} 1px,
    transparent 1px
  );
  background-size: 80px 80px;
  mask-image: radial-gradient(circle at center, transparent 0%, black 100%);
  opacity: 0.08;
  animation: pulseGrid 10s ease-in-out infinite;
  
  @keyframes pulseGrid {
    0%, 100% { opacity: 0.08; }
    50% { opacity: 0.12; }
  }
`;

// 主容器
const Container = styled.div`
  min-height: 100vh;
  color: ${theme.colors.text.primary};
  overflow: hidden;
  position: relative;
`;

// 英雄区域
const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

// 内容网格
const ContentGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  z-index: 1;
  padding: 0 2rem;
`;

// 主要内容区域
const MainContent = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin-bottom: 4rem;
`;

// 技能区域
const SkillsSection = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1000px;
`;

// 技能标签
const SkillTag = styled(motion.span)`
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  color: ${theme.colors.text.primary};
  backdrop-filter: blur(${theme.blur.sm});
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.glass.hover};
    border-color: ${theme.colors.glass.highlight};
    transform: translateY(-2px);
  }
`;

// 渐变文本
const GradientText = styled(motion.span)`
  background: ${theme.colors.gradient.text};
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  letter-spacing: -0.02em;
  display: inline-block;
`;

// 动态按钮
const AnimatedButton = styled(motion.button)`
  background: ${theme.colors.glass.background};
  color: ${theme.colors.text.primary};
  border: 1px solid ${theme.colors.glass.border};
  padding: 1.2rem 2.4rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all ${theme.duration.normal} ${theme.animation.smooth};
  backdrop-filter: blur(${theme.blur.sm});
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${theme.colors.gradient.shine};
    opacity: 0;
    transition: all 0.5s ease;
    transform: translateX(-100%);
  }
  
  &:hover {
    background: ${theme.colors.glass.hover};
    border-color: ${theme.colors.glass.highlight};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
      transform: translateX(100%);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // 鼠标跟随效果
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [10, -10]), {
    stiffness: 100,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-10, 10]), {
    stiffness: 100,
    damping: 30
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const skills = [
    "Creative Design", "Web Development", "Academic Research",
    "Photography", "UI/UX", "Writing", "Problem Solving"
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Container>
      <DynamicBackground />
      <GridPattern />
      <HeroSection
        style={{ opacity, scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <ContentGrid
          style={{ rotateX, rotateY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MainContent>
            <motion.h1
              variants={titleVariants}
              style={{
                fontSize: "4rem",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
                color: theme.colors.text.primary,
                fontWeight: "700",
              }}
            >
              Hello, I'm{" "}
              <GradientText
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1,
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5
                }}
              >
                ZKBKB
              </GradientText>
            </motion.h1>
            <motion.p
              variants={titleVariants}
              style={{
                fontSize: "1.5rem",
                color: theme.colors.text.secondary,
                marginBottom: "3rem",
                lineHeight: 1.6,
              }}
            >
              Exploring the intersection of technology, art, and academic research
            </motion.p>
            <AnimatedButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Explore My Work
            </AnimatedButton>
          </MainContent>

          <SkillsSection
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {skills.map((skill, index) => (
                <SkillTag
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [-1, 1, -1, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {skill}
                </SkillTag>
              ))}
            </AnimatePresence>
          </SkillsSection>
        </ContentGrid>
      </HeroSection>
    </Container>
  );
}

export default Home; 