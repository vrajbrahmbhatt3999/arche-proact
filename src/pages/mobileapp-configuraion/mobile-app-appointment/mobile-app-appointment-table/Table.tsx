import { FC } from "react";
import styles from "./table.module.scss";
import * as React from "react";

import {
  EditIcon,
  SortDown,
} from "../../../../components/common/svg-components";
import ToggleSwitch from "../../../../components/common/toggle-switch/ToggleSwtich";

interface ITable {
  // tableHeaderData?: Column<MobileConfigCols>[];
  // tableRowData?: MobileConfigCols[];
  handleEditAppointment?: any;
  handleViewDescription?: any;
  handleStatusConfirmationModal?: any;
  getTableProps?: any;
  getTableBodyProps?: any;
  headerGroups?: any;
  rows?: any;
  prepareRow?: any;
}

const Table: FC<ITable> = ({
  // tableHeaderData,
  // tableRowData,
  handleEditAppointment,
  handleViewDescription,
  handleStatusConfirmationModal,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) => {
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups?.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {column.render("Header")}
                  {column.canSort && (
                    <span style={{ paddingLeft: "7px", cursor: "pointer" }}>
                      <SortDown />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {rows?.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {rows?.map((row: any, rowIndex: number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row?.cells?.map((cell: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        {cell.column.Header === "TYPE" ? (
                          <td>
                            <span className={styles.typeStyle}>
                              {" "}
                              {row?.original?.type}
                            </span>
                          </td>
                        ) : cell.column.Header === "TITLE" ? (
                          <td>
                            <span className={styles.titleStyle}>
                              {" "}
                              {row?.original?.title}
                            </span>
                          </td>
                        ) : cell.column.Header === "DESCRIPTION" ? (
                          <td
                            onClick={() => {
                              handleViewDescription(row?.original?.description);
                            }}
                            // style={{ cursor: "pointer", color: " #0e26a3" }}
                            className={styles.descriptionStyle}
                          >
                            View
                          </td>
                        ) : cell.column.Header === "PRICE LISTING" ? (
                          <td>
                            <span className={styles.priceListing}>
                              {" "}
                              {"$" + row?.original?.price}
                            </span>
                          </td>
                        ) : cell.column.Header === "ICON" ? (
                          <td>
                            <img
                              className={styles.imgStyle}
                              src={row?.original?.icon}
                              alt="images"
                            />
                          </td>
                        ) : cell.column.Header === "STATUS" ? (
                          <td className={styles.toogleStyle}>
                            <ToggleSwitch
                              setIsToggled={() => {
                                handleStatusConfirmationModal(row?.original);
                              }}
                              isToggled={row?.original?.is_active}
                            />
                          </td>
                        ) : cell.column.Header === "ACTIONS" ? (
                          <td>
                            <span className={styles.actionIconStyle}>
                              <EditIcon
                                fillColor="#CDD4D8"
                                customClass={styles.iconStyle}
                                // handleClick={
                                //   row?.original?.is_active
                                //     ? () => {
                                //         handleEditAppointment(row?.original);
                                //       }
                                //     : () => {}
                                // }

                                handleClick={() => { handleEditAppointment(row?.original) }}
                              />
                            </span>
                          </td>
                        ) : (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={12} className={styles.noReordFoundText}>
                No records found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};

export default Table;
