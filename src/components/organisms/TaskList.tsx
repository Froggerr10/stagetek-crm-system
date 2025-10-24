import { useState } from 'react'
import { useTasks } from '@/hooks/useTasks'
import TaskCard from '@/components/molecules/TaskCard'
import TaskForm from '@/components/organisms/TaskForm'
import Button from '@/components/molecules/Button'
import Spinner from '@/components/atoms/Spinner'
import type { Task } from '@/types'

interface TaskListProps {
  opportunityId?: string
  clientId?: string
  showCompleted?: boolean
}

export default function TaskList({ opportunityId, clientId, showCompleted = false }: TaskListProps) {
  const { tasks, loading, createTask, updateTask, deleteTask, completeTask, uncompleteTask } = useTasks({
    opportunity_id: opportunityId,
    client_id: clientId,
    is_completed: showCompleted ? undefined : false,
  })
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleEdit = (task: Task) => {
    setSelectedTask(task)
    setShowForm(true)
  }

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    if (isCompleted) {
      await uncompleteTask(id)
    } else {
      await completeTask(id)
    }
  }

  const handleSubmit = async (data: any) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, data)
    } else {
      await createTask(data)
    }
    setShowForm(false)
    setSelectedTask(null)
  }

  if (loading) return <div className="flex justify-center py-8"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Tarefas ({tasks.length})</h3>
        <Button onClick={() => { setSelectedTask(null); setShowForm(true) }}>+ Nova Tarefa</Button>
      </div>
      <div className="space-y-3">{tasks.length === 0 ? <p className="text-gray-400 text-center py-8">Nenhuma tarefa encontrada</p> : tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={deleteTask} onToggleComplete={handleToggleComplete} />)}</div>
      {showForm && <TaskForm task={selectedTask} opportunityId={opportunityId} clientId={clientId} onSubmit={handleSubmit} onClose={() => { setShowForm(false); setSelectedTask(null) }} />}
    </div>
  )
}
