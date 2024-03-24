import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { useColorScheme } from '@mui/material/styles/'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import Box from '@mui/material/Box'

function ModeDarkLightToggle() {
  const { mode, setMode } = useColorScheme()

  console.log(mode)

  const handleModeChange = (e) => {
    setMode(e.target.value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleModeChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Light <Brightness5Icon fontSize='small' />
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Dark <Brightness4Icon fontSize='small' />
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            System <Brightness6Icon fontSize='small' />
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeDarkLightToggle />
      <ModeToggle />
      <div>Trung Ung Dung</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />
      <AcUnitIcon />
    </>
  )
}

export default App
