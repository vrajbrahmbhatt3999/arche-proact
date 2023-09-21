import { FC, useState, useEffect } from "react";
import styles from "./purchaseinvoice.module.scss";
import Search from "../../../components/common/search/Search";
import Select from "react-select";
import Button from "../../../components/common/button/Button";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { pendingGrnHeaderData } from "../../../constants/table-data/pendingGrnTableData";
import Popup from "../../../components/common/popup/Popup";
import ConfirmPurchaseInvoicePopup from "../confirm-purchase-invoice-popup/ConfirmPurchaseInvoicePopup";
import SearchDropDown from "../../../components/common/search-dropdown/SearchDropDown";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllGrn, getAllSupplierDetails } from "../../../redux/features/purchase-invoice/purchaseAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { debounce } from "lodash";
import Pagination from "../../../components/common/pagination/Pagination";
import AttachfilesV2 from "../../../components/common/attach-files/AttachfilesV2";
import { EMR_ATTACHMENTS } from "../../../constants/constant";
import { fileType } from "../../../interfaces/interfaces";
import { dataURI } from "../../../utils/utils";

interface IPurchaseInvoice { }

const PurchaseInvoice: FC<IPurchaseInvoice> = () => {

  const [selectedOption, setSelectedOption] = useState<any>('option2');
  const [purchasePopup, setPurchasePopup] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [supplierDeatils, setsupplierDeatils] = useState<any>({
    supplier_id: '',
    date: '',
  });

  const [invoicePayload, setinvoicePayload] = useState<any>('');
  const [attachments, setAttachments] = useState<fileType[]>([]);
  console.log(attachments, "attachments")
  console.log(invoicePayload, "invoicePayload")

  const [dataPerPage, setDataPerPage] = useState<number>(5);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);


  const dispatch = useAppDispatch();
  const { suppliersInfo, grnList } = useAppSelector((state) => state.purchaseInvoice);

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const handleOptionChange = (e: any) => {
    const value = e.target.value
    setSelectedOption(value === selectedOption ? null : value)
  }

  const handleModalClose1 = () => {
    setPurchasePopup(!purchasePopup);
  };

  // Confirm PurchaseInvoice Popup
  const handleConformInvoicePopup = () => {
    setPurchasePopup(!purchasePopup);
  };

  const currencyData: any = [
    {
      // id: 0,
      value: "USD",
    },
    {
      // id: 1,
      value: "DOLLAR",
    },
  ];

  //  All Supplier Name API
  useEffect(() => {
    let data = {
      name: searchString,
    };
    setsupplierDeatils({ ...supplierDeatils, supplier_id: '' });
    dispatch(getAllSupplierDetails(requestGenerator(data)));
  }, [searchString]);


  // const dropdownOptions = suppliersInfo.map(
  //   (item: any) => item.name
  // );


  //  All GRN List API
  useEffect(() => {
    const requestData = {
      invoice_status: selectedOption === "option2" ? "PENDING" : "GENERATED",
      page: pageIndex,
      pageSize: dataPerPage,
      ...supplierDeatils
    }

    dispatch(getAllGrn(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    });
  }, [pageIndex, dataPerPage, supplierDeatils, selectedOption, dispatch])


  //  Debounce All GRN list api
  const deb = debounce((text) => setsupplierDeatils(text), 1000);

  let name, value;
  const handleGrnList = (e: any) => {
    name = e.target?.name;
    value = e.target?.value;
    deb({ ...supplierDeatils, [name]: value });
  }

  useEffect(() => {
    setinvoicePayload({ ...invoicePayload, file: attachments });
  }, [attachments])

  return (
    <>
      {purchasePopup && (
        <Popup
          Children={ConfirmPurchaseInvoicePopup}
          handleClose={() => handleModalClose1()}
          popData={invoicePayload}
        />
      )}

      <div className={styles.purchaseInvoiceMainContainer}>

        <div className={styles.searchContainer}>

          {/* Supplier Name */}
          <span className={styles.search}>
            <p className={styles.text}>Supplier Name</p>
            <SearchDropDown
              placeholder=" "
              searchString={searchString}
              setSearchString={setSearchString}
              dropdownDataToSee={suppliersInfo}
              dropDownKeyName='name'
              customClass={styles.search}
              handleClick={(item: any, setVal: any, setShowDropdown: any) => {
                setVal(item?.name);
                setsupplierDeatils({ ...supplierDeatils, supplier_id: item?._id })
                setShowDropdown(false);
              }}
            />
          </span>

          {/*  Date  */}
          <span className={styles.dateSearch}>
            <p className={styles.text}> Date</p>
            <input type="date" name='date' className={styles.inputSearch} onChange={(e) => handleGrnList(e)} />
          </span>
        </div>


        {/*  Supplier Doc No */}
        {selectedOption === "option2" ? (
          <div className={styles.searchContainer2}>
            <span className={styles.search}>
              <p className={styles.text}>Supplier's Document no.</p>
              <input type="text" className={styles.inputSearch} name="doc_no" onChange={(e) => setinvoicePayload({ ...invoicePayload, doc_no: e.target?.value })} />
            </span>

            <div className={styles.dropDownContainer}>
              <span className={styles.dropDownLabel}> Currency</span>

              <Select
                className={styles.select}
                placeholder=""
                closeMenuOnSelect={true}
                isSearchable={true}
                options={currencyData?.map((item: any) => ({
                  label: item?.value,
                  value: item?.value,
                }))}
                maxMenuHeight={200}
              />
            </div>
            <div className={styles.textFieldContainer}>
              <label className={styles.text}> Conversion</label>
              <input type="text" className={styles.inputSearch} />
            </div>
          </div>
        ) : (
          <div className={styles.searchContainer2}>
            <span className={styles.search}>
              <p className={styles.text}>Invoice No</p>
              <Search
                placeHolder=""
                customClassInput={styles.inputSearch}
              />
            </span>
          </div>
        )}

        <div className={styles.radioContainer}>
          <div className={styles.internalRadio}>
            <input
              className={styles.radioInput}
              type="radio"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
            />
            <label
              className={
                selectedOption === 'option2'
                  ? styles.internalText
                  : styles.disableText
              }
            >
              Pending GRN
            </label>
          </div>
          <div className={styles.externalRadio}>
            <input
              className={styles.radioInput}
              type="radio"
              name="options"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
            />
            <label
              className={
                selectedOption === 'option1'
                  ? styles.externalText
                  : styles.disableText
              }
            >
              Settled GRN
            </label>
          </div>

          <div className={styles.attechmentContainer}>
            <p className={styles.text}> Attachments</p>
            <AttachfilesV2
              // fileKey='file'
              isMultiSelect={true}
              // {...register(EMR_ATTACHMENTS)}
              // setValue={setValue}
              attachments={attachments}
              setAttachments={setAttachments}
              customClassFileName={styles.fileNameStyle}
            />
          </div>


        </div>
      </div>

      {selectedOption === "option2" ? (
        <div className={styles.tableMainContainer}>

          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={pendingGrnHeaderData}
              tableRowData={grnList}
              active={false}
            />

            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />

            <div className={styles.submitbtn}>
              <Button
                title="Generate Purchase Invoice"
                type="button"
                customClass={styles.reqSubmit}
                handleClick={handleConformInvoicePopup}
              />
            </div>
          </div>
        </div>
      ) : (

        <div className={styles.tableMainContainer}>

          <div className={styles.tableContainer1}>
            <TableV2
              tableHeaderData={pendingGrnHeaderData}
              tableRowData={grnList}
              active={false}
            />

          </div>
        </div>
      )}


    </>
  );
};
export default PurchaseInvoice;
