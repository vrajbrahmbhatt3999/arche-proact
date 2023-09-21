import moment from "moment";
import styles from "./purchaseInvoiceTableData.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updatedPurchaseInvoiceList } from "../../redux/features/purchase-invoice/purchaseInvoiceSlice";
import { allowedNumberOfDigitsAfterDecimal } from "../../utils/utils";


export const purchaseInvoiceHeaderData: any = [
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      const formattedDate = moment(row?.original?.receive_date).format('DD MMM YYYY');
      return <>{formattedDate}</>
    },
  },
  {
    Header: "PI No.",
    accessor: "po_no",
  },
  {
    Header: "GRN",
    accessor: "invoice_no",
  },
  {
    Header: "ITEM",
    accessor: "name",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          {
            receivedItems?.map((item: any) => {
              return (
                <p>
                  {item?.name}
                </p>
              )
            })
          }

        </>
      )
    },

  },

  {
    Header: " QTY",
    accessor: "qty",
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
    accessor: "price",
    Cell: (props: any) => {

      const [error, setError] = useState("");

      let receivedItems = props?.row?.original?.received_items;
      const price = allowedNumberOfDigitsAfterDecimal(props?.row?.original?.unitPrice, 3);
      const { conformPurchaseInvoiceList } = useAppSelector((state) => state.purchaseInvoice);

      const dispatch = useAppDispatch()

      const validateInput = (inputValue: any) => {
        const pattern = /^(?:[1-9]|[1-9][0-9])$/;
        return pattern.test(inputValue);
      };

      const handlePriceChange = (event: any, receivedItem: any) => {

        console.log(receivedItem, "item")
        console.log(event.target.value, 'eve')

        const discount = event.target.value;
        const isValid = validateInput(discount);
        if (isValid === false) {
          setError("Please enter discount");
        }
        if (isValid === true) {
          setError("");
        }

        const updatedData = conformPurchaseInvoiceList.map((item: any) => {
          if (item?._id === props?.row?.original?._id) {
            return {
              ...item,
              received_items: item?.received_items?.map((items: any) => {
                if (items?._id === receivedItem?._id) {
                  return {
                    ...items,
                    discount: parseInt(discount)
                  }
                }
                return items

              }),
            };
          }
          return item;
        });

        dispatch(updatedPurchaseInvoiceList(updatedData));
      };
      return (
        <>
          {
            props?.row?.original?.received_items?.map((receivedItem: any) => {
              return (
                <div>
                  <input
                    className={styles.inputContainer}
                    type="number"
                    value={receivedItem?.price}
                    onWheel={(e: any) => {
                      e.target.blur();
                    }}
                    onChange={(e: any) => { return handlePriceChange(e, receivedItem); }}
                  />
                  {/* <p className="dashboardFormError">{error}</p> */}
                </div>

              )
            })
          }
        </>
      )
    },

  },

  {
    Header: "ITEM AMOUNT",
    accessor: "total_amount",
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
    Header: "DISCOUNT",
    accessor: "discount",
    Cell: (props: any) => {

      const [error, setError] = useState("");
      const receivedDiscount = props?.row?.original?.received_items?.discount ?? 0;
      const { conformPurchaseInvoiceList } = useAppSelector((state) => state.purchaseInvoice);

      const dispatch = useAppDispatch();

      const validateInput = (inputValue: any) => {
        const pattern = /^(?:[1-9]|[1-9][0-9])$/;
        return pattern.test(inputValue);
      };

      const handleQuantityChange = (event: any, receivedItem: any) => {

        // console.log(receivedItem, "item")
        // console.log(event.target.value, 'eve')

        const discount = event.target.value;
        const isValid = validateInput(discount);
        if (isValid === false) {
          setError("Please enter discount");
        }
        if (isValid === true) {
          setError("");
        }

        const updatedData = conformPurchaseInvoiceList.map((item: any) => {
          if (item?._id === props?.row?.original?._id) {
            return {
              ...item,
              received_items: item?.received_items?.map((items: any) => {
                if (items?._id === receivedItem?._id) {
                  return {
                    ...items,
                    discount: parseInt(discount),
                  }
                }
                return items

              }),
            };
          }
          return item;
        });

        dispatch(updatedPurchaseInvoiceList(updatedData));
      };

      return (
        <>
          {
            props?.row?.original?.received_items?.map((receivedItem: any) => {
              return (
                <div>
                  <input
                    className={styles.inputContainer}
                    type="number"
                    value={receivedItem?.discount ?? 0}
                    onWheel={(e: any) => {
                      e.target.blur();
                    }}
                    onChange={(e: any) => { return handleQuantityChange(e, receivedItem); }}
                  />
                  {/* <p className="dashboardFormError">{error}</p> */}
                </div>

              )
            })
          }
        </>
      )
    },
  },

  {
    Header: "NET AMOUNT",
    accessor: "net_amount",
    Cell: (props: any) => {
      let receivedItems = props?.row?.original?.received_items
      return (
        <>
          {
            receivedItems?.map((item: any) => {
              return (
                <p>
                  {item?.netAmount - item?.discount}
                </p>
              )
            })
          }

        </>
      )
    },
  },

  {
    Header: "TOTAL",
    accessor: "total",
    Cell: (props: any) => {
      const receivedItems = props?.row?.original?.received_items;

      let total = 0;
      receivedItems?.forEach((row: any) => {
        const itemDiscount = row.discount;
        const itemAmount = row.netAmount;
        const amount = itemAmount - itemDiscount;
        total += amount;

      });

      return (
        <>
          <span>
            {total}
          </span>

        </>
      )
    },
  },

  // {
  //   Header: "PI TOTAL",
  //   Cell: (props: any) => {
  //     const receivedItems = props?.row?.original?.received_items;

  //     let total = 0;
  //     let invoiceTotal = 0;
  //     receivedItems?.forEach((row: any) => {
  //       const itemDiscount = row.discount;
  //       const itemAmount = row.netAmount;
  //       const amount = itemAmount - itemDiscount;
  //       total += amount;
  //       invoiceTotal += total;

  //     });

  //     return (
  //       <>
  //         <span>
  //           {invoiceTotal}
  //         </span>

  //       </>
  //     )
  //   },
  // },

];


export const purchaseInvoiceData: any = [
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
