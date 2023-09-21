import { FC } from 'react'
import styles from './tableV2.module.scss'
import * as React from 'react'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { Cols } from '../../../../interfaces/interfaces'
import { SortDown } from '../../svg-components'

interface ITable {
  tableHeaderData: Column<Cols>[]
  tableRowData: any
  customClassForTh?: string
  customClassForTd?: string
  customClasssForTrHead?: string
  customClasssForViewSlotTrHead?: string
  customClasssForTrBody?: string
  handleToggle?: (id: number, isToggled: boolean) => void
  handleClick?: any
  handleEmrRecord?: any
  handleRow?: any
  setModelOpenClose?: any
  handleRowClick?: any
  active?: boolean
  setActive?: any
  colSpan?: any
  tableCustomClass?: any
}

const TableV2: FC<ITable> = ({
  tableHeaderData,
  tableRowData,
  customClasssForTrBody,
  customClasssForTrHead,
  customClasssForViewSlotTrHead,
  customClassForTd,
  customClassForTh,
  handleClick,
  handleRow,
  setModelOpenClose,
  handleRowClick,
  active,
  setActive,
  colSpan,
  tableCustomClass,
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
      <table
        {...getTableProps()}
        className={[styles.table, tableCustomClass].join(' ')}
      >
        <thead>
          {headerGroups?.map((headerGroup: any) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={[styles.tableHeadingRow, customClasssForTrHead].join(
                ' '
              )}
            >
              {headerGroup.headers.map((column: any) => {
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={[styles.tableHeading, customClassForTh].join(
                      ' '
                    )}
                  >
                    <div
                      className={[
                        styles.headerContent,
                        customClasssForViewSlotTrHead,
                      ].join(' ')}
                    >
                      {column.render('Header', {
                        onClick: handleClick,
                      })}
                      {column.canSort && (
                        <span style={{ paddingLeft: '7px', cursor: 'pointer' }}>
                          <SortDown />
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        {rows?.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {rows?.map((row: any) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  className={
                    active === row?.original?._id
                      ? styles.activeRow
                      : [(styles.tableRow, customClasssForTrBody)]
                  }
                  onClick={() =>
                    handleRow && handleRow(row?.original?._id, row.original)
                  }
                >
                  {row?.cells?.map((cell: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <td
                          {...cell.getCellProps()}
                          className={[
                            styles.tableColumn,
                            customClassForTd,
                          ].join(' ')}
                        >
                          {cell.accessor
                            ? row[cell.accessor]
                            : cell.render('Cell', {
                                onClick: handleClick,
                                onPopClose: setModelOpenClose,
                                onRowClick: handleRowClick,
                              })}
                        </td>
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
              <td colSpan={colSpan ?? 12} className={styles.noReordFoundText}>
                No records found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  )
}

export default TableV2
