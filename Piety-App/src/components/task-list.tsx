import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './todo'
import { makeStyledComponent } from '../utils/styled'
import { FlatList, useColorModeValue, VStack } from 'native-base'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface ListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props


  /* EVENT HANDLING */

  const handleCheck = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])

  const handleChangeSubject = useCallback(subject => {
    onChangeSubject(data, subject)
  }, [data, onChangeSubject])
  
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])


  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckbox={handleCheck}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function TaskList(props: ListProps) {
  const {
    data,
    onToggleItem,
    onChangeSubject,
    editingItemId,
    onPressLabel,
    onFinishEditing,
    onRemoveItem
  } = props

  const scrollRef = useRef(null)

  const bg = useColorModeValue("#FEDBD0", "blueGray.900")

  return (
    <StyledScrollView ref={scrollRef} w="full">
      <AnimatePresence>
        {data.map (item => (
          <VStack padding={2} mt={2}>
            <AnimatedTaskItem
              key={item.id}
              data={item}
              simultaneousHandlers={scrollRef}
              isEditing={item.id === editingItemId}
              onToggleItem={onToggleItem}
              onChangeSubject={onChangeSubject}
              onFinishEditing={onFinishEditing}
              onPressLabel={onPressLabel}
              onRemove={onRemoveItem}
            />
          </VStack>
        ))}
             </AnimatePresence>
    </StyledScrollView>
  )
}
