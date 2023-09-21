import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import jsPDF from 'jspdf';
import {
  getBranchStoreMainStoreRequestList,
  getMainStoreRequestItemsList,
} from '../../redux/features/branch-store/branchStoreAsyncActions';
import { requestGenerator } from '../../utils/payloadGenerator';
import { colors } from '../../constants/color';
import {
  CrossIcon,
  DropDownIcon,
  EditIcon,
} from '../../components/common/svg-components';
import { GET_MAIN_STORE_REQUEST_ITEMS_TYPE } from '../../constants/asyncActionsType';
import moment from 'moment';
import styles from '../../pages/branchstore/mainstore-request-item-popup/mainstorerequestitempopup.module.scss';
import AuthorizedStatusDropdown from '../../components/common/status-dropdown/authorized-status-dropdown/AuthorizedStatusDropdown';
import { markInventoryReqsAuthorize } from '../../redux/features/inventory-request/inventoryRequestAsyncActions';

export const mainstoreHeaderData: any = [
  {
    Header: 'DATE',
    accessor: (row: any) => {
      return moment(row?.date)?.format('DD MMM YYYY');
    },
    Cell: (props: any) => {
      const convertDate = moment(props?.row?.original?.date).format(
        'DD MMM YYYY'
      );
      return (
        <>{props?.row?.original?.date ? <span>{convertDate}</span> : '-'}</>
      );
    },
  },
  {
    Header: 'DOC ID',
    accessor: 'doc_id',
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      // console.log("props.row.original :>> ", props.row.original);
      const mainStoreRequestEditPopupOpen = (rowData: any) => {
        const payloadData = {
          request_id: props?.row?.original?._id,
        };
        if (
          props?.row?.original?._id &&
          props?.row?.original?.authorization_status === 'APPROVED'
        ) {
          dispatch(
            getMainStoreRequestItemsList(requestGenerator(payloadData))
          ).then((response: any) => {
            if (
              response.type === `${GET_MAIN_STORE_REQUEST_ITEMS_TYPE}/fulfilled`
            ) {
              console.log('response :>> ', response.payload);
              // Create a new PDF document
              const doc = new jsPDF();
              let data = response.payload;
              // Set the document font size
              doc.setFontSize(12);
              // Loop through the data array and add each question and answer to the PDF document
              data?.forEach((item: any, index: number) => {
                const { item_name, requested_qty } = item;
                doc.text(`Item Name: ${item_name}`, 10, 10 + index * 30);
                doc.text(`Quantity : ${requested_qty}`, 10, 20 + index * 30);
              });
              // Save the PDF document and open it in a new tab
              doc.save('document.pdf');
              window.open(doc.output('bloburl'), '_blank');
            }
          });
        }
      };

      return (
        <>
          {props?.row?.original?.doc_id ? (
            <span
              className={
                props?.row?.original?.authorization_status === 'APPROVED'
                  ? styles.viewPdfLink
                  : styles.notViewPdfLink
              }
              onClick={mainStoreRequestEditPopupOpen}
            >
              {props?.row?.original?.doc_id}
            </span>
          ) : (
            '-'
          )}
        </>
      );
    },
  },
  // {
  //   Header: "ITEM NAME",
  //   accessor: "item_name",
  // },
  // {
  //   Header: "REQ QTY",
  //   accessor: "req_qty",
  // },
  {
    Header: 'MAIN STORE REQ STATUS',
    accessor: 'request_status',
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.request_status === 'INITIATED' ? (
            <p className={styles.requestStatusInitiate}>Initiated</p>
          ) : props?.row?.original?.request_status === 'PARTIAL' ? (
            <p className={styles.requestStatusPartial}>Partial</p>
          ) : (
            <p className={styles.requestStatusComplete}>Completed</p>
          )}
        </>
      );
    },
  },
  {
    Header: 'AUTHORIZED STATUS',
    accessor: 'is_approved',
    Cell: ({ row }: any) => {
      let appointment_id = row?.original?._id;
      const dispatch = useAppDispatch();
      const { getBranchStoreMainStoreRequestPayload } = useAppSelector(
        (state) => state.branchStore
      );
      const [option, setOption] = useState(false);
      const handleStatus = (item: any) => {
        console.log('item', item);
        setOption(false);
        dispatch(
          markInventoryReqsAuthorize(
            requestGenerator({
              request_id: appointment_id,
              authorization_status: item?.enum,
            })
          )
        ).then((e: any) => {
          if (e.type === 'inventory/markRequestAuthorize/fulfilled') {
            dispatch(
              getBranchStoreMainStoreRequestList(
                requestGenerator(getBranchStoreMainStoreRequestPayload)
              )
            );
          }
        });
      };
      return (
        <>
          <AuthorizedStatusDropdown
            customClass={styles.optionContainerStyle}
            appointmentStatus={
              row?.original?.authorization_status === 'ENTERED'
                ? 'Entered'
                : row?.original?.authorization_status === 'APPROVED'
                ? 'Approved'
                : 'Rejected'
            }
            appointment_id={appointment_id}
            handleStatusClick={handleStatus}
            setShowOption={setOption}
            showOption={option}
          />
        </>
      );
    },
  },
  // {
  //   Header: "AUTHORIZATION STATUS",
  //   accessor: "authorization_status",
  //   Cell: (props: any) => {
  //     // console.log("onClick", onClick);
  //     // const dispatch = useAppDispatch();
  //     // const [showOption, setShowOption] = useState<boolean>(false);
  //     const statusRef = useRef<any>();
  //     const [statusValue, setStatusValue] = useState<any>({});

  //     // Data for status dropdown
  //     let optionData = [
  //       {
  //         value: "Entered",
  //         capitalValue: "ENTERED",
  //         class: "authorizationStatusEntered",
  //         color: "#e49e00",
  //       },
  //       {
  //         value: "Approved",
  //         capitalValue: "APPROVED",
  //         class: "authorizationStatusApproved",
  //         color: "#0046fb",
  //       },
  //       {
  //         value: "Rejected",
  //         capitalValue: "REJECTED",
  //         class: "authorizationStatusRejected",
  //         color: "#b11313",
  //       },
  //     ];

  //     // function for close dropdown
  //     // useEffect(() => {
  //     //   const checkIfClickedOutside = (e: any) => {
  //     //     if (
  //     //       showOption &&
  //     //       statusRef.current &&
  //     //       !statusRef.current.contains(e.target)
  //     //     ) {
  //     //       setShowOption(false);
  //     //     }
  //     //   };

  //     //   document.addEventListener("mousedown", checkIfClickedOutside);

  //     //   return () => {
  //     //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //     //   };
  //     // }, [showOption]);

  //     // show status selected option
  //     useEffect(() => {
  //       const selectedOption = optionData.find((option) => {
  //         return (
  //           option.capitalValue === props?.row?.original?.authorization_status
  //         );
  //       });
  //       setStatusValue(selectedOption);
  //     }, [props?.row?.original?.authorization_status]);

  //     // useEffect(() => {
  //     //   let payloadData = {
  //     //     appointment_id: "643ceb4d239f4dee401c08fc",
  //     //     status: statusValue?.capitalValue,
  //     //   };
  //     //   console.log("payloadData", payloadData);
  //     //   dispatch(changeMobileAppointmentStatus(requestGenerator(payloadData)));
  //     // }, [statusValue?.capitalValue]);

  //     // const handleStatus = (item: any) => {
  //     //   window.scrollTo(0, 0);
  //     //   // let payloadData = {
  //     //   //   appointment_id: row?.original?.apt_id,
  //     //   //   status: item?.capitalValue,
  //     //   // };
  //     //   const mobileBookAppointment = { ...row?.original };
  //     //   mobileBookAppointment.apt_status = item?.capitalValue;
  //     //   // console.log("row?.original", row?.original);
  //     //   // console.log({ mobileBookAppointment });
  //     //   if (
  //     //     item?.capitalValue === "PENDING" ||
  //     //     statusValue?.capitalValue === "SCHEDULED"
  //     //   ) {
  //     //     setShowOption((prevState) => !prevState);
  //     //   } else if (item?.capitalValue === "WAITINGLIST") {
  //     //     if (
  //     //       statusValue?.capitalValue === "WAITINGLIST" ||
  //     //       statusValue?.capitalValue === "CANCELLED"
  //     //     ) {
  //     //       setShowOption((prevState) => !prevState);
  //     //     } else {
  //     //       setShowOption((prevState) => !prevState);
  //     //       dispatch(
  //     //         setSingleMobileAppointmentRequestData(mobileBookAppointment)
  //     //       );
  //     //       onClick();
  //     //     }
  //     //   } else if (item?.capitalValue === "SCHEDULED") {
  //     //     if (
  //     //       statusValue?.capitalValue === "PENDING" ||
  //     //       statusValue?.capitalValue === "WAITINGLIST"
  //     //     ) {
  //     //       setShowOption((prevState) => !prevState);
  //     //       mobileBookAppointment.previous_status = statusValue?.capitalValue;
  //     //       dispatch(
  //     //         setSingleMobileAppointmentRequestData(mobileBookAppointment)
  //     //       );
  //     //       onClick();
  //     //     } else {
  //     //       setShowOption((prevState) => !prevState);
  //     //     }
  //     //   } else if (item?.capitalValue === "CANCELLED") {
  //     //     if (statusValue?.capitalValue === "CANCELLED") {
  //     //       setShowOption((prevState) => !prevState);
  //     //     } else {
  //     //       const payload = {
  //     //         appointment_id: row?.original?.apt_id,
  //     //         status: item?.capitalValue,
  //     //       };
  //     //       setShowOption((prevState) => !prevState);
  //     //       onOpen(payload);
  //     //     }
  //     //   } else if (statusValue?.capitalValue === "CANCELLED") {
  //     //     setShowOption((prevState) => !prevState);
  //     //   } else {
  //     //     setShowOption((prevState) => !prevState);
  //     //     dispatch(
  //     //       setSingleMobileAppointmentRequestData(mobileBookAppointment)
  //     //     );
  //     //     onClick();
  //     //   }
  //     // };

  //     // const handleDropdown = () => {
  //     //   setShowOption((prevState) => !prevState);
  //     // };

  //     return (
  //       <>
  //         <div className={styles.dropdownContainer} ref={statusRef}>
  //           <div
  //             className={styles[`${statusValue?.class}`]}
  //             // onClick={handleDropdown}
  //           >
  //             <p>{statusValue?.value}</p>
  //             <DropDownIcon
  //               fillColor={statusValue?.color}
  //               customClass={styles.iconStyle}
  //             />
  //           </div>
  //           {/* {showOption && (
  //             <div className={styles.optionContainer}>
  //               {optionData.map((item: any, index) => {
  //                 return (
  //                   <div
  //                     className={styles[`${item.class}`]}
  //                     onClick={() => handleStatus(item)}
  //                     key={index}
  //                   >
  //                     <p>{item.value}</p>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           )} */}
  //         </div>
  //       </>
  //     );
  //   },
  //   disableSortBy: true,
  // },
  {
    Header: 'ACTION',
    accessor: 'Action',
    disableSortBy: true,
    Cell: (props: any) => {
      const handleEditItem = () => {
        if (props?.row?.original?.authorization_status === 'ENTERED') {
          props.onClick(props?.row?.original);
        } else {
          return;
        }
      };
      const handleDeleteItem = () => {
        if (props?.row?.original?.authorization_status === 'ENTERED') {
          props.onOpen(props?.row?.original);
        } else {
          return;
        }
      };
      return (
        <div className={styles.mainStoreActionIconContainer}>
          <EditIcon handleClick={handleEditItem} />
          <CrossIcon
            width={25}
            height={25}
            fillColor={colors.white1}
            fillColor1={colors.grey4}
            handleClick={handleDeleteItem}
          />
        </div>
      );
    },
  },
];

export const mainstorePopupData: any = [
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Cleaning Kit',
    sub_store: 'Dental',
    req_type: 'Box',
    req_qty: '400',
    Authorization_Status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Paper Napkins',
    sub_store: 'Dental',
    req_type: 'Cleaning Kit',
    req_qty: '300',
    Authorization_Status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Cleaning Kit',
    sub_store: 'Dental',
    req_type: 'Box',
    req_qty: '400',
    Authorization_Status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Cleaning Kit',
    sub_store: 'Dental',
    req_type: 'Box',
    req_qty: '400',
    Authorization_Status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Cleaning Kit',
    sub_store: 'Dental',
    req_type: 'Box',
    req_qty: '400',
    Authorization_Status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'SS_IS_DT_TIME',
    item_name: 'Cleaning Kit',
    sub_store: 'Dental',
    req_type: 'Box',
    req_qty: '400',
    Authorization_Status: 'Entered',
  },
];
