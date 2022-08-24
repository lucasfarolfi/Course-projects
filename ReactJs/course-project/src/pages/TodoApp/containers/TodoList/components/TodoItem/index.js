import { ReactComponent as UpdateBtnIcon } from "../../../../../../assets/icons/update-icon.svg"
import { ReactComponent as DeleteBtnIcon } from "../../../../../../assets/icons/delete-icon.svg"
import { useState, useCallback, useEffect } from "react"
import styles from "./TodoItem.module.css"

export default function TodoItem({id, title, onDelete, completed, onStatusUpdate, onModalOpen}){
    const [isCompleted, setIsCompleted] = useState(completed)

    const handleChange = useCallback((evt) => {
        setIsCompleted(evt.target.checked)
    }, [setIsCompleted])

    const handleModalOpen = useCallback(() => {
        onModalOpen(id)
    }, [id, onModalOpen])

    useEffect(() => {
        onStatusUpdate(id, isCompleted)
    }, [id, isCompleted, onStatusUpdate])

    return(
        <li className={styles.item}>
            <span className={completed ? styles.completed : null}>{title}</span>
            <div className={styles.controlButtons}>
                <input 
                    type="checkbox" 
                    defaultChecked={isCompleted || false}
                    onClick={handleChange}
                />
                <button onClick={handleModalOpen}><UpdateBtnIcon/></button>
                <button onClick={onDelete}><DeleteBtnIcon/></button>
            </div>
        </li>
    )
}