import styles from "./editrequestpopuptabledata.module.scss"
export const editRequestTableHeaderData: any = [
  {
    Header: "ITEM",
    accessor: "_src",
    Cell: ({ row }: any) => {

      return (
        <>
          <div>
            <input type="text" className={styles.textField} value={row?.original?.item_name
            } />
          </div>
        </>
      );
    },
  },
  {
    Header: "QTY.",
    accessor: "_qty",
    Cell: ({ row }: any) => {

      return (
        <>
          <div

          >
            <input
              className={styles.textField}
              value={row?.original?.requested_qty}
              type="number"
            // onChange={(e) => handleCopay(e, _id)}
            // onKeyDown={handleKeyDown}
            // onFocus={() => handleFocusCopay(_id)}
            // autoFocus={focusCopay === _id}
            />
          </div>
        </>
      );
    },
  },
  {
    Header: "ACTION",
    accessor: "_action",
    Cell: (props: any) => {

      return (
        <>
          <button className={styles.btn}>Update</button>
        </>
      );
    },
  },
];

export const editRequestTableData: any = [
  {
    _src: "56896",
    _qty: "400",
    _action: "Cleaning kit",
  },
  {
    _src: "56896",
    _qty: "400",
    _action: "Cleaning kit",
  },
  {
    _src: "56896",
    _qty: "400",
    _action: "Cleaning kit",
  },
  {
    _src: "56896",
    _qty: "400",
    _action: "Cleaning kit",
  },
];
