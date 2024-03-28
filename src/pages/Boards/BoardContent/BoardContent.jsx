import Box from '@mui/material/Box'
import ListColums from './ListColumns/ListColums'

function BoardContent() {

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#273c75' : '#0097e6'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      <ListColums />
    </Box>
  )
}

export default BoardContent
