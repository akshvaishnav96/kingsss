import { createTheme } from '@mui/material/styles'

export const brand = {
  navy: '#071D33',
  navyDark: '#0B2744',
  gold: '#D6AD52',
  goldLight: '#F4D58A',
  white: '#FFFFFF',
  soft: '#F5F7FA',
  text: '#465467',
}

const serif = '"Playfair Display", Georgia, "Times New Roman", serif'
const sans = '"Inter Variable", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif'

const theme = createTheme({
  palette: {
    primary: { main: brand.navy, dark: '#04121F', light: brand.navyDark, contrastText: '#fff' },
    secondary: { main: brand.gold, light: brand.goldLight, dark: '#B88E36', contrastText: brand.navy },
    background: { default: '#fff', paper: '#fff' },
    text: { primary: brand.navy, secondary: brand.text },
    divider: 'rgba(7, 29, 51, 0.1)',
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: sans,
    h1: { fontFamily: serif, fontWeight: 600, fontSize: 'clamp(2.5rem, 1.6rem + 4.2vw, 5.25rem)', lineHeight: 1.04, letterSpacing: '-0.01em' },
    h2: { fontFamily: serif, fontWeight: 600, fontSize: 'clamp(1.9rem, 1.4rem + 2vw, 3.1rem)', lineHeight: 1.12 },
    h3: { fontFamily: serif, fontWeight: 600, fontSize: 'clamp(1.45rem, 1.2rem + 1vw, 2.1rem)', lineHeight: 1.2 },
    h4: { fontFamily: serif, fontWeight: 600, fontSize: 'clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem)', lineHeight: 1.3 },
    h5: { fontFamily: serif, fontWeight: 600, fontSize: '1.2rem', lineHeight: 1.35 },
    h6: { fontFamily: sans, fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontSize: 'clamp(1.05rem, 1rem + 0.3vw, 1.25rem)', lineHeight: 1.6 },
    body1: { fontSize: '1rem', lineHeight: 1.75 },
    body2: { fontSize: '0.9rem', lineHeight: 1.65 },
    overline: { fontWeight: 600, letterSpacing: '0.2em', fontSize: '0.72rem', lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  components: {
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: 16,
          paddingRight: 16,
          [theme.breakpoints.up('sm')]: { paddingLeft: 32, paddingRight: 32 },
        }),
        maxWidthLg: { '@media (min-width: 1200px)': { maxWidth: 1280 } },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 3,
          minHeight: 48,
          paddingInline: 26,
          transition: 'background-color .25s, color .25s, border-color .25s, transform .2s, box-shadow .25s',
          '&:active': { transform: 'scale(0.97)' },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${brand.goldLight} 0%, ${brand.gold} 55%, #C79A3E 100%)`,
          color: brand.navy,
          '&:hover': { boxShadow: '0 10px 24px -10px rgba(214,173,82,.8)', transform: 'translateY(-1px)' },
        },
        outlined: { borderWidth: 1 },
        sizeSmall: { minHeight: 40, paddingInline: 18 },
      },
    },
    MuiButtonBase: { defaultProps: { disableRipple: false } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(7,29,51,.16)' } },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 500, borderRadius: 3 } } },
  },
})

export default theme
