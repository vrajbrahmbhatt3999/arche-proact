import Select from "react-select";
import { useState } from "react";
import { poFormCurrencyData } from "../../../constants/data";
import { updatePoFormData } from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import styles from "./submitpobtnPopup.module.scss";
import { blockInvalidCharacter, disableArrowKey } from "../../../utils/utils";

export const poformHeaderData: any = [
  {
    Header: "ITEM CODE",
    accessor: "item_no",
  },
  {
    Header: "ITEMS",
    Cell: (props: any) => {
      return <>{props.row.original.item_name || props.row.original.name}</>;
    },
  },
  {
    Header: "PO SUPPLIER",
    Cell: (props: any) => {
      return <>{props.row.original?.supplier_id?.name}</>;
    },
  },
  {
    Header: "MASTER UNIT TYPE ",
    accessor: "updatedMasterUnitType.label",
  },
  {
    Header: "QTY",
    Cell: (props: any) => {
      const { poFormData } = useAppSelector((state) => state.inventoryRequest);
      const dispatch = useAppDispatch();
      const createUpdateDataPayload = (data: any, quantity: any) => {
        let tempArr = data?.map((item: any) => {
          if (item._id === props.row.original._id) {
            return {
              ...item,
              poQuantity: parseInt(quantity),
            };
          } else {
            return item;
          }
        });
        return tempArr;
      };
      const updateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value;
        dispatch(
          updatePoFormData(createUpdateDataPayload(poFormData, quantity))
        );
      };

      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.poQuantity}
          key={props?.row?.original?._id}
          onChange={updateQuantity}
          onKeyDown={(e: any) => {
            disableArrowKey(e);
            blockInvalidCharacter(e);
          }}
          onWheel={(e: any) => {
            e.target.blur();
          }}
        />
      );
    },
  },

  {
    Header: "PRICE",
    accessor: "sell_price",
  },
  {
    Header: "AMOUNT",
    Cell: (props: any) => {
      const isNanQuantity = Number(props.row.original.poQuantity);
      const isAddFunc = () => {
        if (isNaN(isNanQuantity)) {
          return props.row.original.sell_price;
        } else {
          return props.row.original.sell_price * isNanQuantity;
        }
      };

      return <>{isAddFunc()}</>;
    },
  },
  {
    Header: "DISC.%",
    disableSortBy: true,
    Cell: (props: any) => {
      const { poFormData } = useAppSelector((state) => state.inventoryRequest);
      const dispatch = useAppDispatch();
      const createUpdateDataPayload = (data: any, quantity: any) => {
        let tempArr = data?.map((item: any) => {
          if (item._id === props.row.original._id) {
            return {
              ...item,
              discount: parseInt(quantity),
            };
          } else {
            return item;
          }
        });
        return tempArr;
      };
      const updateDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value;
        dispatch(
          updatePoFormData(createUpdateDataPayload(poFormData, quantity))
        );
      };

      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.discount}
          defaultValue={0}
          key={props?.row?.original?._id}
          onChange={updateDiscount}
          onKeyDown={(e: any) => {
            disableArrowKey(e);
            blockInvalidCharacter(e);
          }}
          onWheel={(e: any) => {
            e.target.blur();
          }}
        />
      );
    },
  },
  {
    Header: "NET AMOUNT",
    Cell: (props: any) => {
      const isNanQuantity = Number(props.row.original.poQuantity);
      const isAddFunc = () => {
        if (isNaN(isNanQuantity)) {
          return props.row.original.sell_price;
        } else {
          let discount = props.row.original.discount
            ? (props.row.original.sell_price *
                isNanQuantity *
                props.row.original.discount) /
              100
            : 0;
          return props.row.original.sell_price * isNanQuantity - discount;
        }
      };

      return <>{isAddFunc()}</>;
    },
  },
  {
    Header: "CURRENCY (E)",
    Cell: (props: any) => {
      const [selectedItem, setSelectedItem] = useState<string | null>(
        props.value
      );

      // handle onChange event of the dropdown
      const handleChange = (e: any) => {
        setSelectedItem(e.value);
      };

      const formatOptionLabel = (option: any) => (
        <div>
          {option.icon}
          <span>{option.text}</span>
        </div>
      );
      return (
        <div className="App" style={{ width: "190px" }}>
          <a
            href="https://www.cluemediator.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "none" }}
          >
            Clue Mediator
          </a>

          <Select
            value={{
              label: poFormCurrencyData?.[1].text,
              value: poFormCurrencyData?.[1].value,
            }}
            // options={poFormCurrencyData?.map((s: any) => {
            //   return (
            //   label: s.text,
            //   value: s.value,
            //   )
            // })}
            options={poFormCurrencyData?.map((item: any) => ({
              label: item.text,
              value: item.value,
            }))}
            onChange={handleChange}
            // formatOptionLabel={formatOptionLabel}
            isDisabled
          />
        </div>
      );
    },
  },

  {
    Header: "EXPECTED DELIVERY DATE (E)",
    Cell: (props: any) => {
      const { poFormData } = useAppSelector((state) => state.inventoryRequest);
      const dispatch = useAppDispatch();
      const createUpdateDataPayload = (data: any, quantity: any) => {
        let tempArr = data?.map((item: any) => {
          if (item._id === props.row.original._id) {
            return {
              ...item,
              expected_delievery_date: quantity,
            };
          } else {
            return item;
          }
        });
        return tempArr;
      };
      const updateDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = event.target.value;
        dispatch(
          updatePoFormData(createUpdateDataPayload(poFormData, quantity))
        );
      };

      return (
        <input
          type="date"
          className={styles.inputField}
          value={props?.row?.original?.expected_delievery_date}
          defaultValue={1}
          key={props?.row?.original?._id}
          onChange={updateDiscount}
          style={{ width: "150px" }}
        />
      );
    },
  },
  {
    Header: "NOTES",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <span
          style={{ cursor: "pointer", color: "#0e26a3" }}
          onClick={() => {
            props?.onClick(props?.row?.original);
          }}
        >
          Add
        </span>
      );
    },
  },
];
