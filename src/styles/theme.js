export const theme = {
  colors: {
    background: '#030303',
    surface: '#0a0a0a',
    primary: '#00d8ff',
    secondary: '#ff87b2',
    accent: '#ff9346',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    },
    glass: {
      background: 'rgba(10, 10, 10, 0.5)',
      border: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(20, 20, 20, 0.7)',
      highlight: 'rgba(255, 255, 255, 0.2)'
    },
    gradient: {
      text: 'linear-gradient(135deg, #00d8ff 0%, #ff87b2 100%)',
      card: 'linear-gradient(135deg, rgba(10, 10, 10, 0.8) 0%, rgba(15, 15, 15, 0.6) 100%)',
      glow: 'linear-gradient(135deg, #00d8ff 0%, #ff87b2 100%)',
      accent: 'linear-gradient(135deg, #ff9346 0%, #ff87b2 100%)',
      shine: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)'
    }
  },
  blur: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px'
  },
  shadows: {
    glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(0, 216, 255, 0.2)'
  },
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s'
  },
  animation: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
  }
}; 