import { useState } from 'react'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import ClearIcon from '@mui/icons-material/Clear'

function AppBar() {
  const [searchValue, setSearchValue] = useState()
  return (
    <AppBarReponsitive position="static">
      <Box
        sx={{
          px: 2,
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          overflowX: 'auto',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#130f40' : '#00a8ff'),
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavBar />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, pr: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }} >
              <Workspaces />
              <Recent />
              <Starred />
              <Templates />
            </Box>
            <Button
              sx={{
                color: 'white',
                border: 'none',
                '&: hover': {
                  border: 'none'
                }
              }}
              variant="outlined"
              startIcon={<LibraryAddIcon />}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            type='text'
            size='small'
            label='Search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <ClearIcon
                  sx={{
                    color: searchValue ? 'white' : 'transparent',
                    fontSize: 'small',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSearchValue('')}
                />
              )
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '170px',
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
          <ModeDarkLight />
          <Box sx={{ display: { xs: 'none', 'sm': 'none', md: 'flex' }, gap: 1 }}>
            <Tooltip title="Notifications" >
              <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                <NotificationsNoneIcon sx={{ color: 'white' }} />
              </Badge>
            </Tooltip>
            <Tooltip title="Help">
              <Badge color="secondary" sx={{ cursor: 'pointer' }}>
                <HelpOutlineIcon sx={{ color: 'white' }} />
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
