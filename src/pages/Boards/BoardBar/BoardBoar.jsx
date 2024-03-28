import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FlashAutoIcon from '@mui/icons-material/FlashAuto'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
      paddingX: 2,
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#273c75' : '#0097e6'),
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="DucTrungDev"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Public/Private Workpaace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FlashAutoIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterAltIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          total={24}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#5f27cd' }
            }
          }}>
          <Tooltip title="DucTrungDev">
            <Avatar alt="DucTrungDev" src='https://scontent.fhan5-7.fna.fbcdn.net/v/t1.6435-1/175839168_2553408714962754_3956644001235066942_n.jpg?stp=dst-jpg_p320x320&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFgmL741YcBg87f_mmPR_mIbABxq20c36dsAHGrbRzfp4h5bGAu63KLSyWV_6SAmeX8wLi9PtCtj7BXKGlYVdJG&_nc_ohc=FAHz-gg7YBwAX-iWh92&_nc_ht=scontent.fhan5-7.fna&oh=00_AfDDtcbG1gtt7OA9rGzdWM8QSeMNzse72_5Sb2AbOVtTYA&oe=6628B011'
            />
          </Tooltip>
          <Tooltip title="DucTrungDev">
            <Avatar alt="DucTrungDev" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9AkLgB1tohGFbJohANZeOeFAQ939X-BMF3cXyaXtYnAJnGIua3I25dZBEQ&s'
            />
          </Tooltip>
          <Tooltip title="DucTrungDev">
            <Avatar alt='Hii' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_63CGTDmQuD_WJzu2vjmAzu5o2RjVDdkkI7jn76-Zj7ZrLahUsQNA0Vg0A&s'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
