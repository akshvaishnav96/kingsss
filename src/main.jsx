import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { MotionConfig } from 'motion/react'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource-variable/inter'
import theme from './theme/theme'
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>,
)
