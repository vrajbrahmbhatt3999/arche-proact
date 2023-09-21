import { FC, useState, useEffect } from "react"
import styles from "./radiologyCreateTestProfile.module.scss"
import Button from "../../button/Button";
import { trimValue } from "../../../../utils/utils";
import Divider from "../../divider/Divider";
import Pagination from "../../pagination/Pagination";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import { Cols, ICreateTestProfile, IRadiologyCreateTestProfileForm } from "../../../../interfaces/interfaces"
import { useForm } from "react-hook-form";
import { Column, TableOptions, useGlobalFilter, useSortBy, useTable } from "react-table";
import { PACKAGE_AMOUNT, TEST_PROFILE_NAME, TOTAL_AMOUNT } from "../../../../constants/constant";
import { createTestProfileValidators } from "../../../../form-validators/createTestProfileValidators";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { createRadiologyTestProfile, editRadiologyTestProfile, getAllRadiologyTest, getAllRadiologyTestProfile } from "../../../../redux/features/radiology/radiologyAsyncActions";
import TableV2 from "../../table/tableV2/TableV2";
import TableV3 from "../../table/tableV3/TableV3";
import { radiologyCreateTestProfileHeaderData } from "../../../../constants/table-data/radiologyCreateTestProfileData";
import { failure, success } from "../../../../constants/data";
import { setMessage } from "../../../../redux/features/toast/toastSlice";
import { clearRadiologyProfileData, updateRadiologyTestData } from "../../../../redux/features/radiology/radiologySlice";



interface IRadiologyCreateTestProfile {
    handleClose?: any
    handleOpen?: any;
    handleRowClick?: any;
    setModelOpenClose?: any;
    handleChildClick?: any;
}

