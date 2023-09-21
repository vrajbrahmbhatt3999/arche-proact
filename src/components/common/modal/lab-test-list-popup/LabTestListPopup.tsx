import { FC, useEffect, useState } from 'react'
import styles from "./labTestListPopup.module.scss"
import Pagination from '../../pagination/Pagination';
import TableV2 from '../../table/tableV2/TableV2';
import { createTestProfileHeaderData } from '../../../../constants/table-data/createTestProfilePopupData';
import { CloseIcon, SearchButton } from '../../svg-components';
import { trimValue } from '../../../../utils/utils';
import { getAllLabTest } from '../../../../redux/features/lab/labAsyncActions';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import { updateNewProfileData, updateTestData } from '../../../../redux/features/lab/labSlice';
import Divider from '../../divider/Divider';
import { colors } from '../../../../constants/color';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Button from '../../button/Button';

interface ILabTestListPopup {
    handleClose?: any
    setModelOpenClose?: any
}


const LabTestListPopup: FC<ILabTestListPopup> = ({ handleClose, setModelOpenClose }) => {

    const dispatch = useAppDispatch();
    const { labTestData, profileData, newTestData, updatedProfileData } = useAppSelector((state) => state.lab);
    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [searchTest, setSearchTest] = useState("");
    const [arrData, setArrData] = useState<any>([])
    const [testData, setTestData] = useState<any>([])
    const [state, setstate] = useState([])

    let labtest_ids = profileData?.labtest_ids

    let filterData = labTestData?.filter((item: any) => {
        return !updatedProfileData?.some((item2: any) => item?._id === item2?._id);
    });

    useEffect(() => {
        const newState = newTestData;
        if (newState.flag) {
            setArrData((prevTableData: any) => [...prevTableData, newTestData.id])
            setTestData((prevTableData: any) => [...prevTableData, newTestData.testInfo])
        } else {
            var oldData = arrData?.filter((item: any) => item !== newTestData.id);
            setArrData(oldData)
        }
    }, [newTestData])



    useEffect(() => {
        let arr = [] as any
        let filterData = testData?.map((item: any) => {
            arrData?.map((id: any) => {
                if (item?._id === id) {
                    if (arr?.some((item2: any) => item?._id === item2?._id)) {
                        console.log("true")
                    }
                    else {
                        arr.push(item)
                    }
                }
            })
        });
        setstate(arr)
    }, [arrData])

    let newState = state?.map((item: any) => {
        return { ...item, is_active: false }
    })

    const pageIndexArray = () => {
        let pageIndexOptions = [];
        for (let i = 1; i <= totalPage; i++) {
            pageIndexOptions.push(i);
        }
        return pageIndexOptions;
    };
    const pageIndexOptions = pageIndexArray();


    useEffect(() => {
        let requestData = {
            search: searchTest,
            page: pageIndex,
            pageSize: dataPerPage,
            order_by: { name: 1 },
        };
        dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
            const updatedArray = result.payload?.data?.map((object: any) => {
                if (arrData.includes(object._id)) {
                    return {
                        ...object,
                        is_active: false
                    };
                }
                return object;
            });
            dispatch(updateTestData(updatedArray))
        });
    }, [pageIndex, dataPerPage])


    const handleSearch = () => {
        let requestData = {
            search: searchTest,
            page: 1,
            pageSize: 10,
            order_by: { name: 1 },
        };
        setPageIndex(1)
        dispatch(getAllLabTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
            const updatedArray = result.payload?.data?.map((object: any) => {
                if (arrData.includes(object._id)) {
                    return {
                        ...object,
                        is_active: false
                    };
                }
                return object;
            });
            dispatch(updateTestData(updatedArray))
        });
    };


    const handleSubmit = () => {
        dispatch(updateNewProfileData(newState))
        setModelOpenClose(false);
        setstate([])
    }

    return (
        <div
            className={styles.notesPopupContainer}
            onClick={(e) => e.stopPropagation()}
        >
            <CloseIcon
                customClass={styles.closeIconStyle}
                fillColor={colors.green1}
                handleClick={() => handleClose()}
            />
            <div className={styles.notesContainer}>
                <p className={styles.title}>
                    Lab Test List
                </p>
                <Divider customClass={styles.dividerStyle} />
                <div className={styles.inputFieldContainer}>
                    <input
                        type="text"
                        className={styles.inputSearchContainer}
                        placeholder="Search by test name"
                        value={searchTest}
                        onChange={(e) => {
                            trimValue(e);
                            setSearchTest(e.target.value);
                            if (e.target.value === "") {
                                let requestData = {
                                    search: "",
                                    page: pageIndex,
                                    pageSize: dataPerPage,
                                    order_by: { name: 1 },
                                };
                                dispatch(getAllLabTest(requestGenerator(requestData))).then(
                                    (result) => {
                                        setTotalPage(result.payload.lastPage);
                                        const updatedArray = result.payload?.data?.map((object: any) => {
                                            if (arrData.includes(object._id)) {
                                                return {
                                                    ...object,
                                                    is_active: false
                                                };
                                            }
                                            return object;
                                        });
                                        dispatch(updateTestData(updatedArray))
                                    }
                                );
                            }
                        }}
                    />
                    <SearchButton
                        handleClick={() => handleSearch()}
                        customClass={styles.inputSearchButton}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <TableV2
                        tableHeaderData={createTestProfileHeaderData}
                        tableRowData={filterData}
                        active={false}
                    />
                </div>
                <div className={styles.pagination}>
                    {labTestData?.length !== 0 &&
                        <Pagination
                            setDataPerPage={setDataPerPage}
                            pageIndexOptions={pageIndexOptions}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                        />}
                </div>
                <div className={styles.btnContainer}>
                    <Button title="Submit" handleClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}

export default LabTestListPopup
