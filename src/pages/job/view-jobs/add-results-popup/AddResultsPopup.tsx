import { FC, useEffect } from "react";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsPopup.module.scss";
import Button from "../../../../components/common/button/Button";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  resetResultQuantity,
  setShowAddResultPopup,
} from "../../../../redux/features/jobs/jobsSlice";
import {
  GetAllAddResultData,
  UpdateAllAddResultData,
} from "../../../../redux/features/jobs/jobsAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useForm, FormProvider } from "react-hook-form";
import Loader from "../../../../components/common/spinner/Loader";
interface IPropsData {
  handleClose?: () => void;
  popData?: any;
  headerData?: any;
  handleOpen?: any;
  setDeleteFlag?: boolean;
}
const AddResultsPopup: FC<IPropsData> = ({
  handleClose,
  popData,
  headerData,
  handleOpen,
  setDeleteFlag = true,
}) => {

  const { getAllAddResultData, isLoading } = useAppSelector(
    (state) => state.labsJob
  );

  const filterData = popData?.profile.map((item: any) => item.tests);
  const flatFilterdData = filterData?.flat();

  const getTestProfileWithComponent = popData?.profile.map((s: any) => {
    const data = s.tests?.map((x: any) => {
      const FilterComonent: any = getAllAddResultData?.filter(
        (item: any) => item._id === x.test_component_id
      );
      return {
        profile_name: s.profile_name ?? "-",
        ...x,
        components: FilterComonent?.[0]?.components,
      };
    });
    return data;
  });

  const flatNestedTestData = getTestProfileWithComponent?.flat();
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetResultQuantity(0));
  };
  const methods = useForm();
  const onSubmit = (item: any) => {
    const reqPayload = {
      testJobComponentList: flatNestedTestData?.map((itemKey: any) => {
        return {
          _id: itemKey?.test_component_id,
          components: itemKey?.components?.map((e: any) => {
            return {
              ...e,
              result: item?.[`${e?._id}_${itemKey._id}`] ?? '',
            };
          }),
        };
      }),
    };
    dispatch(UpdateAllAddResultData(requestGenerator(reqPayload))).then(
      (e: any) => {
        if (e.type === "JOB/UpdateAllAddResultData/fulfilled") {
          let reqPayload = {
            testIds: flatFilterdData?.map((x: any) => x.test_component_id),
          };
          dispatch(GetAllAddResultData(requestGenerator(reqPayload)));
          dispatch(setShowAddResultPopup(false));
        }
      }
    );
  };

  useEffect(() => {
    let reqPayload = {
      testIds: flatFilterdData?.map((x: any) => x.test_component_id),
    };
    dispatch(GetAllAddResultData(requestGenerator(reqPayload)));
  }, [dispatch]);
  return (
    <>
     {isLoading && <Loader />}
      <div
        className={styles.addResultsPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <FormProvider {...methods}>
          <form
            className={styles.addResultsContainer}
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
          >
            <p className={styles.resultsTitle}>
              Job ID <span className={styles.resultsId}>{popData?.job_no}</span>
            </p>

            <div className={styles.tableContainer}>
              <TableV2
                tableHeaderData={headerData}
                tableRowData={flatNestedTestData}
                active={false}
                handleClick={popData}
                handleRowClick={handleOpen}
              />
            </div>
            {setDeleteFlag && (
              <div className={styles.buttonContainer}>
                <Button
                  title="Submit"
                  type="submit"
                  customClass={styles.submitBtn}
                />
                <Button
                  title="Reset"
                  type="reset"
                  customClass={styles.resetBtn}
                  handleClick={handleReset}
                />
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddResultsPopup;
