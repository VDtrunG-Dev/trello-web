import { useColorScheme } from '@mui/material/styles/'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
function ModeDarkLight() {

  const { mode, setMode } = useColorScheme()
  const handleModeChange = (e) => {
    setMode(e.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 60 }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: 'white',
          '&:hover .Mui-focused': { color: 'white' },
          '&.Mui-focused': { color: 'white' }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleModeChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '.MuiSvgIcon-root': { color: 'white' }
        }}
      >
        <MenuItem value="light">
          <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>Light</Typography>
            <Brightness5Icon fontSize='small' />
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>Dark</Typography>
            <Brightness4Icon fontSize='small' />
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>System</Typography>
            <Brightness6Icon fontSize='small' />
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeDarkLight
