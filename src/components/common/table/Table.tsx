import { FC } from 'react'
import styles from './table.module.scss'
import * as React from 'react'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { EditIcon, SortDown } from '../svg-components'
import ToggleSwitch from '../toggle-switch/ToggleSwtich'
import { Cols } from '../../../interfaces/interfaces'
import { InfoIcon } from '../svg-components'

interface ITable {
  tableHeaderData: Column<Cols>[]
  tableRowData: Cols[]
  handleNotes?: any
  handleAction?: any
  handleDetails?: any
  handleDeleteAction?: any
  handleCreateUsers?: any
  handleActiveMC?: any
  toogleValue?: number
  handleSpecialities?: any
  handleEmrRecord?: any
  customClassHeader?: any
  handlePreview?: any
  handleClick?: any
  handleClicks?: any
  handleClickss?: any
  handleActiveAssign?: any
  showSpeciality?: boolean
}

const Table: FC<ITable> = ({
  tableHeaderData,
  tableRowData,
  handleNotes,
  handleAction,
  handleDetails,
  handleDeleteAction,
  handleCreateUsers,
  handleActiveMC,
  toogleValue,
  handleSpecialities,
  handleEmrRecord,
  customClassHeader,
  handlePreview,
  handleClick,
  handleClicks,
  handleClickss,
  handleActiveAssign,
  showSpeciality = true,
}) => {
  const data: Cols[] = tableRowData
  const columns: Column<Cols>[] = tableHeaderData
  const options: TableOptions<Cols> = {
    data,
    columns,
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useGlobalFilter, useSortBy)

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
                    fontWeight: '600',
                    fontSize: '12px',
                  }}
                  className={[styles.headerStyles, customClassHeader].join('')}
                >
                  {column.render('Header')}
                  {column.canSort && (
                    <span style={{ paddingLeft: '7px', cursor: 'pointer' }}>
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
            {rows?.map((row: any) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row?.cells?.map((cell: any, i: number) => {
                    // console.log(">>>>>>", row?.original);
                    return (
                      <React.Fragment key={i}>
                        {cell.column.Header === 'NOTES' ? (
                          <td
                            onClick={() => row?.original?.notes?.length ? handleNotes(row?.original) : undefined}
                            style={{ cursor: 'pointer', color: ' #0e26a3' }}
                          >
                            <p
                              className={
                                row?.original?.notes?.length === 0
                                  ? styles.notView
                                  : styles.view
                              }
                            >
                              {row?.original?.notes?.length === 0
                                ? '-'
                                : 'View'}
                              {/* View */}
                            </p>
                          </td>
                        ) : cell.column.Header === 'DETAILS' ? (
                          <td
                            onClick={() => handleDetails(row?.original?._id)}
                            style={{ cursor: 'pointer', color: ' #0e26a3' }}
                          >
                            View
                          </td>
                        ) : cell.column.Header === 'SPECIALTIES' &&
                          showSpeciality ? (
                          <td
                            onClick={() =>
                              handleSpecialities(row?.original?._id)
                            }
                            style={{ cursor: 'pointer', color: ' #0e26a3' }}
                          >
                            View
                          </td>
                        ) : cell.column.Header === 'ACTIONS' ? (
                          <td>
                            <span className={styles.actionIconStyle}>
                              {/* {row?.original?.is_active === true ? ( */}
                              <EditIcon
                                fillColor="#CDD4D8"
                                customClass={styles.iconStyle}
                                handleClick={() => {
                                  handleAction(row?.original)
                                }}
                              />
                              {/* )  */}

                              {/* : (
                                <EditIcon
                                  fillColor="#CDD4D8"
                                  customClass={styles.editIconStyle}
                                  handleClick={() => {
                                    handleAction(row?.original)
                                  }}
                                />
                              )} */}

                            </span>
                          </td>
                        ) : cell.column.Header === 'CREATED USERS' ? (
                          <td
                            onClick={() =>
                              handleCreateUsers(
                                row?.original?.created_users_count
                              )
                            }
                            style={{ cursor: 'pointer', color: ' #0e26a3' }}
                          >
                            {row?.original?.created_users_count}
                          </td>
                        ) : cell.column.Header === 'STATUS' ? (
                          <td className={styles.toogleStyle}>
                            <ToggleSwitch
                              setIsToggled={() => {
                                handleActiveMC(row?.original)
                              }}
                              isToggled={row?.original?.is_active}
                            />
                          </td>
                        ) : cell.column.Header === 'ACTIVE/INACTIVE' ? (
                          <td className={styles.toogleStyle}>
                            <ToggleSwitch
                              setIsToggled={() => {
                                handleActiveMC(row?.original)
                              }}
                              isToggled={row?.original?.is_active}
                            />
                          </td>
                        ) : cell.column.Header === 'PREVIEW' ? (
                          <td>
                            <span className={styles.actionIconStyle}>
                              <InfoIcon
                                fillColor="#CDD4D8"
                                handleClick={() => {
                                  handlePreview(row?.original)
                                }}
                              />
                            </span>
                          </td>
                        ) : (
                          <td {...cell.getCellProps()}>
                            {cell?.accessor
                              ? row[cell.accessor]
                              : cell.render('Cell', {
                                onClick: handleClick,
                                onClicks: handleClicks,
                                onClickss: handleClickss,
                              })}
                          </td>
                        )}
                      </React.Fragment>
                    )
                  })}
                </tr>
              )
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
  )
}

export default Table
