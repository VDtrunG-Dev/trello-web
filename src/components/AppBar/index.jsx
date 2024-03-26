import Box from '@mui/material/Box'
import ModeDarkLight from '~/components/ModeDarkLightToggle'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { AppBar as AppBarReponsitive } from '@mui/material'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Profiles from './Menus/Profiles'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import NavBar from './NavBar'

function AppBar() {
  return (
    <AppBarReponsitive position="static">
      <Box
        px={2} sx={{
          // backgroundColor: 'secondary.main',
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          overflowX: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavBar />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, pr: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }} >
              <Workspaces />
              <Recent />
              <Starred />
              <Templates />
            </Box>
            <Button variant="outlined" >Create</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            type='search'
            size='small'
            placeholder='Search...'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 120 }}
          />
          <ModeDarkLight />
          <Box sx={{ display: { xs: 'none', 'sm': 'none', md: 'flex' }, gap: 1 }}>
            <Tooltip title="Notifications" >
              <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
              </Badge>
            </Tooltip>
            <Tooltip title="Help">
              <Badge color="secondary" sx={{ cursor: 'pointer' }}>
                <HelpOutlineIcon sx={{ color: 'primary.main' }} />
              </Badge>
            </Tooltip>
          </Box>
          <Profiles />
        </Box>
      </Box>
    </AppBarReponsitive>

  )
}

export default AppBar
