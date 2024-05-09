import { Header } from './components/Header/Header'
import { Input } from './components/Header/Input'
import { Button } from './components/Header/Button'
import styles from './App.module.css'
import { HeaderTop } from './components/List/HeaderTop'
import { Item } from './components/List/Item'
import { useState } from 'react'
import { Empty } from './components/List/Empty'
import { PlusCircle } from 'phosphor-react'

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue ] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }
  
  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTask)
  }

  function handleToggleTask({ id, value }: { id: number, value:boolean }) {
    const updateTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }
      return { ...task }
    })

    setTasks(updateTasks)
  }

  return (
    <main>
      <Header />

    <section className={styles.content}>
      <div className={styles.taskInfoContainer}>
        <Input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue} />
        <Button onClick={handleAddTask} >Criar <PlusCircle size={18} /> </Button>
      </div>

      <div>
        <HeaderTop
        tasksCounter={tasks.length}
        checkedTasksCounter={checkedTasksCounter}
        />

        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Item
                key={task.id}
                data={task}
                removeTask={handleRemoveTask}
                toggleTaskStatus={handleToggleTask}
              />
            ))}
          </div>
        ) : (
          <Empty />
        )}

      </div>

    </section>
    </main>
  )
}

