import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColums({ columns }) {

  // SortableContext yêu cầu items là 1 mảng dạng ['id_1', 'id_2'] (kiểu dữ liệu nguyên thủy) chứ
  // không phải dạng [{id: 'id_1'}] (Object).
  // Nếu không dùng thì vẫn kéo thả được nhưng không có animation
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: '8px'
          }} startIcon={<PlaylistAddIcon />}>Add new column</Button>
        </Box>
      </Box>
    </SortableContext>

  )
}

export default ListColums
