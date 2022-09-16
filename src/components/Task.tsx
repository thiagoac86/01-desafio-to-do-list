import { Trash } from 'phosphor-react'
import { useState } from 'react';
import styles from './Task.module.css'

interface TaskProps {
    taskId: string;
    description: string;
    onDeleteTask: (taskId: string) => void;
    onCheckTask: (taskId: string, isChecked: boolean) => void;
}

export function Task({ taskId, description, onDeleteTask, onCheckTask }: TaskProps) {

    const [isCheckedTask, setIsCheckedTask] = useState<boolean>(false);

    function handleDeleteTask() {
        onDeleteTask(taskId);
    }

    function handleCheckTask() {
        setIsCheckedTask((state) => {
            onCheckTask(taskId, !state);
            return !state;
        })
    }

    return (
        <div className={styles.task}>
            <input type="radio" checked={isCheckedTask} onClick={handleCheckTask} />
            <div className={styles.taskBox}>
                <div className={styles.taskContent}>
                    {isCheckedTask ? <span className={styles.markedText}>{description}</span> : <span>{description}</span>}
                    <button onClick={handleDeleteTask}>
                        <Trash size={17} />
                    </button>
                </div>
            </div>
        </div>
    )
}