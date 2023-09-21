import { FC } from 'react'
import styles from './tableV3.module.scss'
import * as React from 'react'
import { SortDown } from '../../svg-components'

interface ITable {
  customClassForTh?: string
  customClassForTd?: string
  customClasssForTrHead?: string
  customClasssForTrBody?: string
  handleToggle?: (id: number, isToggled: boolean) => void
  handleClick?: any
  handleOpen?: any
  getTableProps?: any
  getTableBodyProps?: any
  headerGroups?: any
  rows?: any
  prepareRow?: any
  handleEmrRecord?: any
  setModelOpenClose?: any
  handleRowClick?: any
  invoiceFlag?: boolean
  handleRow?: any
  active?: boolean
  setActive?: any
}

const TableV3: FC<ITable> = ({
  customClasssForTrBody,
  customClasssForTrHead,
  customClassForTd,
  customClassForTh,
  handleClick,
  handleOpen,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  setModelOpenClose,
  handleRowClick,
  invoiceFlag,
  handleRow,
  active,
  setActive,
}) => {
  return (
    <>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups?.map((headerGroup: any) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={[styles.tableHeadingRow, customClasssForTrHead].join(
                ' '
              )}
            >
              {headerGroup.headers.map((column: any) => {
                // console.log("header", column.canSort);
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={[styles.tableHeading, customClassForTh].join(
                      ' '
                    )}
                  >
                    {column.render('Header')}
                    {column.canSort && (
                      <span style={{ paddingLeft: '7px', cursor: 'pointer' }}>
                        <SortDown />
                      </span>
                    )}
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
                  // className={[styles.tableRow, customClasssForTrBody]}
                  className={
                    active === row?.original._id
                      ? styles.activeRow
                      : [(styles.tableRow, customClasssForTrBody)]
                  }
                  onClick={() => handleRow && handleRow(row?.original)}
                >
                  {row?.cells?.map((cell: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <td
                          {...cell.getCellProps()}
                          // className={
                          //   active
                          //     ? styles.activeRow :
                          //     [
                          //       styles.tableColumn,
                          //       customClassForTd,
                          //     ].join(" ")
                          // }
                          // onClick={() => handleRow && handleRow(row?.original)}
                        >
                          {cell?.accessor
                            ? row[cell?.accessor]
                            : cell.render('Cell', {
                                onClick: handleClick,
                                onOpen: handleOpen,
                                onPopClose: setModelOpenClose,
                                onRowClick: handleRowClick,
                                invoiceFlag: invoiceFlag,
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

export default TableV3
