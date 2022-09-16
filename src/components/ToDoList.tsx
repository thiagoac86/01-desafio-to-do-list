import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react'
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';
import styles from './ToDoList.module.css'

import emptyList from '../assets/empty-list.svg'

interface Task {
    id: string;
    description: string;
    checked: boolean;
}


export function ToDoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    const isNewTaskEmpty = newTaskText.length === 0;

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const newTask = {
            id: uuidv4(),
            description: newTaskText,
            checked: false
        }
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewTaskText(event.target.value);
    }

    function deleteTask(taskId: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskId;
        })

        setTasks(tasksWithoutDeletedOne);
    }

    function checkTask(taskId: string, isChecked: boolean) {
        const tasksToUpdate = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, checked: isChecked }
            }
            else {
                return task;
            }
        })

        setTasks(tasksToUpdate);
    }

    const checkedTasks: Task[] = tasks.filter(task => { return task.checked })

    return (
        <div className={styles.toDoList}>
            <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
                <textarea
                    value={newTaskText}
                    placeholder="Adicione uma nova tarefa"
                    onChange={handleNewTaskChange}
                    required
                />
                <button type='submit' disabled={isNewTaskEmpty} >
                    Criar
                    <PlusCircle size={17} />
                </button>
            </form>
            <header>
                <div className={styles.createdTasksCount}>
                    <strong>Tarefas criadas</strong>
                    <span>{tasks.length}</span>

                </div>
                <div className={styles.finishedTasksCount}>
                    <strong>Concluídas</strong>
                    <span>{checkedTasks.length} de {tasks.length}</span>
                </div>
            </header>

            {tasks.length === 0

                ?

                (
                    <div className={styles.emptyTaskList}>
                        <img src={emptyList} alt="Lista Vazia" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seu itens a fazer</span>
                    </div>
                )

                :

                (
                    <div className={styles.taskListBox}>
                        {tasks.map(task => {
                            return <Task key={task.id} taskId={task.id} description={task.description} onCheckTask={checkTask} onDeleteTask={deleteTask} />
                        })}
                    </div>
                )

            }

            {/* <div className={styles.emptyTaskList}>
                <img src={emptyList} alt="Lista Vazia" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seu itens a fazer</span>
            </div> */}
            {/* <div className={styles.taskListBox}>
                {tasks.map(task => {
                    return <Task key={task.id} taskId={task.id} description={task.description} onCheckTask={checkTask} onDeleteTask={deleteTask} />
                })}
            </div> */}
        </div>
    )
}