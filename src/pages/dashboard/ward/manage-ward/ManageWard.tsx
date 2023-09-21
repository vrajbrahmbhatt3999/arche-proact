import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../../../../components/common/button/Button";
import Select from "react-select";
import { DropdownIndicator } from "../../../../components/common/dropdown-indicator/DropdownIndicator";

import { Input } from "../../../../components/common/input/input";
import styles from "./manageWard.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  addWards,
  editWard,
  getWardById,
} from "../../../../redux/features/ward/wardAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useLocation } from "react-router-dom";
import Loader from "../../../../components/common/spinner/Loader";

const ManageWard: FC = () => {
  const navigate = useNavigate();
  const { branchData } = useAppSelector((state) => state.login);
  const { isLoading, wardInfo } = useAppSelector((state) => state.ward);
  const checkWardInfoLength = wardInfo?.hasOwnProperty?.("ward_name");
  const dispatch = useAppDispatch();
  const location = useLocation().state;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>();

  const watchDepartnment = watch("department");

  const onSubmit = (data: any) => {
    if (!checkWardInfoLength) {
      let responseData = {
        department_id: data?.department?.value,
        ward_name: data?.wardName,
        notes: data?.notes,
      };
      dispatch(addWards(requestGenerator(responseData))).then((result) => {
        if (result.type === "ward/addWards/fulfilled") {
          reset();
          setValue("department", "");
          navigate("/medicalcenter/ward");
        }
      });
    } else {
      let responseData = {
        id: location?.id,
        data: {
          department_id: data?.department?.value,
          ward_name: data?.wardName,
          notes: data?.notes,
        },
      };
      dispatch(editWard(requestGenerator(responseData))).then((result) => {
        console.log(result, "res");
        if (result.type === "ward/editWard/fulfilled") {
          navigate("/medicalcenter/ward");
        }
      });
    }
  };

  useEffect(() => {
    // if (checkWardInfoLength) {
    dispatch(getWardById(requestGenerator({ id: location?.id })));
    // }
  }, [checkWardInfoLength, dispatch, location?.id]);

  useEffect(() => {
    if (wardInfo?.hasOwnProperty?.("ward_name")) {
      setValue("wardName", wardInfo?.ward_name);
      setValue("notes", wardInfo?.notes);
      setValue("department", {
        label: wardInfo?.department_id?.name,
        value: wardInfo?.department_id?._id,
      });
    } else {
      setValue("wardName", "");
      setValue("notes", "");
      setValue("department", null);
    }
  }, [setValue, wardInfo]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.dropDownField}>
              <label className={styles.labelWrapper}>
                Dept
                <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.errorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Select Department"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watchDepartnment}
                  components={{ DropdownIndicator }}
                  {...register("department", { required: true })}
                  options={branchData?.departments?.map((item: any) => ({
                    label: item?.name,
                    value: item?._id,
                  }))}
                  onChange={(selectedOption: any) => {
                    setValue("department", selectedOption);
                  }}
                  maxMenuHeight={200}
                />
                {errors?.department?.type === "required" && (
                  <p className={styles.errorMessage}>This field is mandatory</p>
                )}
              </div>
            </div>
            <div style={{ flexBasis: "50%", marginBlock: "10px" }}>
              <Input
                labelText="Ward name"
                requiredField={true}
                {...register("wardName", { required: true })}
                showErrors={errors?.wardName?.type === "required"}
                errorMessage="This field is mandatory"
              />
            </div>
            <div style={{ flexBasis: "50%", marginBlock: "10px" }}>
              <Input labelText="Notes" {...register("notes")} />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Back"
              customClass={styles.backBtn}
              type="button"
              handleClick={() => {
                navigate("/medicalcenter/ward");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageWard;
