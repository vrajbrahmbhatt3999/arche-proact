import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../../../../components/common/button/Button";
import Select from "react-select";
import { DropdownIndicator } from "../../../../components/common/dropdown-indicator/DropdownIndicator";
import { Input } from "../../../../components/common/input/input";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useLocation } from "react-router-dom";
import Loader from "../../../../components/common/spinner/Loader";
import { getAllroom } from "../../../../redux/features/room/roomAsyncActions";
import styles from "./manageBed.module.scss";
import {
  addBeds,
  editBed,
  getBedById,
} from "../../../../redux/features/bed/bedAsyncActions";

const ManageBed: FC = () => {
  const navigate = useNavigate();
  const { isLoading, bedInfo } = useAppSelector((state) => state.bed);
  const { roomData } = useAppSelector((state) => state.room);
  console.log(bedInfo, "bedInfo");
  const checkWardInfoLength = bedInfo?.hasOwnProperty?.("bed_name");
  const dispatch = useAppDispatch();
  const location = useLocation().state;

  useEffect(() => {
    let data = {
      search: "",
      page: 0,
      pageSize: 100,
      order_by: { name: 1 },
    };
    dispatch(getAllroom(requestGenerator(data)));
  }, [dispatch]);

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
        room_id: watchDepartnment?.value,
        bed_name: data?.bedName,
        notes: data?.notes,
        cost_price: data?.costPrice,
        sell_price: Number(data?.sellPrice)
      };
      dispatch(addBeds(requestGenerator(responseData))).then((result) => {
        if (result.type === "room/addBeds/fulfilled") {
          reset();
          setValue("department", "");
          navigate("/medicalcenter/bed");
        }
      });
    } else {
      let responseData = {
        id: location?.id,
        data: {
          room_id: data?.department?.value,
          bed_name: data?.bedName,
          notes: data?.notes,
          cost_price: data?.costPrice,
          sell_price: Number(data?.sellPrice)
        },
      };
      dispatch(editBed(requestGenerator(responseData))).then((result) => {
        if (result.type === "room/editBed/fulfilled") {
          navigate("/medicalcenter/bed");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getBedById(requestGenerator({ id: location?.id })));
  }, [checkWardInfoLength, dispatch, location?.id]);

  useEffect(() => {
    if (bedInfo?.hasOwnProperty?.("bed_name")) {
      setValue("bedName", bedInfo?.bed_name);
      setValue("notes", bedInfo?.notes);
      setValue("department", {
        label: bedInfo?.room_id?.room_name,
        value: bedInfo?.room_id?._id,
      });
      setValue('costPrice', bedInfo?.cost_price)
      setValue('sellPrice', bedInfo?.sell_price)

    } else {
      setValue("bedName", "");
      setValue("notes", "");
      setValue("department", null);
      setValue('costPrice', '');
      setValue('sellPrice', '')
    }
  }, [setValue, bedInfo]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.dropDownField}>
              <label className={styles.labelWrapper}>
                Select Room
                <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.errorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Select Room"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watchDepartnment}
                  components={{ DropdownIndicator }}
                  {...register("department", { required: true })}
                  options={roomData?.map((item: any) => ({
                    label: item?.room_name,
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
                labelText="Bed name"
                requiredField={true}
                {...register("bedName", { required: true })}
                showErrors={errors?.bedName?.type === "required"}
                errorMessage="This field is mandatory"
              />
            </div>
            <div style={{ flexBasis: "50%", marginBlock: "10px" }}>
              <Input
                requiredField={true}
                labelText="Cost Price"
                {...register("costPrice", { required: true })}
                showErrors={errors?.costPrice?.type === "required"}
                errorMessage="This field is mandatory"
              />
            </div>
            <div style={{ flexBasis: "50%", marginBlock: "10px" }}>
              <Input
                requiredField={true}
                labelText="Sell Price"
                {...register("sellPrice", { required: true })}
                showErrors={errors?.sellPrice?.type === "required"}
                errorMessage="This field is mandatory"
              />
            </div>
            <div style={{ flexBasis: "50%", marginBlock: "10px" }}>
              <Input labelText="Notes" {...register("notes")} />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            {/* <Button
              title="Reset"
              type="button"
              customClass={styles.backBtn}
              handleClick={() => reset()}
            /> */}
            <Button
              title="Back"
              customClass={styles.backBtn}
              type="button"
              handleClick={() => {
                navigate("/medicalcenter/bed");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageBed;
