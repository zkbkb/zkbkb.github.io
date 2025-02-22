import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  /* 重置默认样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 设置基础字体和颜色 */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 响应式字体大小 */
  html {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  /* 链接样式 */
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ${theme.animation.smooth};
  }

  /* 图片样式 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.glass.border};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary};
  }

  /* 文本选择样式 */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.text.primary};
  }

  /* 动画过渡 */
  * {
    transition: background-color 0.3s ${theme.animation.smooth},
                color 0.3s ${theme.animation.smooth},
                border-color 0.3s ${theme.animation.smooth},
                transform 0.3s ${theme.animation.smooth};
  }

  /* 容器类 */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  /* 响应式布局类 */
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  /* 间距类 */
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-8 { margin-top: 2rem; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-8 { margin-bottom: 2rem; }

  /* 动画类 */
  .hover-scale {
    transition: transform 0.3s ${theme.animation.spring};
    &:hover {
      transform: scale(1.05);
    }
  }

  .hover-glow {
    transition: box-shadow 0.3s ${theme.animation.smooth};
    &:hover {
      box-shadow: ${theme.shadows.glow};
    }
  }
`;

export default GlobalStyles; 