import Box from '@mui/material/Box'
import ModeDarkLightToggle from '~/components/ModeDarkLightToggle'

const AppBar = () => {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeDarkLightToggle />
    </Box>
  )
}

export default AppBar
