import { FC, useState, useEffect } from 'react'
import styles from "./radiologyViewTestProfile.module.scss"
import Pagination from '../../pagination/Pagination';
import TableV3 from '../../table/tableV3/TableV3';
import { trimValue } from '../../../../utils/utils';
import { CloseIcon, SearchButton } from '../../svg-components';
import Divider from '../../divider/Divider';
import { colors } from '../../../../constants/color';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllRadiologyTestProfile } from '../../../../redux/features/radiology/radiologyAsyncActions';
import {
    Column,
    TableOptions,
    useGlobalFilter,
    useSortBy,
    useTable,
} from "react-table";
import { Cols } from '../../../../interfaces/interfaces';
import { radiologyViewTestProfileHeaderData, testProfileDummyData } from '../../../../constants/table-data/radiologyViewTestProfileData';

interface IRadiologyViewTestProfile {
    handleClose?: any
    handleOpen?: any;
    handleRowClick?: any;
}

const RadiologyViewTestProfile: FC<IRadiologyViewTestProfile> = ({ handleClose, handleOpen, handleRowClick }) => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [activateSmartSearch, setActivateSmartSearch] =
        useState<boolean>(false);
    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const { radiologyTestProfileData } = useAppSelector((state) => state.radiology)
    const dispatch = useAppDispatch()


    // function for creating Page Index Array
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
            search: "",
            page: pageIndex,
            pageSize: dataPerPage,
            order_by: { name: 1 },
        };
        dispatch(getAllRadiologyTestProfile(requestGenerator(requestData))).then(
            (result) => setTotalPage(result.payload.lastPage)
        );
    }, [pageIndex, dataPerPage]);

    const data: Cols[] =
        radiologyTestProfileData?.length > 0 || radiologyTestProfileData !== undefined
            ? radiologyTestProfileData
            : testProfileDummyData;
    const columns: Column<Cols>[] = radiologyViewTestProfileHeaderData;
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
    // @ts-ignore
    const { globalFilter } = state;

    const handleInputSearch = () => {
        setActivateSmartSearch(true);
        let requestData = {
            search: searchValue,
            page: pageIndex,
            pageSize: dataPerPage,
            order_by: { name: 1 },
        };
        setPageIndex(1)
        dispatch(getAllRadiologyTestProfile(requestGenerator(requestData)));
    };

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
                    <p className={styles.title}>View Test Profile</p>
                    <Divider customClass={styles.dividerStyle} />
                    <div className={styles.mainContainer}>
                        <div className={styles.searchFieldContainer}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "25px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <input
                                        type="text"
                                        className={styles.inputSearchContainer}
                                        placeholder="Search by profile name"
                                        onChange={(e) => {
                                            trimValue(e);
                                            setSearchValue(e.target.value);
                                            //   setGlobalFilter("");
                                            if (e.target.value === "") {
                                                let requestData = {
                                                    search: e.target.value,
                                                    page: pageIndex,
                                                    pageSize: dataPerPage,
                                                    order_by: { name: 1 },
                                                };
                                                dispatch(
                                                    getAllRadiologyTestProfile(requestGenerator(requestData))
                                                );
                                            }
                                        }}
                                    />

                                    <SearchButton
                                        handleClick={() => {
                                            if (!!searchValue) {
                                                handleInputSearch();
                                            }
                                        }}
                                        customClass={styles.inputSearchButton}
                                    />
                                </div>

                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "row",
                                        marginLeft: "18px",
                                    }}
                                >
                                    <input
                                        type="text"
                                        className={
                                            !activateSmartSearch
                                                ? styles.inputSmartSearchContainer
                                                : styles.inputSearchContainer
                                        }
                                        placeholder="Smart Search"
                                        disabled={!activateSmartSearch}
                                        onChange={(e) => {
                                            trimValue(e);
                                            setGlobalFilter(e.target.value);
                                        }}
                                        value={searchValue === "" ? searchValue : globalFilter}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <TableV3
                                getTableProps={getTableProps}
                                getTableBodyProps={getTableBodyProps}
                                headerGroups={headerGroups}
                                rows={rows}
                                prepareRow={prepareRow}
                                handleOpen={handleOpen}
                                handleRowClick={handleRowClick}
                            />
                        </div>
                        {radiologyTestProfileData?.length > 0 && (
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
    )
}

export default RadiologyViewTestProfile
