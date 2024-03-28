import Box from '@mui/material/Box'
import ListColums from './ListColumns/ListColums'
import { mapOrder } from '~/utilities/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {

  // Nếu dùng PointerSensor mặc định phải kết hợp thuộc tính CSS touch-action: none ở những thành phần kéo thả(con bug)
  // Yêu cầu chuột di chuyển 10px nếu muốn kích hoạt event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu cầu chuột di chuyển 10px nếu muốn kích hoạt event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Nhấn dữ 250ms và dung sai cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  // const sensers = useSensors(pointerSensor)
  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất
  const sensers = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumn] = useState([])

  useEffect(() => {
    setOrderedColumn(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lấy vị trí mới từ active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      // Dùng arrayMove để sắp xếp lại mảng Column ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // Sau dùng xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // Cập nhật lại state columns ban đầu sau kéo thả
      setOrderedColumn(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensers}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#273c75' : '#0097e6'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColums columns={orderedColumns} />
      </Box>
    </DndContext>

  )
}

export default BoardContent
