import { useContext, useCallback, useState, useEffect } from "react"
import FilterContext from "../../../../state/filter/Context"
import * as filterActions from "../../../../state/filter/actions"

import styles from "./TodoFilter.module.css"
import FilterSelect from "./components/FilterSelect"

export default function TodoFilter(){
    const { filter, dispatchToFilter } = useContext(FilterContext)
    const [selectValue, setSelectValue] = useState(filter)

    const handleOptionChange = useCallback((evt) => {
        setSelectValue(evt.target.value)
    }, [])
    const handleUpdateFilter = useCallback((filter) => {
        dispatchToFilter(filterActions.toggleFilter(filter))
    }, [dispatchToFilter])

    useEffect(() => {
        handleUpdateFilter(selectValue)
    }, [selectValue, handleUpdateFilter])

    return (
        <div className={styles.container}>
            <FilterSelect 
                value={selectValue}
                onOptionChange={handleOptionChange}
                options={[
                    {title: "Todas as tarefas", value: "all"},
                    {title: "Tarefas a se fazer", value: "active"},
                    {title: "Tarefas realizadas", value: "completed"},
                ]}
            />
        </div>
    )
}