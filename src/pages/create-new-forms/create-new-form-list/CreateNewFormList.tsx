import React, { FC, useEffect, useState } from "react";
import styles from "./createNewFormList.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../components/common/table/Table";
import Pagination from "../../../components/common/pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Loader from "../../../components/common/spinner/Loader";
import {
  getAllCreateNewForms,
  getAllCreateNewFormById,
  updateStatusForCreateNewFormById,
  getAllCreateNewFormModules
} from "../../../redux/features/create-new-form/createNewFormAsynActions";
import Popup from "../../../components/common/popup/Popup";
import NotesPopup from "../../../components/common/modal/notes-popup/NotesPopup";
import { requestGenerator } from "../../../utils/payloadGenerator";
import CreatedUsersPopup from "../../../components/common/created-users-popup/CreatedUsersPopup";
import { utcToDate } from "../../../utils/utils";
import Button from "../../../components/common/button/Button";
import DropDown from "../../../components/common/dropdown/DropDown";
import { DropDownArrowIcon, DropDownIcon } from "../../../components/common/svg-components";
import CreateNewFormPopUp from "../create-new-form-dialog/CreateNewFormAddEditDialog";
import Select, { components } from 'react-select';
import { CloseEyeIcon } from "../../../components/common/svg-components/index"
import { searchableSelectStyle } from "../../../utils/utils";
import CreateNewFormAddEditDialog from "../create-new-form-dialog/CreateNewFormAddEditDialog";
import CreateNewFormNotesDetailDialog from "../create-new-form-notes-detail-dialog/CreateNewFormNotesDetailDialog";
import { Controller, useForm } from "react-hook-form";
import { createNewFormsTableHeaderData } from "../../../constants/table-data/createNewFormsData";
import { getAllDepartment } from "../../../redux/features/department/departmentAsyncActions";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import PreviewFormDialog from "../preview-form-dialog/PreviewFormDialog";

interface ICreateNewFormList { }

