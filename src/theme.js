import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepPurple, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepPurple
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
})
// ...other properties

export default theme