import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../../components/common/button/Button";
import {
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
} from "../../../../constants/asyncActionsType";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  addDepartment,
  editDepartment,
  getDepartmentById,
} from "../../../../redux/features/department/departmentAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { DEPT_NAME, NOTES } from "../../../../constants/constant";
import { departmentValidators } from "../../../../form-validators/departmentValidators";
import styles from "./manageDepartment.module.scss";
import Loader from "../../../../components/common/spinner/Loader";
import { clearDepartmentInfo } from "../../../../redux/features/department/departmentSlice";
import { trimValue } from "../../../../utils/utils";

interface IManageDepartment {
  name: string;
  notes: any;
}

const ManageDepartment: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLoading, departmentInfo } = useAppSelector(
    (state) => state.department
  );

  useEffect(() => {
    let data = location.state;
    location &&
      location.state &&
      location.state.id &&
      dispatch(getDepartmentById(requestGenerator(data)));
  }, []);

  const values = departmentInfo;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IManageDepartment>({
    defaultValues: {
      name: departmentInfo?.name,
      notes: departmentInfo?.notes,
    },
    values,
  });

  const onSubmit: SubmitHandler<IManageDepartment> = (data: any) => {
    console.log(">>>>", data);

    if (location && location.state && location.state.id) {
      let id = location.state.id;
      dispatch(editDepartment(requestGenerator({ id, data }))).then((e) => {
        console.log("e>>>", e);
        if (e.type === `${EDIT_DEPARTMENT}/fulfilled`) {
          navigate("/medicalcenter/department");
          // dispatch(clearDepartmentInfo());
        }
      });
    } else {
      dispatch(addDepartment(requestGenerator(data))).then((e) => {
        if (e.type === `${ADD_DEPARTMENT}/fulfilled`) {
          navigate("/medicalcenter/department");
          dispatch(clearDepartmentInfo());
        }
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageDepartmentContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              Department Name <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <input
                type="text"
                placeholder="Enter department name"
                className={styles.inputField}
                {...register(DEPT_NAME, departmentValidators[DEPT_NAME])}
                onChange={(e) => trimValue(e)}
              />
              {errors[DEPT_NAME] && (
                <p className="errorText">{errors[DEPT_NAME].message}</p>
              )}
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>Notes</label>
            <div className={styles.fieldErrorContainer}>
              <textarea
                // type="text"
                placeholder="Enter notes"
                className={styles.inputField}
                {...register(NOTES)}
                onChange={(e) => trimValue(e)}
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="reset"
              customClass={styles.backBtn}
              handleClick={() => dispatch(clearDepartmentInfo())}
            />
            <Button
              title="Back"
              type="button"
              customClass={styles.backBtn}
              handleClick={() => navigate("/medicalcenter/department")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageDepartment;
