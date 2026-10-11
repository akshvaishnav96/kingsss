import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { MotionConfig } from 'motion/react'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource-variable/inter'
import theme from './theme/theme'
import { queryClient, persistOptions } from './lib/queryClient'
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </ThemeProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
)