const CreateNewFormList: FC<ICreateNewFormList> = () => {

  /* Dependency to navigate between pages */
  const navigate = useNavigate()
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  // Dependencies for searchable select */
  const [departments, setDepartments] = useState([])
  const [modules, setModules] = useState([])
  // Dependencies for searchable select */

  /* Selector to get the initial data of module from redux store*/
  const { isLoading, createNewFormData, isStatusUpdated } = useAppSelector(
    (state) => state.createNewForm
  );
  /* Selector to get the initial data of module from redux store*/

  /* Dialog dependencies */
  const [showCreateNewFormAddEditDialog, setShowCreateNewFormAddEditDialog] = useState<boolean>(false);
  const [selectedCreateNewFormId, setSelectedCreateNewFormId] = useState<string>("")
  const [showCreateNewFormNotesDetailDialog, setShowCreateNewFormNotesDetailDialog] = useState<boolean>(false);
  const [showNoteDetails, setShowNoteDetails] = useState<string>("");
  
  const [selectedFormDetails, setSelectedFormDetails] = useState<any>()
  const [showPreviewFormDialog, setShowPreviewFormDialog] = useState<boolean>(false);
  /* Dialog dependencies */

  /* Search dependencies */
  const [searchCreateNewForms, setSearchCreateNewForms] = useState<string>("");
  /* Search dependencies */

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, watch } = useForm({
    mode: "all"
  });
  const { errors, dirtyFields, isDirty, isValid } = formState;
  const form = watch()
  /* Form submission dependencies */

  /* Data table dependencies */
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions: any[] = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();
  // function for creating Page Index Array


  /* Initial API call for table data */
  useEffect(() => {
    const requestData = {
      search: searchCreateNewForms,
      page: pageIndex,
      pageSize: dataPerPage,
      department_id: form?.department_id?.value,
    };
    dispatch(getAllCreateNewForms(requestGenerator(requestData))).then(
      (result) => {
        setTotalPage(result.payload.lastPage)
      }
    );
  }, [dispatch, searchCreateNewForms, dataPerPage, pageIndex, isStatusUpdated, form.department_id]);

  /* Initial API call for table data */

  /* Initial API call for select list */
  useEffect(() => {

    /* API call - Select list for departments */
    dispatch(getAllDepartment(requestGenerator({}))).then(
      (result) => {
        const selectListData = result?.payload?.data;
        const filteredSelectListData = selectListData?.map((_element:any) => {
          return {
            value: _element._id,
            label: _element.name
          }
        })
        setDepartments(filteredSelectListData)
      }
    );
    /* API call - Select list for departments */

    /* API call - Select list for modules */
    // dispatch(getAllCreateNewFormModules(requestGenerator({}))).then(
    //   (result) => {
    //     const selectListData = result?.payload?.data;
    //     const filteredSelectListData = selectListData?.map((_element:any) => {
    //       return {
    //         value: _element._id,
    //         label: _element.name
    //       }
    //     })
    //     setModules(filteredSelectListData)
    //   }
    // );
    /* API call for select list - modules */
  }, []);
  /* Initial API call for select list */


  /* Create new form dialog Add/Edit dependencies - Open Dialog */
  const handleAddEditCreateNewFormDialogOpen = (_id: any) => {
    setShowCreateNewFormAddEditDialog(!showCreateNewFormAddEditDialog);
    if (_id && _id !== null && _id !== undefined) {
      setSelectedCreateNewFormId(_id);
    }
  };
  /* Create new form dialog Add/Edit dependencies - Open Dialog */

  /* Create new form dialog Add/Edit dependencies - Close Dialog */
  const handleAddEditCreateNewFormDialogClose = () => {
    setShowCreateNewFormAddEditDialog(false);
    setSelectedCreateNewFormId("");
  };
  /* Create new form dialog Add/Edit dependencies - Close Dialog */


  /* Create new form View notes detail dependencies - Open Dialog */
  const handleViewCreateNewFormNotesDetailDialogOpen = (_element: any) => {
    console.log(_element, 'note')
    setShowNoteDetails(_element.note)
    setShowCreateNewFormNotesDetailDialog(true)
  }
  /* Create new form View notes detail dependencies - Open Dialog */

  /* Create new form View notes detail dependencies - Open Dialog */
  const handleViewCreateNewFormNotesDetailDialogClose = (_element: any) => {
    setShowCreateNewFormNotesDetailDialog(false)
  }
  /* Create new form View notes detail dependencies - Open Dialog */

  /* Preview Form dependencies - Open Dialog */
  const handlePreviewFormDialogOpen = (_element: any) => {
    console.log(_element.form, 'element.form')
    setSelectedFormDetails(_element)
    setShowPreviewFormDialog(true)
  }
  /* Preview form dependencies - Open Dialog */

  /* Preview form dependencies - Open Dialog */
  const handlePreviewFormDialogClose = (_element: any) => {
    setShowPreviewFormDialog(false)
    setSelectedFormDetails("")
  }
  /* Preview form dependencies - Open Dialog */

  /* Change status dependencies and function definition */
  const [toggleValue, setToggleValue] = useState();
  const handleChangeStatus = (item: any) => {
    setToggleValue(item?._id);
    let dataToBeSent = {
      id: item?._id,
      data: {
        is_active: !item?.is_active,
      },
    };
    dispatch(updateStatusForCreateNewFormById(requestGenerator(dataToBeSent)));
  };
  /* Change status dependencies and function definition */

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.mainContainer}>
        {/* Header container */}
        <div className={styles.headerContainer}>
          <span className={styles.headerTitle}>Form Builder</span>
          <Button
            title="Create New Form"
            customClass={styles.addNewButtonStyle}
            handleClick={() => handleAddEditCreateNewFormDialogOpen(null)}
          />
        </div>
        {/* Header container */}


        {/* Filter container */}
        <div className={styles.filterContainer}>
          {/* <div className="common-input-wrapper">
            <label className="common-input-wrapper__label">Module</label>
            <div className="common-input-wrapper__searchable-select">
              {(
                <Controller
                  name="user_group_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={modules}
                      value={modules?.find((option: any) => option.value === field.value)}
                      onChange={(option: any) => field.onChange(option)}
                      placeholder="Module"
                      components={{ DropdownIndicator }}
                      isClearable={true}
                      backspaceRemovesValue={true}
                      styles={searchableSelectStyle}
                    />
                  )}
                />
              )}
            </div>
          </div> */}

          <div className="common-input-wrapper">
            <label className="common-input-wrapper__label">Department</label>
            <div className="common-input-wrapper__searchable-select">
              {(
                <Controller
                  name="department_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={departments}
                      value={departments?.find((option: any) => option.value === field.value)}
                      onChange={(option: any) => field.onChange(option)}
                      placeholder="Department"
                      components={{ DropdownIndicator }}
                      isClearable={true}
                      backspaceRemovesValue={true}
                      styles={searchableSelectStyle}
                    />
                  )}
                />
              )}
            </div>
          </div>
        </div>
        {/* Filter container */}


        {/* Table container */}
        <div className={styles.tableContainer}>
          <Table
            tableHeaderData={createNewFormsTableHeaderData}
            tableRowData={createNewFormData}
            handleAction={handleAddEditCreateNewFormDialogOpen}
            handleNotes={handleViewCreateNewFormNotesDetailDialogOpen}
            handleActiveMC={handleChangeStatus}
            toogleValue={toggleValue}
            handlePreview={handlePreviewFormDialogOpen}
          />


          {/* Pagination */}
          {createNewFormData && createNewFormData.length !== 0 ? (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          ) : (
            ""
          )}
          {/* Pagination */}
        </div>
        {/* Table container */}
      </div>

      {/* Dependency for add/edit dialog - Create New Form */}
      {
        showCreateNewFormAddEditDialog &&
        <CreateNewFormAddEditDialog
          selectedCreateNewFormId={selectedCreateNewFormId}
          handleClose={handleAddEditCreateNewFormDialogClose}
        />
      }
      {/* Dependency for add/edit dialog - Create New Form */}

      {/* Dependency for detail dialog - Notes */}
      {
         
        <CreateNewFormNotesDetailDialog
          open={showCreateNewFormNotesDetailDialog}
          handleClose={handleViewCreateNewFormNotesDetailDialogClose}
          noteDetails={showNoteDetails}
        />
      }
      {/* Dependency for detail dialog - Notes */}

      {/* Dependency for detail dialog - Form Preview */}
      {
        <PreviewFormDialog
          open={showPreviewFormDialog}
          selectedFormDetails={selectedFormDetails}
          handleClose={handlePreviewFormDialogClose}
        />
      }
      {/* Dependency for detail dialog - Form Preview */}
    </>
  );
};

export default CreateNewFormList;

export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {
          props.selectProps.menuIsOpen ? <DropDownArrowIcon fillColor="#797979" /> : <DropDownIcon fillColor="#797979" />
        }
      </components.DropdownIndicator>
    )
  );
};