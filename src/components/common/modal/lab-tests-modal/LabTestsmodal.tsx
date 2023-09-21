import { FC, useState, useEffect } from "react";
import styles from "./LabTestsmodal.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { trimValue } from "../../../../utils/utils";
import { Column, TableOptions, useGlobalFilter, useSortBy, useTable } from "react-table";
import { Cols } from "../../../../interfaces/interfaces";
import { useAppSelector } from "../../../../hooks";
import { LabTestsHeaderData } from "../../../../constants/table-data/labInvoiceTabledata";
import TableV3 from "../../table/tableV3/TableV3";



interface ILabTestsModal {
    setModelOpenClose?: any;
    handleRowClick?: any;
    handleClose?: any;
    popData?: any;
}

const LabTestsmodal: FC<ILabTestsModal> = ({
    handleClose,
    setModelOpenClose,
    popData
}) => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [activateSmartSearch, setActivateSmartSearch] =
        useState<boolean>(false);
    const { patientTests } = useAppSelector(
        (state) => state.labInvoice
    );

    const data: Cols[] = popData;
    const columns: Column<Cols>[] = LabTestsHeaderData;
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
    const [dataPerPage, setDataPerPage] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [pageIndex, setPageIndex] = useState<number>(1);

    const handleInputSearch = () => {

    };

    return (
        <>
            <div
                className={styles.mainContainer}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >

                <div className={styles.closeIconContainer}>
                    <CloseIcon
                        customClass={styles.closeIconStyle}
                        fillColor={colors.green1}
                        handleClick={() => handleClose()}
                    />
                </div>
                <p className={styles.title}>Tests</p>
                <Divider customClass={styles.dividerStyle} />

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
                                marginLeft: "18px",
                            }}
                        >
                            <input
                                type="text"
                                className={styles.inputSearchContainer}
                                placeholder="Search"
                                onChange={(e) => {
                                    trimValue(e);
                                    setGlobalFilter(e.target.value);
                                }}
                            // value={searchValue === "" ? searchValue : globalFilter}
                            />
                        </div>

                    </div>
                    <Divider customClass={styles.dividerStyling} />
                    <div className={styles.tableContainer}>
                        <TableV3
                            getTableProps={getTableProps}
                            getTableBodyProps={getTableBodyProps}
                            headerGroups={headerGroups}
                            rows={rows}
                            prepareRow={prepareRow}
                            setModelOpenClose={setModelOpenClose}
                        // active={active}
                        // handleRow={handleRow}
                        />
                    </div>

                </div>

            </div>

        </>
    )
}

export default LabTestsmodal