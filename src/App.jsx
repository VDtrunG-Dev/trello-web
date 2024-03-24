import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { useColorScheme } from '@mui/material/styles/'

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
