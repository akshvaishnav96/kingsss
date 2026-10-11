import { Component } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { brand } from '../theme/theme'

// Catches failed content loads (e.g. API unreachable) instead of showing a blank page.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  // After a new deploy, old tabs request chunk files that no longer exist: reload to fetch the new build.
  // At most once per 30 seconds, so a chunk that is genuinely broken shows the error screen instead of looping.
  componentDidCatch(error) {
    const staleChunk = /dynamically imported module|Importing a module script failed|error loading dynamically/i.test(error?.message ?? '')
    if (!staleChunk) return
    try {
      const last = Number(sessionStorage.getItem('kingsss-chunk-reload') ?? 0)
      if (Date.now() - last < 30_000) return
      sessionStorage.setItem('kingsss-chunk-reload', String(Date.now()))
    } catch {
      return // storage unavailable: no way to guard against loops, so don't auto-reload
    }
    window.location.reload()
  }

  retry = () => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <Box role="alert" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: brand.navy, color: '#fff', textAlign: 'center', p: 3 }}>
        <div>
          <Typography variant="h3" component="h1">We couldn’t load this page</Typography>
          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.7)' }}>Please check your connection and try again.</Typography>
          <Button variant="contained" color="secondary" onClick={this.retry} sx={{ mt: 3 }}>Try again</Button>
        </div>
      </Box>
    )
  }
}
