import styles from "./FilterSelect.module.css"

export default function FilterSelect({ value, options, onOptionChange }){
    return (
        <select className={styles.select} onChange={onOptionChange} defaultValue={value}>
            {
                options &&
                options.map(opt => {
                    return <option key={opt.value} value={opt.value}>{opt.title}</option>
                })
            }
        </select>
    )
}