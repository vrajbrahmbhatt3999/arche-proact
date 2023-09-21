import React, { useEffect } from "react";
import styles from "./DentistList.module.scss";
import {
  OfflineDoctorIcon,
  OnlineDoctorIcon,
  RatingStarIcon,
} from "../../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllDentistList } from "../../../redux/features/receptionist/receptionistAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import moment from "moment";
import Loader from "../../../components/common/spinner/Loader";

interface IDentistList {}

const DentistList: React.FunctionComponent<IDentistList> = () => {
  const dispatch = useAppDispatch();
  var { loading, dentistListData } = useAppSelector(
    (state) => state.receptionist
  );
  const { branchData } = useAppSelector((state) => state.login);

  useEffect(() => {
    dispatch(getAllDentistList(requestGenerator({})));
  }, [dispatch]);
  // covert utc format to time
  const handleLoginTime = (timestamp: any) => {
    const time = moment(timestamp).utcOffset(0, true).format("h:mm A");
    return time;
  };
  return (
    <>
      {loading && <Loader />}
      <div className={styles.dentistMainContainer}>
        <p className={styles.dentisttitle}>Dentists</p>
        <div className={styles.dentistContainer}>
          {dentistListData?.length > 0 && dentistListData.filter((itm:any)=>{
              return itm.userId !== branchData._id ? true:false
            }).length > 0 ? (
            dentistListData.filter((itm:any)=>{
              return itm.userId !== branchData._id ? true:false
            }).map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.container}>
                    <div className={styles.activeDocContainer}>
                      {item?.is_active === true ? (
                        <OnlineDoctorIcon />
                      ) : (
                        <OfflineDoctorIcon />
                      )}
                    </div>
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
                    <div className={styles.dentistDetailsContainer}>
                      <div className={styles.ratingStyle}>
                        <span>
                          <RatingStarIcon />
                        </span>
                        <p className={styles.ratingTextStyle}>
                          {item?.avg_rating}
                        </p>
                      </div>
                      <p className={styles.dentistNameStyle}>
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
            <p className={styles.noRecordTextStyle}>No dentist found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DentistList;
