import moment from "moment";
import { CheckIcon, CrossIcon2, UncheckIcon } from "../../components/common/svg-components";
import { colors } from "../color";
import styles from './pendingGrnTable.module.scss';
import { useDispatch } from "react-redux";
import { removeFromInvoiceList, setPurchaseInvoiceList, setTestAddText } from "../../redux/features/purchase-invoice/purchaseInvoiceSlice";
import { useAppSelector } from "../../hooks";

export const pendingGrnHeaderData: any = [
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      const formattedDate = moment(row?.original?.receive_date).format('DD MMM YYYY')
      // console.log(formattedDate,"formattedDate")
      return <>{formattedDate}</>
    },
  },
  {
    Header: "SUPPLIER",
    accessor: "supplier_name",
  },
  {
    Header: "INVOICE NO",
    accessor: "invoice_no",
    Cell: (props: any) => {
      return (
        <>
          <span>
            -
          </span>
        </>
      )
    }
  },

  {
    Header: "GRN",
    accessor: "grn_no",
  },

  {
    Header: " ITEM",
    // accessor: "_item",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          <div>
            {
              receivedItems?.map((items: any) => {
                return (
                  <p>
                    {items?.name}
                  </p>
                )
              })
            }
          </div>
        </>
      )
    },

  },

  {
    Header: "QTY",
    // accessor: "_qty",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          {
            receivedItems?.map((item: any) => {
              return (
                <p>
                  {item?.qty}
                </p>
              )
            })
          }

        </>
      )
    },
  },

  {
    Header: "PRICE",
    // accessor: "_price",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          {
            receivedItems?.map((item: any) => {
              return (
                <p>
                  {item?.price}
                </p>
              )
            })
          }

        </>
      )
    },
  },

  {
    Header: "ITEM AMOUNT",
    // accessor: "item_amount",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          {
            receivedItems?.map((item: any) => {
              return (
                <p>
                  {item?.total_amount}
                </p>
              )
            })
          }

        </>
      )
    },
  },

  {
    Header: "INVOICE STATUS",
    accessor: "invoice_status",
  },
  {
    Header: "AMOUNT",
    accessor: "total_amount",
  },
  // {
  //     Header: "SELECT",
  //     accessor: "auth_status",
  //     Cell: (props: any) => {
  //       return (
  //         <>
  //         <input type="checkbox" style={{width:"20px"}} />
  //           {/* <div style={{display : "flex" ,textAlign:"center"}}>
  //             <p style={{marginRight : "100px"}}>Entered</p>

  //           </div> */}
  //         </>
  //       )
  //     },
  //   },
  {
    Header: 'SELECT',
    // accessor: "status",
    Cell: ({ row }: any) => {

      const dispatch = useDispatch()

      const { addTestText } = useAppSelector(
        (state) => state.purchaseInvoice
      )

      const handleImageSelection = (item: any) => {
        console.log(item, "item....")

        dispatch(setPurchaseInvoiceList({
          ...item,
          po_no: row?.original?.po_id,
          received_items: item?.received_items?.map((items: any) => {
            return {
              ...items,
              discount: items?.discount ?? 0,
              netAmount: items?.total_amount
            }
          }),
        }))
      }

      const handleAdd = (id: any) => {
        dispatch(setTestAddText(id))
      }

      const handleRemovce = (id: any) => {
        dispatch(removeFromInvoiceList(id))
      }

      return (
        <>
          <div
            onClick={() => handleAdd(row?.original?._id)}
          >
            {
              !addTestText.includes(row?.original?._id) ? (
                <UncheckIcon
                  fillColor={colors.grey1}
                  handleClick={() => handleImageSelection(row?.original)}
                />
              ) : (
                <CheckIcon
                  fillColor={colors.green1}
                  handleClick={() => handleRemovce(row?.original?._id)}
                />
              )
            }
          </div>

        </>
      )
    },
  },

  {
    Header: "TOTAL",
    accessor: "total",
  },

];


export const pendingGrnData: any = [
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "Due",
    amt: "$100",
    totl: "$400"
  },
];


export const settledGrnData: any = [
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: true
  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: true

  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: false

  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: true

  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: false

  },
  {
    _date: "10 jan 2023",
    _supplier: "Edward Co.",
    invoice_no: "9856932",
    _grn: "#2356",
    _item: "Pillow",
    _qty: "200",
    _price: "$3",
    item_amount: "$300",
    invoice_status: "settled",
    amt: "$100",
    totl: "$400",
    status: true

  },
];
