import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../../components/common/button/Button";
import {
  ADD_BRANCH,
  EDIT_BRANCH,
} from "../../../../constants/asyncActionsType";
import {
  ADDRESS_ONE,
  ADDRESS_TWO,
  BRANCH_INITIALS,
  BRANCH_NAME,
  CITY,
  COUNTRY,
  DEFAULT_SEQUENCE_NO,
  STATE,
  ZIPCODE,
} from "../../../../constants/constant";
import { branchValidators } from "../../../../form-validators/branchValidators";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  addBranch,
  editBranch,
  getBranchById,
} from "../../../../redux/features/branch/branchAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { clearBranchInfo } from "../../../../redux/features/branch/branchSlice";
import styles from "./manageBranch.module.scss";
import Loader from "../../../../components/common/spinner/Loader";
import { trimValue } from "../../../../utils/utils";

interface IManageBranch {
  name: string;
  initials: string;
  emr_sequence: string;
  default_sequence: string;
  address_line_1: any;
  address_line_2: any;
  city: string;
  country: string;
  state: string;
  zipcode: any;
  isDefault: boolean;
}

const ManageBranch: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLoading, branchInfo } = useAppSelector((state) => state.branch);
  const [maxvalue, setMaxValue] = useState("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const customInputValue = (item: any) => {
    const str = item.target.value;
    if (str?.startsWith(0)) {
      return setMaxValue("");
    }
    const strSplit = str.match(/[0-9]/g)?.slice(0, 3)?.join("")?.trim();
    setMaxValue(strSplit);
  };

  useEffect(() => {
    let data = location.state;
    location &&
      location.state &&
      location.state.id &&
      dispatch(getBranchById(requestGenerator(data)));
    dispatch(clearBranchInfo());
  }, [dispatch]);

  const handleEditReset = () => {
    setValue(ADDRESS_ONE, "");
    setValue(ADDRESS_TWO, "");
    setValue(STATE, "");
    setValue(CITY, "");
    setValue(COUNTRY, "");
    setValue(ZIPCODE, "");
  };

  const handleReset = () => {
    setValue(BRANCH_NAME, "");
    setValue(BRANCH_INITIALS, "");
    setValue(DEFAULT_SEQUENCE_NO, "");
    setValue(ADDRESS_ONE, "");
    setValue(ADDRESS_TWO, "");
    setValue(STATE, "");
    setValue(CITY, "");
    setValue(COUNTRY, "");
    setValue(ZIPCODE, "");
  };

  const values = branchInfo;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IManageBranch>({
    defaultValues: {
      name: branchInfo?.name,
      initials: branchInfo?.initials,
      emr_sequence: branchInfo?.default_sequence,
      // address_line_1: add?.address_line_1,
      // address_line_2: add?.address_line_2,
      // city: add?.city,
      // country: add?.country,
      // state: add?.state,
      // zipcode: add?.zipcode,
    },
    values,
  });

  useEffect(() => {
    if (branchInfo?.default_sequence) {
      setValue(DEFAULT_SEQUENCE_NO, branchInfo?.default_sequence);
    }
  }, [branchInfo?.default_sequence]);
  const onSubmit: SubmitHandler<IManageBranch> = (data: any) => {
    data.emr_sequence = parseInt(data.emr_sequence);
    console.log(data, "data");
    let isDefault = false;
    // setValue("isDefault", isDefault);
    data.isDfault = isDefault;
    // console.log(">>>>", data);
    if (location && location.state && location.state.id) {
      let id = location.state.id;
      let address_id = branchInfo?.address_id?._id;
      data.address_id = address_id;
      dispatch(editBranch(requestGenerator({ id, data }))).then((e) => {
        if (e.type === `${EDIT_BRANCH}/fulfilled`) {
          navigate("/medicalcenter/branch");
          dispatch(clearBranchInfo());
        }
      });
    } else {
      dispatch(addBranch(requestGenerator(data))).then((e) => {
        // console.log("e>>", e);
        if (e.type === `${ADD_BRANCH}/fulfilled`) {
          navigate("/medicalcenter/branch");
          dispatch(clearBranchInfo());
        }
      });
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Branch Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={
                    branchInfo?.emr_sequence !== undefined
                      ? styles.inputDisable
                      : styles.inputField
                  }
                  placeholder="Enter Branch Name"
                  {...register(BRANCH_NAME, branchValidators[BRANCH_NAME])}
                  onChange={(e) => trimValue(e)}
                  disabled={branchInfo?.name !== undefined ? true : false}
                />
                {errors[BRANCH_NAME] && (
                  <p className="errorText">{errors[BRANCH_NAME].message}</p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Branch Initials <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={
                    branchInfo?.emr_sequence !== undefined
                      ? styles.inputDisable
                      : styles.inputField
                  }
                  placeholder="Enter Branch Initials"
                  {...register(
                    BRANCH_INITIALS,
                    branchValidators[BRANCH_INITIALS]
                  )}
                  onChange={(e) => trimValue(e)}
                  disabled={branchInfo?.initials !== undefined ? true : false}
                  maxLength={2}
                />
                {errors[BRANCH_INITIALS] && (
                  <p className="errorText">{errors[BRANCH_INITIALS].message}</p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Branch Sequence No.<span className="asterick">*</span>
              </label>

              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  value={maxvalue}
                  placeholder="Branch Sequence No."
                  className={
                    branchInfo?.emr_sequence !== undefined
                      ? styles.inputDisable
                      : styles.inputField
                  }
                  {...register(
                    DEFAULT_SEQUENCE_NO,
                    branchValidators[DEFAULT_SEQUENCE_NO]
                  )}
                  onChange={(e) => customInputValue(e)}
                  disabled={
                    branchInfo?.emr_sequence !== undefined ? true : false
                  }
                />
                {errors[DEFAULT_SEQUENCE_NO] && (
                  <p className="errorText">
                    {errors[DEFAULT_SEQUENCE_NO].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Address Line 1</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className={styles.inputField}
                  defaultValue={branchInfo?.address_id?.address_line_1}
                  {...register(ADDRESS_ONE)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[ADDRESS_ONE] && (
                  <p className="errorText">
                    {errors[ADDRESS_ONE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Address Line 2</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className={styles.inputField}
                  defaultValue={branchInfo?.address_id?.address_line_2}
                  {...register(ADDRESS_TWO)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[ADDRESS_TWO] && (
                  <p className="errorText">
                    {errors[ADDRESS_TWO].message as any}
                  </p>
                )}{" "}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>State</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter State"
                  defaultValue={branchInfo?.address_id?.state}
                  {...register(STATE)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[STATE] && (
                  <p className="errorText">{errors[STATE].message}</p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>City</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Enter City"
                  className={styles.inputField}
                  defaultValue={branchInfo?.address_id?.city}
                  {...register(CITY)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[CITY] && (
                  <p className="errorText">{errors[CITY].message}</p>
                )}{" "}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Country</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Country"
                  defaultValue={branchInfo?.address_id?.country}
                  {...register(COUNTRY)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[COUNTRY] && (
                  <p className="errorText">{errors[COUNTRY].message}</p>
                )}{" "}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Zip Code</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter Zip Code"
                  defaultValue={branchInfo?.address_id?.zipcode}
                  {...register(ZIPCODE)}
                  onChange={(e) => trimValue(e)}
                />
                {errors[ZIPCODE] && (
                  <p className="errorText">{errors[ZIPCODE].message as any}</p>
                )}{" "}
              </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="button"
              customClass={styles.backBtn}
              handleClick={() => {
                if (branchInfo?._id === undefined) {
                  // dispatch(clearBranchInfo());
                  handleReset();
                } else {
                  handleEditReset();
                }
              }}
            />
            <Button
              title="Back"
              customClass={styles.backBtn}
              type="button"
              handleClick={() => {
                navigate("/medicalcenter/branch");
                dispatch(clearBranchInfo());
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageBranch;
