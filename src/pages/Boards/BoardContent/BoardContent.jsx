import Box from '@mui/material/Box'
import ListColums from './ListColumns/ListColums'
import { mapOrder } from '~/utilities/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board.columns, board.columnOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#273c75' : '#0097e6'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      <ListColums columns={board?.columns} />
    </Box>
  )
}

export default BoardContent
