import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "../../../components/common/button/Button";
import { dentalToothTableHeaderData } from "../../../constants/table-data/dentalToothTableHeaderData";
import Popup from "../../../components/common/popup/Popup";
import Loader from "../../../components/common/spinner/Loader";
import { trimValue, uniqueID } from "../../../utils/utils";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import styles from './dental.module.scss'
import ToothModal from "../../../components/common/modal/tooth-modal/ToothModal";
import EndDiagnosisPopup from "../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { markStage } from "../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions";
import { clearDiagnosisId } from "../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice";

import {
    getAllTooths,
    getAllDentalTreatmentServices,
    updateDentalDiagnosisAction
  } from '../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions'
import DeleteMedicationPopup from "../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup";
import PatientHistoryNotesModal from "../../../components/common/modal/patient-history-notes-modal/PatientHistoryNotesModal";
import { setMessage } from "../../../redux/features/toast/toastSlice";
import { failure, success } from "../../../constants/data";
import { deleteDiagnosisTreatmentsData } from "../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice";

const Dental: FC = () => {
    // redux dipatch and store get funtionality
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userData } = useAppSelector((state) => state.login);
    const { createdDiagnosisId,isLoading, tooths, services,diagnosis_treatments } = useAppSelector((state) => state.dentistDiagnosis)
    const { patientFormData } = useAppSelector((state) => state.patientHistory);

    const [tableRow, setTableRow] = useState()
    const [toothModal, setToothModal] = useState<boolean>(false)
    const [endDiagnosis, setEndDiagnosis] = useState<boolean>(false);
    const [deleteRecord, setDeleteRecord] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<any>(null)

    const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
    const [notesPopupData, setNotesPopupData] = useState<any>({});
    const [notesPopupHeading, setNotesPopupHeading] = useState<any>("Notes");
   
    
    const uppertooths = tooths ? tooths.filter((item:any)=>item.jaw ==='upper' && item.age_group.includes('adult')):[];
    const lowertooths = tooths ? tooths.filter((item:any)=>item.jaw ==='lower' && item.age_group.includes('adult')):[];
    
    const base_image_url = 'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/';
    //formData?.age_group?.value==='kids'?'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/KIDS/':

   /*  const onToothClick:any = (tooth:any)=>{
      let index = selectTooths.findIndex((t:any)=>t._id.toString() === tooth._id.toString());
      if(index===-1){
          let updated_tooths= [...selectTooths,tooth];
          let updated_tooths_ids= [...selectToothIds,tooth._id];
          setSelectTooths(updated_tooths);
          setSelectToothsIds(updated_tooths_ids);
       }else{
          let updated_tooths= selectTooths.filter((t:any)=>t._id.toString() !== tooth._id.toString());
          let updated_tooths_ids= selectToothIds.filter((t:any)=>t !== tooth._id.toString());
          setSelectTooths(updated_tooths);  
          setSelectToothsIds(updated_tooths_ids);
       }
    } */
    const no_images_services= ["XRay","Exam","Composite","BU/P&C"];
 
  
    const ToothDivComponent:any = (props:any)=>{
      let tooth_find_array:any[]= [];
      diagnosis_treatments.map((th:any)=> { 
        let t =  JSON.parse(JSON.stringify(th));

        let find:any = t.selected_tooth.find((tooth:any)=>tooth._id === props.tooth._id.toString());
        if(find){
          find.procedures = [t.procedure];
          find.procedure_subtypes = [t.procedure_subtype];
  
          let index_found = tooth_find_array.findIndex((th:any)=>th._id.toString() === find._id.toString())
          if(index_found===-1){
            tooth_find_array.push(find);           
          }else{
            tooth_find_array[index_found]['treatment_images']= tooth_find_array[index_found]['treatment_images'].concat(find.treatment_images);
            tooth_find_array[index_found]['procedures']= tooth_find_array[index_found]['procedures'].concat(find.procedure);
            tooth_find_array[index_found]['procedure_subtypes']= tooth_find_array[index_found]['procedure_subtypes'].concat(find.procedure_subtype);
          }
        }
        return t;
      });
      let tooth_find = tooth_find_array.find((th:any)=>th._id.toString() === props.tooth._id.toString());
      if(tooth_find){
          return (
            <div className={`${styles.toothDiv}`}
                onClick={(e) => {
                    setToothModal(true)
                    //let tObj = {...props.tooth};
                    //tObj.original_images = [base_image_url+props.tooth.tooth_number+'a.png',base_image_url+props.tooth.tooth_number+'b.png'];
                    //tObj.treatment_images = showImageForSelectedTooth(tObj,'ARRAY');
                    //onToothClick(tObj);
                }}>
                { 
                  tooth_find.treatment_images.map((image:string)=>(
                    <img src={image} height="60px" width="40px" alt="Tooth" style={{marginBottom:'5px'}} />
                  ))
                }
                <p style={{ marginTop:'8px' }}>{props.tooth.tooth_number}</p>
            </div>
          )
      }else{
        return (
            <div className={`${styles.toothDiv}`}
                onClick={(e) => {
                  setToothModal(true)
                    //let tObj = {...props.tooth};
                    //tObj.original_images = [base_image_url+props.tooth.tooth_number+'a.png',base_image_url+props.tooth.tooth_number+'b.png'];
                    //tObj.treatment_images = showImageForSelectedTooth(tObj,'ARRAY');
                    //onToothClick(tObj);
                }}>
                <img src={base_image_url+props.tooth.tooth_number+'a.png'} height="60px" width="40px" alt="Tooth" style={{marginBottom:'5px'}} />
                <img src={base_image_url+props.tooth.tooth_number+'b.png'} height="60px" width="40px" alt="Tooth" />
                <p style={{ marginTop:'8px' }}>{props.tooth.tooth_number}</p>
            </div>
          )
        }
    }
     
    useEffect(() => {
        dispatch(getAllTooths(requestGenerator({})))
        dispatch(getAllDentalTreatmentServices(requestGenerator({})))
    },[])


  const showUpperTooths:any = ()=>{
    return (
       <div className={styles.toothRaw}>
           {
               uppertooths.map((tooth:any,index:number)=><ToothDivComponent tooth={tooth} key={'upper_'+index}/>)
           }
       </div>
    )
 }

  const showLowerTooths:any = ()=>{
   return (
      <div className={styles.toothRaw}>
          {
              lowertooths.map((tooth:any,index:number)=><ToothDivComponent tooth={tooth} key={'lower_'+index}/>)
          }
      </div>
   )
}
  const handleTableClick = (event_name: any,event_data:any) => {
      console.log('handleTableClick=',event_name,event_data);
      if(event_name==='DELETE_RECORD'){
        setDeleteRecord(true);
        setDeleteId(event_data);
      }else if(event_name==='VIEW_RECORD'){
        handleNotesModalOpen(event_data)
      }
  };

  /* VIEW DATA MODAL */
   const handleNotesModalOpen = (notesData: any) => {
    const requestNotesData = {
      diag_note: notesData.data,
      diag_apt_date: new Date(),
    };
    setNotesPopupData(requestNotesData);
    setShowNotesModal((prevState) => !prevState);
    setNotesPopupHeading(notesData.title); 
  };

  const handleNotesModalClose = () => {
    setNotesPopupData({});
    setShowNotesModal((prevState) => !prevState);
    setNotesPopupHeading('');
  };


  const handleRowClick = () => {
    //setDeleteRequestPopupdata("");
    //setShowDeleteRequestModal((prevState) => !prevState);
  };
 

  const handleEndDiagnosisModal = () => {
    setEndDiagnosis((prevState) => !prevState);
  };

   //function for end diagnosis
   const handleEndDiagnosis = () => {
    let reqData = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null
          ? patientFormData?.diag_id
          : "",
      diagnosis_stage: "E",
    };
    dispatch(markStage(requestGenerator(reqData))).then(() => {
      navigate("/dentist");
    });
    dispatch(clearDiagnosisId());
  };

  const handleDelete = () => {
    //const deletedRow = tableRow.findIndex((obj: any) => obj._id === deleteId)
    //console.log('deletedRow', deletedRow)
    dispatch(deleteDiagnosisTreatmentsData(deleteId))
    setDeleteId('');
    setDeleteRecord(false) 
  }


  const handleSave = () => {
   
    let reqData = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null && patientFormData?.diag_id,
      diagnosis_treatments: diagnosis_treatments,
    }
    if (patientFormData?.diag_id == null && createdDiagnosisId?.length === 0) {
      dispatch(
        setMessage({ message: 'Please do diagnosis first', type: failure })
      )
    } else {
      if(diagnosis_treatments?.length > 0) {
       dispatch(updateDentalDiagnosisAction(requestGenerator(reqData))).then(
          (e) => {
            if (e.type === 'dentalDiagnosis/updateDentalDiagnosis/fulfilled') {
              setMessage({ message: 'Saved Succssfully', type: success })
            }
          }
        ) 
      }
    }
  }



    return (
        <>
             {  toothModal && (
                    <Popup
                    Children={ToothModal}
                    handleClose={() => setToothModal(false)}
                    setModelOpenClose={()=>setToothModal(false)}
                    />
                )}

            {showNotesModal && (
                <Popup
                  Children={PatientHistoryNotesModal}
                  handleClose={handleNotesModalClose}
                  popData={notesPopupData}
                  heading={notesPopupHeading}
                />
            )}
              
            {deleteRecord && (
                <Popup
                  Children={DeleteMedicationPopup}
                  handleClose={() => setDeleteRecord(false)}
                  handleNo={() => setDeleteRecord(false)}
                  handleYes={() => handleDelete()}
                />
            )}

            {endDiagnosis && (
                <Popup
                Children={EndDiagnosisPopup}
                handleClose={handleEndDiagnosisModal}
                handleNo={handleEndDiagnosisModal}
                handleYes={handleEndDiagnosis}
                />
            )}
      
            <div className={styles.dentalContainer}>
              
                <div className={styles.toothSelection}>
                    <p className={styles.title}>Tooth Selection</p>
                    {showUpperTooths()}
                    {showLowerTooths()}
                </div>

                {/*<TableV2
                    tableHeaderData={dentalToothTableHeaderData}
                    tableRowData={diagnosis_treatments}
                    active={false}
                    handleClick={handleTableClick}
                    handleRowClick={handleRowClick}
                    setModelOpenClose={()=>setToothModal(false)}
                />

                <div className={styles.requestBtnContainer}>
                    <Button
                      title="Save & Next"
                      handleClick={() => handleSave()}
                      disable={
                        createdDiagnosisId
                          ? false
                          : patientFormData?.diag_id
                          ? false
                          : true
                      }
                    />
                    
                    <Button
                    title="End Diagnosis"
                    type="button"
                    customClass={styles.endButton}
                    handleClick={handleEndDiagnosisModal}
                    />
                    </div>*/}
            </div>
        </>
    )
}

export default Dental;
