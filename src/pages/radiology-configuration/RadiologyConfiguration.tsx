import React, { FC, useState, useEffect } from 'react'
import styles from "./radiologyConfiguration.module.scss"
import { invoiceFormActionData } from '../../constants/data';
import Pagination from '../../components/common/pagination/Pagination';
import TableV2 from '../../components/common/table/tableV2/TableV2';
import Select from "react-select";
import Button from '../../components/common/button/Button';
import { trimValue } from '../../utils/utils';
import { InfoIcon, SearchButton } from '../../components/common/svg-components';
import { colors } from '../../constants/color';
import Popup from '../../components/common/popup/Popup';
import RadiologyCreateTest from '../../components/common/modal/radiology-create-test/RadiologyCreateTest';
import RadiologyCreateTestProfile from '../../components/common/modal/radiology-create-test-profile/RadiologyCreateTestProfile';
import RadiologyViewTestProfile from '../../components/common/modal/radiology-view-test-profile/RadiologyViewTestProfile';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { requestGenerator } from '../../utils/payloadGenerator';
import { getAllRadiologyCategory, getAllRadiologyTest, getRadiologyTest, getRadiologyTestProfile } from '../../redux/features/radiology/radiologyAsyncActions';
import Loader from '../../components/common/spinner/Loader';
import { configurationHeaderData } from '../../constants/table-data/configurationTableData';
import { radiologyConfigurationHeaderData } from '../../constants/table-data/radiologyConfigurationTableData';
import { clearRadiologyNewTestData, clearRadiologyProfileData, clearRadiologyTestData } from '../../redux/features/radiology/radiologySlice';
import TestListPopup from '../../components/common/modal/test-list-popup/TestListPopup';
import RadiologyTestListPopup from '../../components/common/modal/radiology-test-list-popup/RadiologyTestListPopup';


