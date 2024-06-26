import React from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import AddCardIcon from '@mui/icons-material/AddCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utilities/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Column({ column }) {

  // Drag and Drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })
  // Nếu dùng sử dụng
  const dndKitColumnStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một cái column dài thì phải kéo ở khu
    // vực giữa rất khó chịu.
    // Lưu ý: Lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường
    // hợp kéo vào vùng xanh
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  // Sort
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  // Open_Close
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
    >
      < Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }
        }>
        {/* Box Column Header */}
        < Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='h6' sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          >
            {column.title}
          </Typography>
          <Box>
            <Box>
              <Tooltip title="More optons">
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color: 'text.primary',
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DocumentScannerIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Page</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><BeenhereIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteForeverIcon fontSize="medium" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box >

        {/*List Cart */}
        <ListCards cards={orderedCards} />
        {/* Box Colume Footer */}
        < Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box >
      </Box >
    </div>

  )
}

export default Column
