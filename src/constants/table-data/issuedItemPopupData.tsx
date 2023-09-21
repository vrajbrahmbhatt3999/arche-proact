import jsPDF from "jspdf";
import { CrossIcon } from "../../components/common/svg-components";
import { colors } from "../../constants/color";
import moment from "moment";
import styles from "../../pages/branchstore/issue-item-popup/issueditempopup.module.scss";

export const issueItemPopupHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.date)?.format("DD MMM YYYY");
    },
    Cell: (props: any) => {
      const convertDate = moment(props?.row?.original?.date).format(
        "DD MMM YYYY"
      );
      return (
        <>{props?.row?.original?.date ? <span>{convertDate}</span> : "-"}</>
      );
    },
  },
  {
    Header: "DOC ID",
    accessor: "doc_id",
    Cell: (props: any) => {
      // console.log("props.row.original :>> ", props.row.original);
      const handleOpen = (id: any) => {
        // Create a new PDF document
        const doc = new jsPDF();
        let data = props.row.original;
        // Set the document font size
        doc.setFontSize(12);
        const { name, qty } = data;
        doc.text(`Item Name: ${name}`, 10, 10);
        doc.text(`Issued Quantity : ${qty}`, 10, 20);
        doc.save("document.pdf");
        window.open(doc.output("bloburl"), "_blank");
      };
      return (
        <>
          {props?.row?.original?.doc_id ? (
            <span className={styles.viewPdfLink} onClick={handleOpen}>
              {props?.row?.original?.doc_id}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "ITEM NAME",
    accessor: "name",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.name ? (
            <span>{props?.row?.original?.name}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SOURCE",
    accessor: "request_source_type",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.request_source_type ? (
            <span>{props?.row?.original?.request_source_type}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SUB SOURCE",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.request_source ? (
            <span>{props?.row?.original?.request_source}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "REQ TYPE",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.req_unit_type ? (
            <span>{props?.row?.original?.req_unit_type}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "REQ QTY",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.requested_qty ? (
            <span>{props?.row?.original?.requested_qty}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "QTY ISSUED",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.qty ? (
            <span>{props?.row?.original?.qty}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  // {
  //   Header: "ACTION",
  //   accessor: "Action",
  //   disableSortBy: true,
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         <CrossIcon
  //           width={25}
  //           height={25}
  //           fillColor={colors.white1}
  //           fillColor1={colors.grey4}
  //         />
  //       </>
  //     );
  //   },
  // },
];

