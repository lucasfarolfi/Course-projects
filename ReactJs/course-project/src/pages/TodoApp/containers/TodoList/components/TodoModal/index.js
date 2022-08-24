import { ReactComponent as CloseBtnIcon } from "../../../../../../assets/icons/delete-icon.svg"
import styles from "./TodoModal.module.css"
import { useFormik } from "formik"
import * as yup from "yup"

export default function TodoModal({id, findTitle, onModalClose, onTitleUpdate}){
    const { errors, handleSubmit, getFieldProps, isValid } = useFormik({
        initialValues:{
            title: findTitle(id)
        },
        validationSchema: yup.object({
            title: yup.string().required("Você precisa preencher o nome da tarefa.")
        }),
        onSubmit: (values, formikBag) => {
            onTitleUpdate(id, values.title)
            formikBag.setFieldValue("title", "", false) // Limpa o input
            onModalClose()
        }
    })

    return (
        <>
            <div className={styles.backdrop} onClick={onModalClose}></div>
                <div className={styles.modal}>
                <button className={styles.closeModalBtn} onClick={onModalClose}>
                    <CloseBtnIcon/>
                </button>
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Digite o novo título"
                        className={styles.input}
                        autoComplete="off"
                        {...getFieldProps("title")}
                    />

                    {
                        errors.title &&
                        <small className={styles.error}>{errors.title}</small>
                    }

                    <button type="submit" disabled={!isValid} className={styles.submitBtn}>Adicionar tarefa</button>
                </form>
            </div>
        </>
    )
}