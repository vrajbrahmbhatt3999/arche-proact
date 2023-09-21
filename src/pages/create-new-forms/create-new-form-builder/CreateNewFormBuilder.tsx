import React, { FC, useEffect, useState } from "react";
import styles from "./createNewFormBuilder.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import CreatedUsersPopup from "../../../components/common/created-users-popup/CreatedUsersPopup";
import { utcToDate } from "../../../utils/utils";
import Button from "../../../components/common/button/Button";
import { DropDownIcon, PolygonIcon } from "../../../components/common/svg-components";
import { FormBuilder, Form } from 'react-formio/lib/components';
import { createNewForm, updateCreateNewFormById } from "../../../redux/features/create-new-form/createNewFormAsynActions";

interface ICreateNewFormBuilder { }

const CreateNewFormBuilder: FC<ICreateNewFormBuilder> = () => {

    /* Dependency to navigate between pages */
    const navigate = useNavigate()
    /* Dependency to navigate between pages */

    /* Dependency to dispatch an action */
    const dispatch = useAppDispatch()
    /* Dependency to dispatch an action */

    /* Dependency for form builder */
    var selFormBuilderObj = {}; // using a state variable and setting in handleFormBuilderChange was causing infinite loop issues so i have used var
    const [formBuilderJson, setFormBuilderJson] = useState({ display: 'form', components: [] })
    /* Dependency for form builder */

    /* Selector to get the initial data of module from redux store*/
    const { isLoading, createNewFormData, createFormBuilderHeaderData, isStatusUpdated } = useAppSelector(
        (state) => state.createNewForm
    );
    /* Selector to get the initial data of module from redux store*/


    useEffect(() => {
        /* Navigate back to list component if the following dependencies are not present */
        if (!createFormBuilderHeaderData.name || !createFormBuilderHeaderData.module_name || !createFormBuilderHeaderData.department_id) {
            navigate('/formBuilder')
        }
        /* Navigate back to list component if the following dependencies are not present */

        if (createFormBuilderHeaderData.form && createFormBuilderHeaderData.form !== "" && createFormBuilderHeaderData.form !== null && createFormBuilderHeaderData.form !== undefined) {
            setFormBuilderJson(JSON.parse(createFormBuilderHeaderData.form))
        }
    }, [])

    console.log(formBuilderJson,'formBuilderJson')

    /* Function definition for form submission */
    const onSubmit = () => {
        if (createFormBuilderHeaderData._id && createFormBuilderHeaderData._id !== "" && createFormBuilderHeaderData._id !== undefined && createFormBuilderHeaderData._id !== null) {
            const dataToBeSent = {
                id: createFormBuilderHeaderData._id,
                data: {
                    name: createFormBuilderHeaderData.name,
                    module_name: createFormBuilderHeaderData.module_name,
                    department_id: createFormBuilderHeaderData.department_id.value,
                    note: createFormBuilderHeaderData.note,
                    form: JSON.stringify({ ...selFormBuilderObj })
                }
            }

            // console.log(dataToBeSent, 'datatobesent during update form builder call')
            dispatch(updateCreateNewFormById(requestGenerator(dataToBeSent))).then(result=>{
                navigate('/formBuilder')
            })
        }
        else {
            const dataToBeSent = {
                name: createFormBuilderHeaderData.name,
                module_name: createFormBuilderHeaderData.module_name,
                department_id: createFormBuilderHeaderData.department_id.value,
                note: createFormBuilderHeaderData.note,
                form: JSON.stringify({ ...selFormBuilderObj })
            }
            dispatch(createNewForm(requestGenerator(dataToBeSent))).then(result=>{
                console.log(result,'result')
                navigate('/formBuilder')
            })
        }
    }
    /* Function definition for form submission */


    /* Function definition for form builder - OnChange */
    const handleFormBuilderChange = (schema: any) => {
        selFormBuilderObj = schema;
    }
    /* Function definition for form builder - OnChange */


    return (
        <>
            <div className={styles.mainFormBuilderContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerTitle}>
                        <div className={styles.label_data}>
                            <div>Form</div>
                            <PolygonIcon />
                            <div>{createFormBuilderHeaderData?.name}</div>
                        </div>
                        <div className={styles.label_data}>
                            <div>Module</div>
                            <PolygonIcon />
                            <div>{createFormBuilderHeaderData?.module_name}</div>
                        </div>
                        <div className={styles.label_data}>
                            <div>Department</div>
                            <PolygonIcon />
                            <div>{createFormBuilderHeaderData?.department_id?.label}</div>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button title="Submit Form" handleClick={onSubmit} />
                    </div>
                </div>
                <FormBuilder
                    form={formBuilderJson}
                    onChange={handleFormBuilderChange}
                />
            </div>
        </>
    );
};

export default CreateNewFormBuilder;