const RadiologyCreateTestProfile: FC<IRadiologyCreateTestProfile> = ({ handleClose, handleOpen, handleRowClick, setModelOpenClose, handleChildClick }) => {

    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [searchTest, setSearchTest] = useState("");
    const { radiologyTestData, radiologyProfile, updatedRadiologyProfile, radiologyNewTestData } = useAppSelector((state) => state.radiology)
    const dispatch = useAppDispatch()
    const [arrData, setArrData] = useState<any>([])
    const [priceArr, setPriceArr] = useState<any>([])
    const [arrInfo, setArrInfo] = useState<any>([])


    const pageIndexArray = () => {
        let pageIndexOptions = [];
        for (let i = 1; i <= totalPage; i++) {
            pageIndexOptions.push(i);
        }
        return pageIndexOptions;
    };
    const pageIndexOptions = pageIndexArray();


    useEffect(() => {
        const newState = radiologyNewTestData;

        if (newState.flag) {
            setArrData((prevTableData: any) => [...prevTableData, radiologyNewTestData.id])
            setPriceArr((prevTableData: any) => [...prevTableData, radiologyNewTestData.price])
            setArrInfo((prevTableData: any) => [...prevTableData, radiologyNewTestData.testInfo])
        } else {
            var oldData = arrData.filter((item: any) => item !== radiologyNewTestData.id);
            var oldPrice = priceArr.filter((item: any) => item !== radiologyNewTestData.price);
            var oldInfo = arrInfo.filter((item: any) => item?._id !== radiologyNewTestData.testInfo?._id);
            setArrData(oldData)
            setPriceArr(oldPrice)
            setArrInfo(oldInfo)
        }
    }, [radiologyNewTestData])




    useEffect(() => {
        if (radiologyProfile?._id === undefined) {
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
        }
    }, [pageIndex, dataPerPage]);

    useEffect(() => {
        if (searchTest === "" && pageIndex === 1 && dataPerPage === 10) {
            setArrData([])
            setPriceArr([])
        }
    }, [])



    const data: Cols[] = updatedRadiologyProfile
    const columns: Column<Cols>[] = radiologyCreateTestProfileHeaderData;
    const options: TableOptions<Cols> = {
        data,
        columns,
    };

    const {
        state,
        // @ts-ignore
        setGlobalFilter,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(options, useGlobalFilter, useSortBy);
    // @ts-ignoreglobalFilter
    const { globalFilter } = state;

    const values = radiologyProfile;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<IRadiologyCreateTestProfileForm>({
        defaultValues: {
            name: radiologyProfile?.name,
            package_amount: radiologyProfile?.package_amount,
            total_amount: radiologyProfile?.total_amount
        }, values,
    });



    const handleKeyDown = (e: any) => {
        if (e.target.value.length >= 7 && e.key !== "Backspace") {
            e.preventDefault();
        }
    };

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

    let arrayData = [] as any;
    radiologyTestData?.map((item: any) => {
        if (item?.is_active === false) {
            arrayData.push(item);
        }
    });



    let totalSellPrice = 0;

    // priceArr?.forEach((item: any) => {
    //     totalSellPrice += item;
    // });

    arrInfo?.forEach((item: any) => {
        totalSellPrice += item?.sell_price;
    });

    let arrayDataNew = [] as any;
    updatedRadiologyProfile?.map((item: any) => {
        if (item?.is_active === false) {
            arrayDataNew.push(item);
        }
    });

    let newPrice = 0;

    arrayDataNew.forEach((item: any) => {
        newPrice += item.sell_price;
    })


    let newSellPrice = 0;

    radiologyProfile?.radiologytest_ids?.forEach((item: any) => {
        newSellPrice += item.sell_price;
    });


    let radiologytest_ids = arrayData.map((item: any) => {
        return item._id;
    });

    let updated_radiologytest_ids = arrayDataNew.map((item: any) => {
        return item._id;
    });


    const onSubmit = async (data: IRadiologyCreateTestProfileForm) => {
        data.total_amount = totalSellPrice
        console.log("first", data)
        if (radiologyProfile?._id !== undefined) {
            data.radiologytest_ids = updated_radiologytest_ids;
            data.total_amount = newPrice
            data.total_amount = Number(data.total_amount)
            data.package_amount = Number(data.package_amount)
            let reqData = {
                id: radiologyProfile?._id,
                data: data,
            };
            if (updated_radiologytest_ids?.length === 0) {
                let toastData = {
                    message: "Please select at least one test",
                    type: failure,
                };
                dispatch(setMessage(toastData));
            }
            else {
                if (data.total_amount >= data.package_amount) {
                    dispatch(editRadiologyTestProfile(requestGenerator(reqData))).then((e) => {
                        console.log("e", e);
                        if (e.type === "radiology/editRadiologyTestProfile/fulfilled") {
                            // setTimeout(() => {
                            setModelOpenClose(false);
                            // }, 2000);
                            dispatch(clearRadiologyProfileData())
                            dispatch(getAllRadiologyTestProfile(requestGenerator({})));
                        }
                    })
                }
                else {
                    let toastData = {
                        message: "Package amount should be less than or equal to total amount",
                        type: failure,
                    };
                    dispatch(setMessage(toastData));
                }
            }
        } else {
            if (arrData?.length === 0) {
                let toastData = {
                    message: "Please select at least one test",
                    type: failure,
                };
                dispatch(setMessage(toastData));
            } else {
                console.log("first");
                data.total_amount = totalSellPrice
                data.total_amount = Number(data.total_amount)
                data.package_amount = Number(data.package_amount)
                data.radiologytest_ids = arrData;
                if (data.total_amount >= data.package_amount) {
                    dispatch(createRadiologyTestProfile(requestGenerator(data))).then((e) => {
                        console.log("e", e);
                        if (e.type === "radiology/createRadiologyTestProfile/fulfilled") {
                            // setTimeout(() => {
                            setModelOpenClose(false);
                            // }, 2000);
                        }
                    });
                }
                else {
                    let toastData = {
                        message: "Package amount should be less than or equal to total amount",
                        type: failure,
                    };
                    dispatch(setMessage(toastData));
                }
            }
        }
    }

    useEffect(() => {
        return () => {
            setValue(PACKAGE_AMOUNT, "")
        }
    }, [newPrice, totalSellPrice])


    return (
        <>
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
                        {radiologyProfile?._id === undefined ? "Create" : "Edit"} Test Profile
                    </p>
                    <Divider customClass={styles.dividerStyle} />
                    <div className={styles.inputFieldContainer}>
                        {radiologyProfile?._id === undefined ?
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
                            :
                            <>
                                <input
                                    type="text"
                                    className={styles.inputSearchContainer}
                                    placeholder="Search by test name"
                                    onChange={(e) => {
                                        trimValue(e);
                                        setGlobalFilter(e.target.value);
                                    }}
                                    style={{ border: "1px solid grey" }}
                                    value={globalFilter}
                                />
                                <Button title="Add Test" customClass={styles.addTestBtn} handleClick={handleChildClick} />
                            </>}
                        {radiologyProfile?._id === undefined &&
                            <SearchButton
                                handleClick={() => handleSearch()}
                                customClass={styles.inputSearchButton}
                            />
                        }
                    </div>
                    <div className={styles.mainContainer}>
                        <div className={styles.tableContainer}>
                            {
                                radiologyProfile?._id === undefined ?
                                    <TableV2
                                        tableHeaderData={radiologyCreateTestProfileHeaderData}
                                        tableRowData={radiologyTestData}
                                        active={false}
                                    />
                                    :
                                    <TableV3
                                        getTableProps={getTableProps}
                                        getTableBodyProps={getTableBodyProps}
                                        headerGroups={headerGroups}
                                        rows={rows}
                                        prepareRow={prepareRow}
                                        handleOpen={handleOpen}
                                        handleRowClick={handleRowClick}
                                    />}
                        </div>
                        {radiologyProfile?._id === undefined && radiologyTestData?.length !== 0 &&
                            <Pagination
                                setDataPerPage={setDataPerPage}
                                pageIndexOptions={pageIndexOptions}
                                pageIndex={pageIndex}
                                setPageIndex={setPageIndex}
                            />
                        }
                        <Divider customClass={styles.greyDivider} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.fieldContainer}>
                                <div className={styles.labelField}>
                                    <label className={styles.labelText}>Total Amount</label>
                                    <input
                                        type="text"
                                        className={styles.inputStyleDisable}
                                        value={
                                            radiologyProfile?._id === undefined
                                                ? totalSellPrice
                                                : newPrice
                                        }
                                        {...register(TOTAL_AMOUNT)}
                                        disabled={true}
                                    />
                                </div>
                                <div className={styles.labelField}>
                                    <label className={styles.labelText}>Package Amount<span className="asterick">*</span></label>
                                    <div>
                                        <input
                                            type="text"
                                            className={styles.inputStyle}
                                            {...register(
                                                PACKAGE_AMOUNT,
                                                createTestProfileValidators[PACKAGE_AMOUNT]
                                            )}
                                            onChange={(e) => { trimValue(e); }}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {errors[PACKAGE_AMOUNT] && (
                                            <p className="errorText" style={{ marginLeft: "10px" }}>
                                                {errors[PACKAGE_AMOUNT].message as any}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.labelField}>
                                <label className={styles.labelText}>Test Profile Name<span className="asterick">*</span></label>
                                <div>
                                    <input
                                        type="text"
                                        className={styles.inputStyle}
                                        {...register(
                                            TEST_PROFILE_NAME,
                                            createTestProfileValidators[TEST_PROFILE_NAME]
                                        )}
                                        onChange={(e) => trimValue(e)}
                                    />
                                    {errors[TEST_PROFILE_NAME] && (
                                        <p className="errorText" style={{ marginLeft: "10px" }}>
                                            {errors[TEST_PROFILE_NAME].message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.btnStyle}>
                                <Button title="Save" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadiologyCreateTestProfile
