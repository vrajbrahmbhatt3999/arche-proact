import { FC, useState, useEffect } from 'react'
import styles from "./radiologyTestListPopup.module.scss"
import Button from '../../button/Button'
import Pagination from '../../pagination/Pagination'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { CloseIcon, SearchButton } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { trimValue } from '../../../../utils/utils'
import TableV2 from '../../table/tableV2/TableV2'
import { getAllRadiologyTest } from '../../../../redux/features/radiology/radiologyAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { updateNewRadiologyProfileData, updateRadiologyTestData } from '../../../../redux/features/radiology/radiologySlice'
import { radiologyCreateTestProfileHeaderData } from '../../../../constants/table-data/radiologyCreateTestProfileData'

interface IRadiologyTestListPopup {
    handleClose?: any
    setModelOpenClose?: any
}

const RadiologyTestListPopup: FC<IRadiologyTestListPopup> = ({ handleClose, setModelOpenClose }) => {

    const dispatch = useAppDispatch();
    const { radiologyTestData, radiologyNewTestData, updatedRadiologyProfile } = useAppSelector((state) => state.radiology);
    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [searchTest, setSearchTest] = useState("");
    const [arrData, setArrData] = useState<any>([])
    const [testData, setTestData] = useState<any>([])
    const [state, setstate] = useState([])


    let filterData = radiologyTestData?.filter((item: any) => {
        return !updatedRadiologyProfile?.some((item2: any) => item?._id === item2?._id);
    });

    useEffect(() => {
        const newState = radiologyNewTestData;
        if (newState.flag) {
            setArrData((prevTableData: any) => [...prevTableData, radiologyNewTestData.id])
            setTestData((prevTableData: any) => [...prevTableData, radiologyNewTestData.testInfo])
        } else {
            var oldData = arrData?.filter((item: any) => item !== radiologyNewTestData.id);
            setArrData(oldData);
        }
    }, [radiologyNewTestData])



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
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
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
            dispatch(updateRadiologyTestData(updatedArray))
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
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
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
            dispatch(updateRadiologyTestData(updatedArray))
        });
    };


    const handleSubmit = () => {
        dispatch(updateNewRadiologyProfileData(newState))
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
                    Radiology Test List
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
                                dispatch(getAllRadiologyTest(requestGenerator(requestData))).then(
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
                                        dispatch(updateRadiologyTestData(updatedArray))
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
                        tableHeaderData={radiologyCreateTestProfileHeaderData}
                        tableRowData={filterData}
                        active={false}
                    />
                </div>
                <div className={styles.pagination}>
                    {radiologyTestData?.length !== 0 &&
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

export default RadiologyTestListPopup
