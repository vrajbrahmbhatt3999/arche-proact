import moment from "moment";
import styles from "./issuemainstoretabledata.module.scss";
import SearchDropDown from "../../../components/common/search-dropdown/SearchDropDown";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateAllPoData } from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { getAllSupplierDetails } from "../../../redux/features/purchase-invoice/purchaseAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { blockInvalidCharacter, disableArrowKey } from "../../../utils/utils";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import Select from "react-select";

export const poMainStoreHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.requested_date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "ITEM NAME",
    Cell: (props: any) => {
      return <>{props.row.original.item_name || props.row.original.name}</>;
    },
  },
  {
    Header: "MASTER UNIT TYPE",
    Cell: (props: any) => {
      const { inventoryPoData } = useAppSelector(
        (state) => state.inventoryRequest
      );

      const dispatch = useAppDispatch();
      const handleUnitType = (event: any) => {
        const value = {
          label: event.label,
          value: event.value,
        };

        let data = inventoryPoData?.map((s: any) => {
          if (s?._id === props.row.original._id) {
            return {
              ...s,
              updatedMasterUnitType: value,
            };
          } else {
            return s;
          }
        });
        dispatch(updateAllPoData(data));
      };

      return (
        <Select
          components={{ DropdownIndicator }}
          isSearchable={false}
          options={props.row.original?.unites?.map((item: any) => ({
            label: item.value,
            value: item._id,
          }))}
          onChange={(e: any) => handleUnitType(e)}
          maxMenuHeight={120}
          styles={{
            control: (provided) => ({
              ...provided,
              minWidth: "100px",
              minHeight: "30px",
              cursor: "pointer",
            }),
          }}
        />
      );
    },
  },
  {
    Header: "PO QTY(E).",
    Cell: (props: any) => {
      const { inventoryPoData } = useAppSelector(
        (state) => state.inventoryRequest
      );

      const dispatch = useAppDispatch();
      const updatePoQuantity = (event: any) => {
        const value = event.target.value;

        let data = inventoryPoData?.map((s: any) => {
          if (s?._id === props.row.original._id) {
            return {
              ...s,
              poQuantity: value,
            };
          } else {
            return s;
          }
        });
        dispatch(updateAllPoData(data));
      };
      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.issueQuantity}
          key={props?.row?.original?._id}
          onChange={updatePoQuantity}
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
    Header: "SUPPLIER NAME",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { inventoryPoData } = useAppSelector(
        (state) => state.inventoryRequest
      );

      const handleSupplierName = (item: any) => {
        let data = inventoryPoData?.map((s: any) => {
          if (s?._id === props.row.original._id) {
            return {
              ...s,
              supplier_id: item,
            };
          } else {
            return s;
          }
        });
        dispatch(updateAllPoData(data));
      };
      const [searchString, setSearchString] = useState("");
      const { suppliersInfo } = useAppSelector(
        (state) => state.purchaseInvoice
      );

      useEffect(() => {
        let data = {
          name: searchString,
        };
        dispatch(getAllSupplierDetails(requestGenerator(data)));
      }, [dispatch, searchString]);

      return (
        <SearchDropDown
          placeholder=" "
          searchString={searchString}
          setSearchString={setSearchString}
          dropdownDataToSee={suppliersInfo}
          dropDownKeyName="name"
          customClass={styles.search}
          handleClick={(item: any, setVal: any, setShowDropdown: any) => {
            handleSupplierName(item);
            setVal(item?.name);
            setShowDropdown(false);
          }}
        />
      );
    },
  },
];
