import React, { useEffect } from "react";
import styles from "./DoctorList.module.scss";
import {
  RatingStarIcon,
} from "../../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllDoctorList } from "../../../redux/features/receptionist/receptionistAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import moment from "moment";
import Loader from "../../../components/common/spinner/Loader";

interface IDoctorList {}

const DoctorList: React.FunctionComponent<IDoctorList> = () => {
  const dispatch = useAppDispatch();
  const { loading, doctorListData } = useAppSelector(
    (state) => state.receptionist
  );
  useEffect(() => {
    dispatch(getAllDoctorList(requestGenerator({})));
  }, [dispatch]);
  // covert utc format to time
  const handleLoginTime = (timestamp: any) => {
    const time = moment(timestamp).utcOffset(0, true).format("h:mm A");
    return time;
  };
  return (
    <>
      {loading && <Loader />}
      <div className={styles.doctorMainContainer}>
        <p className={styles.doctortitle}>Doctors</p>
        <div className={styles.doctorContainer}>
          {doctorListData.length > 0 ? (
            doctorListData?.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.container}>
                    {/* <div className={styles.activeDocContainer}>
                      {item?.is_active === true ? (
                        <OnlineDoctorIcon />
                      ) : (
                        <OfflineDoctorIcon />
                      )}
                    </div> */}
                    <div className={styles.imageContainer}>
                      <img
                        src={item?.profile_pic}
                        style={{
                          width: "100%",
                          height: " 82px",
                          borderRadius: "10px",
                        }}
                        alt=""
                      />
                    </div>
                    <div className={styles.doctorDetailsContainer}>
                      <div className={styles.ratingStyle}>
                        <span>
                          <RatingStarIcon />
                        </span>
                        <p className={styles.ratingTextStyle}>
                          {item?.avg_rating}
                        </p>
                      </div>
                      <p className={styles.doctorNameStyle}>
                        {item?.doctor_name}
                      </p>
                      <p className={styles.loginTimeStyle}>
                        <span className={styles.loginTextStyle}>
                          Login Time -
                        </span>
                        <span
                          style={{
                            fontWeight: "600",
                            fontSize: "12px",
                            paddingLeft: "5px",
                          }}
                        >
                           {item?.last_login ? handleLoginTime(item?.last_login) : "NA"}
                        </span>
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <p className={styles.noRecordTextStyle}>No doctor found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