interface IRadiologyConfiguratio {

}
const RadiologyConfiguration: FC<IRadiologyConfiguratio> = () => {

    const [showText, setShowText] = useState(false);
    const [showTestProfile, setShowTestProfile] = useState(false);
    const [showCreateTestProfile, setShowCreateTestProfile] = useState(false);
    const [showConfigurePrice, setShowConfigurePrice] = useState(false);
    const [configurationEdit, setConfigurationEdit] = useState(false);
    const [remarks, setRemarks] = useState(false);
    const [moreDetail, setMoreDetail] = useState(false);
    const [tat, setTat] = useState(false);
    const [test, setTest] = useState(false);
    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [searchTest, setSearchTest] = useState("");
    const [showTest, setShowTest] = useState(false);
    const [testListData, setTestListData] = useState();
    const [testProfileData, setTestProfileData] = useState();
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState()
    const [selectCategory, setSelectCategory] = useState(null)
    const [showRadiologyTestList, setShowRadiologyTestList] = useState(false)
    const dispatch = useAppDispatch()
    const { isLoading, radiologyCategoryData, radiologyTestData } = useAppSelector((state) => state.radiology)


    const pageIndexArray = () => {
        let pageIndexOptions = [];
        for (let i = 1; i <= totalPage; i++) {
            pageIndexOptions.push(i);
        }
        return pageIndexOptions;
    };

    const pageIndexOptions = pageIndexArray();

    useEffect(() => {
        dispatch(getAllRadiologyCategory(requestGenerator({ pageSize: 10000 })))
    }, [])


    useEffect(() => {
        let requestData = {
            search: searchTest,
            filters: category === "" ? {} : { category_id: category },
            page: pageIndex,
            pageSize: dataPerPage,
            order_by: { name: 1 },
        };
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
        });
    }, [pageIndex, dataPerPage]);

    useEffect(() => {
        let requestData = {
            search: searchTest,
            filters: category === "" ? {} : { category_id: category },
            page: 1,
            pageSize: 10,
            order_by: { name: 1 },
        };
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
        });
    }, [category]);

    const handleAddTest = () => {
        setTest(true);
        dispatch(clearRadiologyTestData())
    }

    const handleSearch = () => {
        console.log("calll")
        let requestData = {
            search: searchTest,
            filters: category === "" ? {} : { category_id: category },
            page: 1,
            pageSize: 10,
            order_by: { name: 1 },
        };
        setPageIndex(1)
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
        });

    };

    const handleClear = () => {
        setSearchTest("")
        setSelectCategory(null)
        setCategory("")
        let requestData = {
            search: "",
            filters: {},
            page: 1,
            pageSize: 10,
            order_by: { name: 1 },
        };
        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
            setTotalPage(result.payload.lastPage);
        });
        setPageIndex(1)
    }

    const handleEdit = (row: any) => {
        setEditId(row)
        setTest(true)
    }


    useEffect(() => {
        if (editId !== undefined) {
            dispatch(getRadiologyTest(requestGenerator({ id: editId })));
        }
        return () => {
            dispatch(clearRadiologyTestData())
        }
    }, [editId])

    useEffect(() => {
        if (test === false) {
            setEditId(undefined)
        }
    }, [test])

    useEffect(() => {
        if (showCreateTestProfile === false || test === false) {
            setCategory("")
            setSearchTest("")
            setSelectCategory(null)
            dispatch(clearRadiologyNewTestData())
        }
    }, [showCreateTestProfile, test])

    useEffect(() => {
        if (showRadiologyTestList === false) {
            dispatch(clearRadiologyNewTestData())
        }
    }, [showRadiologyTestList])




    return (
        <>
            {showTestProfile && (
                <Popup
                    Children={RadiologyViewTestProfile}
                    handleClose={() => {
                        setShowTestProfile(false);
                        setTestProfileData(undefined);
                        setSearchTest("")
                        setSelectCategory(null)
                        setCategory("")
                    }}
                    handleOpen={(item: any) => {
                        setShowTest(true);
                        setTestListData(item);
                    }}
                    handleRowClick={(itemData: any) => {
                        let data = { id: itemData }
                        dispatch(getRadiologyTestProfile(requestGenerator(data)))
                        setShowCreateTestProfile(true);
                    }}
                    customClassPopup={styles.viewTestProfileStyle}
                />
            )}
            {showTest && (
                <Popup
                    Children={TestListPopup}
                    handleClose={() => setShowTest(false)}
                    popData={testListData}
                />
            )}
            {showCreateTestProfile && (
                <Popup
                    Children={RadiologyCreateTestProfile}
                    handleClose={() => {
                        setShowCreateTestProfile(false);
                        setTestProfileData(undefined);
                        dispatch(clearRadiologyProfileData());
                        setSearchTest("")
                        setSelectCategory(null)
                        setCategory("")
                        let requestData = {
                            search: "",
                            filters: {},
                            page: pageIndex,
                            pageSize: dataPerPage,
                            order_by: { name: 1 },
                        };
                        dispatch(getAllRadiologyTest(requestGenerator(requestData))).then((result) => {
                            setTotalPage(result.payload.lastPage);
                        });
                    }}
                    setModelOpenClose={setShowCreateTestProfile}
                    popData={testProfileData}
                    handleChildClick={() => {
                        setShowRadiologyTestList(true)
                    }}
                    customClassPopup={styles.viewTestProfileStyle}
                />
            )}
            {test && (
                <Popup
                    Children={RadiologyCreateTest}
                    handleClose={() => { setTest(false); }}
                    setModelOpenClose={setTest}
                />
            )}
            {showRadiologyTestList && (
                <Popup
                    Children={RadiologyTestListPopup}
                    handleClose={() => setShowRadiologyTestList(false)}
                    setModelOpenClose={setShowRadiologyTestList}
                />
            )}

            {isLoading && <Loader />}
            <div className={styles.configurationContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.searchBtnContainer}>
                        <div className={styles.dropdownContainer}>
                            <label htmlFor="category" className={styles.labelText}>
                                Category
                            </label>
                            <Select
                                className={styles.select}
                                placeholder="Select Category"
                                closeMenuOnSelect={true}
                                isSearchable={true}
                                value={selectCategory}
                                options={radiologyCategoryData?.map((item: any) => ({
                                    label: item?.name,
                                    value: item?._id,
                                }))}
                                onChange={(e: any) => {
                                    setCategory(e.value);
                                    setSelectCategory(e)
                                }}
                                maxMenuHeight={200}
                            />
                        </div>
                        <Button
                            title="Create Test Profile"
                            customClass={styles.btnStyle}
                            handleClick={() => setShowCreateTestProfile(true)}
                        />
                        <Button
                            title="View Test  Profile"
                            handleClick={() => setShowTestProfile(true)}
                        />
                    </div>
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
                                        filters: category === "" ? {} : { category_id: category },
                                        page: pageIndex,
                                        pageSize: dataPerPage,
                                        order_by: { name: 1 },
                                    };
                                    dispatch(getAllRadiologyTest(requestGenerator(requestData))).then(
                                        (result) => {
                                            setTotalPage(result.payload.lastPage);
                                        }
                                    );
                                }
                            }}
                        />
                        <SearchButton
                            handleClick={() => handleSearch()}
                            customClass={styles.inputSearchButton}
                        />
                        <div className={styles.iconStyle}>
                            <InfoIcon
                                fillColor={colors.grey2}
                                mouseEnter={() => setShowText(true)}
                                mouseLeave={() => setShowText(false)}
                            />
                            {showText && <p className={styles.infoText}>Search with test</p>}
                        </div>
                        <Button
                            title="Configure Price"
                            handleClick={() => setShowConfigurePrice(true)}
                            disable={true}
                        />
                        <Button
                            title="Reset"
                            handleClick={handleClear}
                            customClass={styles.btnStyle}
                        />
                    </div>
                    <TableV2
                        tableHeaderData={radiologyConfigurationHeaderData}
                        tableRowData={radiologyTestData}
                        handleClick={handleEdit}
                        active={false}
                    />
                    <Pagination
                        setDataPerPage={setDataPerPage}
                        pageIndexOptions={pageIndexOptions}
                        pageIndex={pageIndex}
                        setPageIndex={setPageIndex}
                    />
                </div>
                <div className={styles.mainContainerFormActionSidebar}>
                    <div className={styles.sidebarData}>
                        {invoiceFormActionData?.map((item: any, index: any) => {
                            return (
                                <React.Fragment key={index}>
                                    <div
                                        className={styles.iconStyleContainer}
                                        key={index}
                                        onClick={() =>
                                            item.id === 0 &&
                                            item.handleOnClick === true &&
                                            handleAddTest()
                                        }
                                    >
                                        <item.icon
                                            customClass={styles.iconStyle}
                                            fillColor="#CDD4D8"
                                        />
                                        <p className={styles.tooltiptext}>{item.name}</p>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RadiologyConfiguration
