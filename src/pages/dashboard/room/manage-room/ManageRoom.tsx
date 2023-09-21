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
import {
  addRooms,
  editRoom,
  getRoomById,
} from "../../../../redux/features/room/roomAsyncActions";
import styles from "./manageRoom.module.scss";
import { getAllWard } from "../../../../redux/features/ward/wardAsyncActions";

const ManageRoom: FC = () => {
  const navigate = useNavigate();
  const { isLoading, roomInfo } = useAppSelector((state) => state.room);
  const { wardData } = useAppSelector((state) => state.ward);
  const checkWardInfoLength = roomInfo?.hasOwnProperty?.("room_name");
  const dispatch = useAppDispatch();
  const location = useLocation().state;

  useEffect(() => {
    let data = {
      search: "",
      page: 0,
      pageSize: 100,
      order_by: { name: 1 },
    };
    dispatch(getAllWard(requestGenerator(data)));
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
        ward_id: watchDepartnment?.value,
        room_name: data?.roomName,
        notes: data?.notes,
      };
      dispatch(addRooms(requestGenerator(responseData))).then((result) => {
        if (result.type === "room/addRooms/fulfilled") {
          reset();
          setValue("department", "");
          navigate("/medicalcenter/room");
        }
      });
    } else {
      let responseData = {
        id: location?.id,
        data: {
          ward_id: data?.department?.value,
          room_name: data?.roomName,
          notes: data?.notes,
        },
      };
      dispatch(editRoom(requestGenerator(responseData))).then((result) => {
        if (result.type === "room/editRoom/fulfilled") {
          navigate("/medicalcenter/room");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getRoomById(requestGenerator({ id: location?.id })));
  }, [checkWardInfoLength, dispatch, location?.id]);

  useEffect(() => {
    if (roomInfo?.hasOwnProperty?.("room_name")) {
      setValue("roomName", roomInfo?.room_name);
      setValue("notes", roomInfo?.notes);
      setValue("department", {
        label: roomInfo?.ward_id?.ward_name,
        value: roomInfo?.ward_id?._id,
      });
    } else {
      setValue("roomName", "");
      setValue("notes", "");
      setValue("department", null);
    }
  }, [setValue, roomInfo]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.dropDownField}>
              <label className={styles.labelWrapper}>
                Select Ward
                <span className={styles.requiredField}>*</span>
              </label>
              <div className={styles.errorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Select Ward"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watchDepartnment}
                  components={{ DropdownIndicator }}
                  {...register("department", { required: true })}
                  options={wardData?.map((item: any) => ({
                    label: item?.ward_name,
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
                labelText="Room name"
                requiredField={true}
                {...register("roomName", { required: true })}
                showErrors={errors?.roomName?.type === "required"}
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
                navigate("/medicalcenter/room");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageRoom;
