import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { lightBlue, blue, deepPurple, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: lightBlue,
        secondary: blue
      }
    },
    dark: {
      palette: {
        primary: deepPurple,
        secondary: teal
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0,875 rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            },
            '&: hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light
              }

            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    }
  }
})
// ...other properties

export default theme