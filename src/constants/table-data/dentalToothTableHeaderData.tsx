import { DeleteIcon, EditIcon } from "../../components/common/svg-components";
import { colors } from "../../constants/color";
import styles from "./tableData.module.scss"

export const dentalToothTableHeaderData: any = [
  {
    Header: "PROCEDURE",
    accessor: "procedure",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.procedure?.label}
        </>
      );
    },
  },
  {
    Header: "SELECTED TOOTHS",
    // accessor: "test_name",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.selected_tooth ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onRowClick(props?.row?.original);
              }}
            >
              {props?.row?.original?.selected_tooth.map((t:any)=>(<p>{t.tooth_number}</p>))}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
    disableSortBy: true
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.amount ? (
            <span>$ {props?.row?.original?.amount}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
    disableSortBy: true,
  },
  {
    Header: "BILLABLE",
    accessor: "billable",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.billable?.label ? (
            <span>
              {props?.row?.original?.billable?.label}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "NOTE",
    accessor: "note",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.note ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick('VIEW_RECORD',{title:'Notes',data:props?.row?.original?.note});
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "COMPLAINT",
    accessor: "complaint",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.complaint ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick('VIEW_RECORD',{title:'Complaint',data:props?.row?.original?.complaint});
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "ACTIONS",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <div>

        <DeleteIcon
          style={{ marginRight:'8px' }}
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={() => {
            props?.onClick('DELETE_RECORD',props?.row?.original?._id);
          }}
        />

        <EditIcon
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={() => {
            props?.onClick('EDIT_RECORD',props?.row?.original);
          }}
        />
        </div>
      );
    },
  },
];
