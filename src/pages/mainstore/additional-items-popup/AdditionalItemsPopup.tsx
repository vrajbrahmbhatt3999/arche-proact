import { FC, useState, useEffect } from "react";
import styles from "./additionalitemspopup.module.scss";
import { CloseIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import Divider from "../../../components/common/divider/Divider";
import Button from "../../../components/common/button/Button";
import SearchDropDown from "../../../components/common/search-dropdown/SearchDropDown";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useForm } from "react-hook-form";
import { setPurchaseOrderList } from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { getItemFromStore } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";

interface IAdditionalItemsPoPopup {
  handleClose?: any;
}

const AdditionalItemsPoPopup: FC<IAdditionalItemsPoPopup> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const [searchString, setSearchString] = useState("");
  const [supplierName, setSupplierName] = useState<any>({});
  const { getItemWithStoreData } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const { branchData } = useAppSelector((state) => state.login);

  useEffect(() => {
    let requestData = {
      store_id: branchData?.main_store?.[0]?._id,
    };
    dispatch(getItemFromStore(requestGenerator(requestData)));
  }, [branchData?.main_store, dispatch]);

  const onSubmit = (item: any) => {
    let data = {
      requested_qty: item?.qty,
      unit_Type: item?.unit,
      name: supplierName?.name,
      item_id: supplierName?._id,
    };
    dispatch(setPurchaseOrderList(data));
    handleClose();
  };
  return (
    <>
      <div
        className={styles.additionalItemsPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> Additional Items </p>
          <Divider customClass={styles.dividerStyle} />
        </div>
        <form
          className={styles.searchContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.searchMainContainer}>
            <span className={styles.text}>Search Items</span>
            <SearchDropDown
              placeholder=" "
              searchString={searchString}
              setSearchString={setSearchString}
              dropdownDataToSee={getItemWithStoreData}
              dropDownKeyName="name"
              customClass={styles.search}
              handleClick={(item: any, setVal: any, setShowDropdown: any) => {
                setVal(item?.name);
                setSupplierName(item);
                setShowDropdown(false);
              }}
            />
          </div>

          <div className={styles.textFieldContainer}>
            <label className={styles.text}> Unit</label>
            <input
              type="text"
              className={styles.inputSearch}
              {...register("unit")}
            />
          </div>
          <div className={styles.textFieldContainer}>
            <label className={styles.text}> Qty</label>
            <input
              type="text"
              className={styles.inputSearch}
              {...register("qty")}
            />
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdditionalItemsPoPopup;
