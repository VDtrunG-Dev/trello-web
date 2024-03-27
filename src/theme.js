import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { lightBlue, blue, deepPurple, orange, teal } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ( ${APP_BAR_HEIGHT} + ${BOARD_BAR_HEIGHT} ))`

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: {
  //         light: '#',
  //         main: '#',
  //         dark: '#',
  //         contrastText: '#'
  //       },
  //       secondary: blue
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: {
  //         light: '#',
  //         main: '#',
  //         dark: '#',
  //         contrastText: '#'
  //       },
  //       secondary: teal
  //     }
  //   }
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: '#dcdde1'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px'
          // '&:hover ': {
          //   borderWidth: '1px'
          // }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0,875 rem'
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            // '.MuiOutlinedInput-notchedOutline': {
            //   borderColor: theme.palette.primary.main
            // },
            // '&: hover': {
            //   '.MuiOutlinedInput-notchedOutline': {
            //     borderColor: theme.palette.primary.light
            //   }

            // },
            '& fieldset': {
              borderWidth: '0.5px !important'
            },
            '&:hover fieldset': {
              borderWidth: '1px !important'
            },
            '&.Mui-focused fieldset': {
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