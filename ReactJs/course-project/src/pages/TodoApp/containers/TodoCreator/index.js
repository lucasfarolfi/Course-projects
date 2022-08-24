import { useContext, useEffect, useRef } from "react"
import { useFormik } from "formik"
import TodosContext from "../../../../state/todo/Context"
import * as TodosActions from "../../../../state/todo/actions"
import * as yup from "yup"
import styles from "./TodoCreator.module.css"

export default function TodoCreator(){
    const { dispatchToTodos } = useContext(TodosContext)
    const { errors, handleSubmit, getFieldProps, isValid } = useFormik({
        initialValues:{
            title: ''
        },
        validateOnBlur: false,
        validationSchema: yup.object({
            title: yup.string().required("Você precisa preencher o nome da tarefa.")
        }),
        onSubmit: (values, formikBag) => {
            dispatchToTodos(TodosActions.addTodo(values.title))
            formikBag.setFieldValue("title", "", false) // Limpa o input
            // false - evita validar antes da página renderizar
        }
    })

    // Focus no input ao recarregar a página
    const inputTitle = useRef(null)
    useEffect(() => {
        inputTitle.current.focus()
    },[])

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input 
                type="text"
                placeholder="Digite o título da tarefa"
                className={styles.input}
                ref={inputTitle}
                autoComplete="off"
                {...getFieldProps("title")}
            />
            
            <button type="submit" disabled={!isValid} className={styles.submitBtn}>Adicionar tarefa</button>

            {
                errors.title &&
                <small className={styles.error}>{errors.title}</small>
            }
        </form>
    )
}