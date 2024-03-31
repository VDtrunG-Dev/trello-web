import Box from '@mui/material/Box'
import ListColums from './ListColumns/ListColums'
import { mapOrder } from '~/utilities/sorts'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  // Cùng một thời điểm chỉ có 1 phần tử đang được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCart, setOldColumnWhenDraggingCart] = useState(null)

  useEffect(() => {
    setOrderedColumn(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])


  // Tìm 1 cái colums theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung cập nhật lại state trong trường hợp di chuyển cart giữa 2 column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCarId,
    activeDraggingCardData
  ) => {
    setOrderedColumn(prevColumns => {
      // Tìm vị trí của overCard trong column đích
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex

      // Logic tính toán cho "Card Index mới"
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // Old Column
      if (nextActiveColumn) {
        // Xóa card ở column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để
        // để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCarId)
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu với
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      // New Column
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCarId)

        // Đối với trường hợp dragEnd thì phải cập nhật lại giá trị columnId trong card
        // sau khi kéo giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Tiếp theo thêm card đang kéo vào vị trí mới ở overColumn
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      }

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo(drag) 1 phần tử
  const handleDragStart = (event) => {
    // console.log(event);
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCart(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá trình kéo
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các column
    // console.log('handleDragOver ', event)
    const { active, over } = event

    // Cần đảm bảo nếu không tồn tại active hoăc over thì return luôn để tránh lỗi
    if (!active || !over) return

    // activeDraggingCard: Là card đang được kéo
    const { id: activeDraggingCarId, data: { current: activeDraggingCardData } } = active
    // overCard: Là card đang tương tác trên hoặc dưới so với card đang được kéo ở trên
    const { id: overCardId } = over
    // Tìm 2 cái column theo cardId

    const activeColumn = findColumnByCardId(activeDraggingCarId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 column thì ko làm gì hết để tránh crash
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCarId,
        activeDraggingCardData
      )
    }
  }

  // Trigger khi kết thúc hành động kéo(drag) một phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard: Là card đang được kéo
      const { id: activeDraggingCarId, data: { current: activeDraggingCardData } } = active
      // overCard: Là card đang tương tác trên hoặc dưới so với card đang được kéo ở trên
      const { id: overCardId } = over
      // Tìm 2 cái column theo cardId

      const activeColumn = findColumnByCardId(activeDraggingCarId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 column thì ko làm gì hết để tránh crash
      if (!activeColumn || !overColumn) return


      if (oldColumnWhenDraggingCart._id !== overColumn._id) {
        // console.log('Hành động kéo thả card giữa 2 column khác nhau')
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCarId,
          activeDraggingCardData
        )
      } else {
        // Hành động kéo thả card trong cùng 1 column
        // Lấy vị trí cũ từ oldColumnWhenDraggingCart
        const oldCartIndex = oldColumnWhenDraggingCart?.cards?.findIndex(c => c._id === activeDragItemId)
        // Lấy vị trí mới từ active
        const newCartIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        // Dùng arrayMove vì kéo card trong 1 column tương tự logic kéo column trong 1 boardContent
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCart?.cards, oldCartIndex, newCartIndex)

        setOrderedColumn(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          // Trả vê giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả column trong 1 boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lấy vị trí mới từ active
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // Dùng arrayMove để sắp xếp lại mảng Column ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // Sau dùng xử lý gọi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // Cập nhật lại state columns ban đầu sau kéo thả
        setOrderedColumn(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả này phải đưa về giá trị null ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCart(null)
  }

  // Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay

  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      // Cảm biến
      sensors={sensers}
      // Thuật toán phát hiện va chạm(nếu không có nó thì card với cover lớn sẽ không kéo qua được column được
      // vì lúc này nó đang bị conflict giữa card và column), chúng ta closetstCorners thay vì closetstCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#273c75' : '#0097e6'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColums columns={orderedColumns} />
        <DragOverlay dropAnimation={customdropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent
