import React, { FC, useState, useEffect } from "react";
import styles from "./taggedPatientModal.module.scss";
import { colors } from "../../../constants/color";
import Loader from "../spinner/Loader";
import { CloseIcon, SearchButton } from "../svg-components";
import Divider from "../divider/Divider";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TableV2 from "../table/tableV2/TableV2";
import { taggedPatientPopupHeaderData } from "../../../constants/table-data/taggedPatientPopupData";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getTaggedPatientList } from "../../../redux/features/diagnosis/diagnosisAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getDiagnosisAllTags } from "../../../redux/features/doctor-diagnosis/doctorDiagnosisAsyncActions";
import Pagination from "../pagination/Pagination";

interface ITaggedPatient {
  handleOpen?: any;
}

const TaggedPatientModal: FC<ITaggedPatient> = ({ handleOpen }) => {
  const animatedComponent = makeAnimated();
  const dispatch = useAppDispatch();
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState([]);
  const { isLoading, taggedPatientListData, taggedPatientListDataObject } =
    useAppSelector((state) => state.diagnosis);
  const { allTagDataList } = useAppSelector((state) => state.doctorDiagnosis);
  console.log("allTagDataList>>>>>>>", allTagDataList);
  console.log("taggedPatientListData????????", taggedPatientListData);

  // pagination function
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    dispatch(getDiagnosisAllTags(requestGenerator({})));
  }, [dispatch]);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };
  let data: any = selectedOption?.map((item: any) => {
    return item?.label;
  });

  console.log("data", data);

  const handleInputSearch = () => {
    let reqPayload = {
      symptoms: data,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getTaggedPatientList(requestGenerator(reqPayload))).then(
      (result) => {
        setTotalPage(result.payload.lastPage);
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div
          className={styles.taggedPatientContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className={styles.title}>Tagged Patients</p>
          <Divider customClass={styles.dividerStyle} />

          <div className={styles.filterComponentContainer}>
            <span className={styles.filterContainer}>
              <p className={styles.tagTextStyle}>Tags</p>
              <Select
                className={styles.selectInputField}
                isMulti={true}
                options={allTagDataList?.map((item: any) => ({
                  label: item?.tag_name,
                  value: Object.values(item)[0],
                }))}
                components={animatedComponent}
                closeMenuOnSelect={false}
                placeholder="Select symptoms"
                value={selectedOption}
                onChange={handleChange}
                maxMenuHeight={200}
              />

              <SearchButton
                handleClick={() => {
                  if (data?.length > 0) {
                    handleInputSearch();
                  }
                }}
                customClass={styles.inputSearchButton}
              />
            </span>

            <div className={styles.tableContainer}>
              <TableV2
                tableHeaderData={taggedPatientPopupHeaderData}
                tableRowData={taggedPatientListData}
                handleClick={handleOpen}
                active={false}
              />
            </div>
            {taggedPatientListData?.length < 9 &&
            taggedPatientListDataObject?.lastPage === 1 &&
            taggedPatientListDataObject?.nextPage === 0 &&
            taggedPatientListDataObject?.previousPage === 0 ? (
              " "
            ) : (
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaggedPatientModal;
