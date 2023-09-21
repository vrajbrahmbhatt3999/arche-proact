import { FC, useState, useEffect } from 'react';
import styles from './toothModal.module.scss';
import { CloseIcon, SearchButton } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import {
  allowedNumberOfDigitsAfterDecimal,
  trimValue,
  uniqueID,
  uuid,
} from '../../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import Loader from '../../spinner/Loader';
import Button from '../../../../components/common/button/Button';
import { useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { IToothSelectionForm } from '../../../../interfaces/interfaces';
import { setMessage } from '../../../../redux/features/toast/toastSlice';
import {
  UNIT_PRICE,
  QUANTITY,
  AGE_GROUP,
  PROCEDURE,
  PROCEDURE_SUBTYPE,
  SERVICE,
  COMPLAINT,
  NOTE,
  PRICE,
  BILLABLE,
  SELECTED_TOOTHS,
  DISCOUNT,
  TOTAL_AMOUNT,
  TYPE,
} from '../../../../constants/constant';
import { toothSelectionFormValidatorsValidators } from '../../../../form-validators/toothSelectionFormValidators';
import { addDiagnosisTreatmentsData } from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice';
import { getAllDentalTreatmentServicesByParentId } from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions';
import {
  concateTreatmentPlans,
  updateTreatmentPlansFromtable,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice';

interface IToothModal {
  handleClose?: any;
  popData?: any;
  setModelOpenClose?: any;
}

const ToothModal: FC<IToothModal> = ({
  handleClose,
  popData,
  setModelOpenClose,
}) => {
  const [procedure, setProcedure] = useState('');
  const [service, setService] = useState('');
  const [service_price, setServicePrice] = useState(0);

  const [procedure_subtype, setProcedureSubtype] = useState('');

  var [selectTooths, setSelectTooths] = useState<any>([]);
  var [selectToothIds, setSelectToothsIds] = useState<any>([]);
  //const [totalAmount, setTotalAmount] = useState<any>([]);

  const dispatch = useAppDispatch();
  const { branchData } = useAppSelector((state) => state.login);
  const { treatmentPlanTableData } = useAppSelector(
    (state) => state.treatmentPlans
  );

  const { tooths, services, child_services } = useAppSelector(
    (state) => state.dentistDiagnosis
  );
  const no_images_services = ['XRay', 'Exam', 'Composite', 'BU/P&C', 'Other'];
  const amalgum_options: any[] = [
    { label: 'A-B', value: 'A-B' },
    { label: 'A-BOL', value: 'A-BOL' },
    { label: 'A-Center', value: 'A-Center' },
    { label: 'A-D', value: 'A-D' },
    { label: 'A-full', value: 'A-full' },
    { label: 'A-L', value: 'A-L' },
    { label: 'A-M', value: 'A-M' },
    { label: 'A-MOD', value: 'A-MOD' },
    { label: 'A-V', value: 'A-V' },
    { label: 'A-WO-CENTER', value: 'A-WO-CENTER' },
  ];
  const billableOptions: any[] = [
    { label: 'YES', value: 'YES' },
    { label: 'NO', value: 'NO' },
  ];

  const ageGroupOptions: any[] = [
    { label: 'Adult', value: 'adult' },
    { label: 'Kids', value: 'kids' },
  ];
  //console.log('POPUP DATA =====',popData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<IToothSelectionForm>({
    defaultValues: {
      _id: popData?._id,
      type: popData && popData?.type ? popData?.type : 'TREATMENT',
      age_group: popData?.ageGroup
        ? popData?.ageGroup
        : { label: 'Adult', value: 'adult' },
      procedure: popData?.procedure_id,
      procedure_subtype: popData?.procedure_subtype,
      service: popData?.service_id,
      complaint: popData?.complaint,
      note: popData?.note,
      quantity: popData && popData.quantity ? popData.quantity : 1,
      unit_price: popData && popData.unit_price ? popData.unit_price : 0,
      price: popData && popData.price ? popData.price : 0,
      discount: popData && popData.discount ? popData.discount : 0,
      total_amount: popData && popData.total_amount ? popData.total_amount : 0,
      billable: popData?.billable === true ? 'YES' : 'NO',
      selected_tooth: popData?.selected_tooths,
    },
  });

  const formData: any = watch();
  const base_image_url =
    formData?.age_group?.value === 'kids'
      ? 'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/KIDS/'
      : 'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/';
  const showImageForSelectedTooth: any = (tooth: any, arrayOrDiv: any) => {
    let imageArray = [];
    let isForKids = base_image_url.includes('KIDS') ? true : false;
    if (!no_images_services.includes(procedure)) {
      if (procedure === 'Extraction') {
        let upper_image_url = base_image_url + procedure + '.png';
        imageArray.push({upper:upper_image_url,lower:null});
      } 
      else if (procedure === 'Implant'){
        if (isForKids){
          let upper_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'A.png';
          let lower_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'B.png';
          imageArray.push({upper:upper_image_url,lower:lower_image_url});
        }else{
          let upper_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'a.png';
          imageArray.push({upper:upper_image_url,lower:null}); 
        }
      } 
      
      else if (procedure === 'Amalgam') {
        if (isForKids) {
          let upper_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'A.png';
          let lower_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'B.png';
          imageArray.push({upper:upper_image_url, lower:lower_image_url});
        } else {
          let upper_image_url =
            base_image_url +
            procedure_subtype +
            '/' +
            tooth.tooth_number +
            'a.png';
          let lower_image_url =
            base_image_url +
            procedure_subtype +
            '/' +
            tooth.tooth_number +
            'b.png';

          let two_images = ['A-D', 'A-full', 'A-M', 'A-MOD', 'A-WO-CENTER'];
          if (two_images.includes(procedure_subtype)) {
            imageArray.push({upper:upper_image_url, lower:lower_image_url});
          } else {
            let upper_image_subprocedure = ['A-B', 'A-V'];
            let lower_image_subprocedure=['A-BOL','A-Center','A-L'];
            let upper_image_included = upper_image_subprocedure.includes(procedure_subtype);
            let lower_image_included = lower_image_subprocedure.includes(procedure_subtype);
           
            if(upper_image_included){
              let image_url = base_image_url + procedure_subtype + '/' + tooth.tooth_number +'a.png';
              imageArray.push({upper:image_url,lower:null});
            }
            
            if(lower_image_included){
              let image_url = base_image_url + procedure_subtype + '/' + tooth.tooth_number +'b.png';
              imageArray.push({upper:null,lower:image_url});
            }
          }
        }
      } 
      else if (procedure === 'Bridge' || procedure === 'Crown') {
        if (isForKids) {
          let upper_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'A.png';
          let lower_image_url = base_image_url + procedure + '/' + tooth.tooth_number + 'B.png';
          imageArray.push({upper:upper_image_url, lower:lower_image_url});
        } else {
          let upper_image_url =base_image_url + procedure +'/' + tooth.tooth_number +'a.png';
          let lower_image_url =base_image_url + procedure +'/' + tooth.tooth_number +'b.png';
          imageArray.push({upper:upper_image_url, lower:lower_image_url});
        }
      }
      else {
        let upper_image_url = '';
        let lower_image_url = '';
        if (isForKids) {
          upper_image_url =
            tooth.jaw === 'upper'
              ? base_image_url + procedure + '/' + tooth.tooth_number + 'A.png'
              : base_image_url + tooth.tooth_number + 'a.png';
          lower_image_url =
            tooth.jaw === 'lower'
              ? base_image_url + procedure + '/' + tooth.tooth_number + 'B.png'
              : base_image_url + tooth.tooth_number + 'b.png';
        } else {
          upper_image_url =
            tooth.jaw === 'upper'
              ? base_image_url + procedure + '/' + tooth.tooth_number + 'a.png'
              : base_image_url + tooth.tooth_number + 'a.png';
          lower_image_url =
            tooth.jaw === 'lower'
              ? base_image_url + procedure + '/' + tooth.tooth_number + 'b.png'
              : base_image_url + tooth.tooth_number + 'b.png';
        }
        imageArray.push({upper:upper_image_url, lower:lower_image_url});
      }
    } else {
    }
    if (arrayOrDiv === 'DIV') {
      return imageArray.length > 0 ? (
        <div>
          {imageArray.map((image: any) => (
            <div>
              <img
                src={image.upper}
                height="60px"
                width="40px"
                alt="Tooth"
                style={{ marginBottom: '5px' }}
              />
              <img
                src={image.lower}
                height="60px"
                width="40px"
                alt="Tooth"
                style={{ marginBottom: '5px' }}
              />
            </div>
          ))}
        </div>
      ) : (
        'No Image'
      );
    } else {
      return imageArray;
    }
  };

  const uppertooths = tooths
    ? tooths
        .filter(
          (item: any) =>
            item.jaw === 'upper' &&
            item.age_group.includes(formData?.age_group?.value)
        )
        .map((ti: any) => {
          let fti = { ...ti };
          if (formData?.age_group?.value === 'kids') {
            fti.display_tooth_number = ti.tooth_number + 40;
          } else {
            fti.display_tooth_number = ti.tooth_number;
          }
          return fti;
        })
    : [];
  const lowertooths = tooths
    ? tooths
        .filter(
          (item: any) =>
            item.jaw === 'lower' &&
            item.age_group.includes(formData?.age_group?.value)
        )
        .map((ti: any) => {
          let fti = { ...ti };
          if (formData?.age_group?.value === 'kids') {
            fti.display_tooth_number = ti.tooth_number + 40;
          } else {
            fti.display_tooth_number = ti.tooth_number;
          }
          return fti;
        })
    : [];

  const onToothClick: any = (tooth: any) => {
    let index = selectTooths.findIndex(
      (t: any) => t._id.toString() === tooth._id.toString()
    );
    let quantity = formData.quantity ? parseInt(formData.quantity) : 0;
    if (index === -1) {
      setSelectTooths([...selectTooths, tooth]);
      setSelectToothsIds([...selectToothIds, tooth._id.toString()]);
      quantity = quantity + 1;
    } else {
      setSelectTooths(
        selectTooths.filter(
          (t: any) => t._id.toString() !== tooth._id.toString()
        )
      );
      setSelectToothsIds(
        selectToothIds.filter((t: any) => t !== tooth._id.toString())
      );
      setValue(
        SELECTED_TOOTHS,
        selectToothIds.filter((t: any) => t !== tooth._id.toString())
      );
      quantity = quantity > 0 ? quantity - 1 : 0;
    }
    setValue(QUANTITY, quantity);
    handleChangePricing('quantity', quantity);
  };

  useEffect(() => {
    if (popData && Object.keys(popData).length > 0) {
      dispatch(
        getAllDentalTreatmentServicesByParentId(
          requestGenerator({ filters: { parent_id: popData?.precedure_id } })
        )
      );
      if (popData.precedure_name) {
        setProcedure(popData.precedure_name);
      }
      if (popData.procedure_id) {
        setProcedure(popData.procedure_name);
        Select_ProcedureSubtype(popData.procedure_subtype);
        setValue(PROCEDURE, {
          label: popData?.procedure_name,
          value: popData.procedure_id,
        });
        setValue(PROCEDURE_SUBTYPE, popData?.procedure_subtype);
      }
      if (popData.age_group) {
        popData.age_group === 'kids'
          ? setValue(AGE_GROUP, { label: 'Kids', value: 'kids' })
          : setValue(AGE_GROUP, { label: 'Adult', value: 'adult' });
      }
      if (popData.service_id) {
        setService(popData.service_name);
        setValue(SERVICE, {
          label: popData?.service_name,
          value: popData.service_id,
        });
      }
      setValue(BILLABLE, {
        label: popData?.billable===false ? 'NO':'YES',
        value: popData?.billable===false ? 'NO':'YES',
      });
      setValue(NOTE, popData?.note);
      setValue(TYPE, popData?.type);
      setValue(COMPLAINT, popData?.complaint);
      //setValue(QUANTITY,popData?.quantity || 1);
      setValue(UNIT_PRICE, popData?.unit_price || 0);
      setValue(PRICE, popData?.price || 0);
      setValue(DISCOUNT, popData?.discount || 0);
      setValue(TOTAL_AMOUNT, popData?.total_amount || 0);

      if (popData.selected_tooths && popData.selected_tooths.length > 0) {
        let quantity = formData.quantity;
        setSelectTooths(popData.selected_tooths);
        setSelectToothsIds(
          popData.selected_tooths.slice().map((itm: any) => itm._id.toString())
        );
        quantity = popData.selected_tooths.length;
        setValue(QUANTITY, quantity);
      }
    }
  }, []);

  const onSubmit = async (data: IToothSelectionForm) => {
    //console.log("onSubmit data", data);
    if (!data._id) {
      data._id = '' + new Date().getTime();
    }
    let updated_tooth = selectTooths.map((st: any) => {
      let obj = JSON.parse(JSON.stringify(st));
      obj.treatment_images = showImageForSelectedTooth(obj, 'ARRAY');
      obj.display_tooth_number =
        formData.age_group.value === 'kids'
          ? obj.tooth_number + 40
          : obj.tooth_number;
      return obj;
    });
    data.selected_tooth = updated_tooth;
    const tableData: any[] = [];
    const rowData = {
      _id: uuid(),
      type: formData?.type,
      treatmentPlanName: popData?.treatmentPlanName || '-',
      service_name: service,
      quantity: formData.quantity,
      unit_price: formData.unit_price,
      price: data.price,
      total_amount: data.total_amount,
      discount: data.discount,
      sessionsIndex: popData?.sessionsIndex || formData?.quatity,
      sessions: formData?.quatity,
      netPrice: allowedNumberOfDigitsAfterDecimal(data.price, 3),
      service_id: data?.service?.value,
      sessionId: popData?.sessionId || uniqueID(),
      procedure_name: procedure,
      age_group: formData.age_group,
      procedure_subtype: procedure_subtype,
      procedure_id: data?.procedure?.value,
      doctor_id: formData?.doctor?._id,
      doctor_name: formData?.doctor?.doctor_name,
      selected_tooths: updated_tooth,
      status: popData?.status || 'new',
      billable: data.billable.value === 'YES' ? true : false,
      billed: popData?.billed || 'not-billed',
      note: data.note,
      complaint: data.complaint,
      attended_by_id: popData?.attended_by_id || branchData?._id,
      diagnosis_id: popData?.diagnosis_id,
      show_delete_icon:
        popData.mode === 'CREATE' ? true : popData.show_delete_icon,
    };
    //console.log('rowData saving in State=',rowData);
    tableData.push(rowData);
    if (popData.mode === 'CREATE') {
      dispatch(concateTreatmentPlans(tableData));
    } else {
      let tempArr: any = [];
      tempArr = treatmentPlanTableData.map((item: any, index: number) => {
        try {
          if (item?._id === rowData._id) {
            return rowData;
          } else {
            return item;
          }
        } catch (error: any) {
          console.log('error', error);
          return error;
        }
      });
      dispatch(updateTreatmentPlansFromtable(tempArr));
    }
    reset();
    setSelectTooths([]);
    setSelectToothsIds([]);
    setModelOpenClose(false);
  };

  const ToothDivComponent: any = (props: any) => {
    let selected =
      selectToothIds && selectToothIds.includes(props.tooth._id) ? true : false;
    return (
      <div
        className={`${styles.toothDiv} ${selected ? styles.selected : ''}`}
        style={{
          pointerEvents:
            popData.mode === 'EDIT' && popData.type == 'EXISTING'
              ? 'none'
              : 'auto',
        }}
        onClick={(e) => {
          let tObj = { ...props.tooth };
          let original_images = [
            base_image_url + props.tooth.tooth_number + 'a.png',
            base_image_url + props.tooth.tooth_number + 'b.png',
          ];
          let treatment_images = showImageForSelectedTooth(tObj, 'ARRAY');
          let updated = Object.assign(props.tooth, {
            original_images,
            treatment_images,
          });
          onToothClick(updated);
        }}
      >
        <img
          src={base_image_url + props.tooth.tooth_number + 'a.png'}
          height="40px"
          width="30px"
          alt="Tooth"
          style={{ marginBottom: '5px' }}
        />
        <img
          src={base_image_url + props.tooth.tooth_number + 'b.png'}
          height="40px"
          width="30px"
          alt="Tooth"
        />

        <p style={{ marginTop: '8px',textAlign:'center' }}>{props.tooth.display_tooth_number}</p>
      </div>
    );
  };

  const showUpperTooths: any = () => {
    return (
      <div className={styles.toothRaw}>
        {uppertooths.map((tooth: any, index: number) => (
          <ToothDivComponent tooth={tooth} key={'upper_' + index} />
        ))}
      </div>
    );
  };

  const showLowerTooths: any = () => {
    return (
      <div className={styles.toothRaw}>
        {lowertooths.map((tooth: any, index: number) => (
          <ToothDivComponent tooth={tooth} key={'lower_' + index} />
        ))}
      </div>
    );
  };

  const chartModeRadio: any = () => (
    <div className={styles.labelField}>
      <label className={styles.labelText}>Entry Status :</label>
      <div className={styles.fieldErrorContainer}>
        <label htmlFor="mode_existing" className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            id="mode_existing"
            value="EXISTING"
            checked={formData?.type == 'EXISTING'}
            {...register(TYPE)}
            onChange={(e: any) => {
              setValue(TYPE, e.target.value);
              setValue(UNIT_PRICE, 0);
              setValue(PRICE, 0);
              setValue(DISCOUNT, 0);
              setValue(TOTAL_AMOUNT, 0);
              trigger(TYPE);
            }}
          />
          <span className={styles.customRadio} />
          Existing
        </label>

        <label htmlFor="mode_treatment" className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            id="mode_treatment"
            value="TREATMENT"
            checked={formData?.type == 'TREATMENT'}
            {...register(TYPE, toothSelectionFormValidatorsValidators[TYPE])}
            onChange={(e: any) => {
              setValue(TYPE, e.target.value);
              trigger(TYPE);
            }}
          />
          <span className={styles.customRadio} />
          Treatment Plan
        </label>

        {errors[TYPE] && (
          <p className="errorText">{errors[TYPE].message as any}</p>
        )}
      </div>
    </div>
  );

  const Select_Procedure: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Procedure<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="Procedure"
            closeMenuOnSelect={true}
            isSearchable={true}
            value={watch(PROCEDURE)}
            {...register(
              PROCEDURE,
              toothSelectionFormValidatorsValidators[PROCEDURE]
            )}
            options={services?.data?.map((item: any) => ({
              label: item?.name,
              value: item?._id,
            }))}
            onChange={(e: any) => {
              setValue(PROCEDURE, e);
              dispatch(
                getAllDentalTreatmentServicesByParentId(
                  requestGenerator({ filters: { parent_id: e.value } })
                )
              );
              setProcedure(e.label);
              setService('');
              trigger(PROCEDURE);
            }}
            maxMenuHeight={200}
          />
          {errors[PROCEDURE] && (
            <p className="errorText">{errors[PROCEDURE].message as any}</p>
          )}
        </div>
      </div>
    );
  };

  const Select_Service: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>Service</label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="Service"
            closeMenuOnSelect={true}
            isSearchable={true}
            isDisabled={!procedure ? true : false}
            value={watch(SERVICE)}
            {...register(SERVICE)}
            options={child_services?.data?.map((item: any) => ({
              label: item?.name,
              value: item?._id,
            }))}
            onChange={(e: any) => {
              setValue(SERVICE, e);
              let obj: any = child_services.data.find(
                (service: any) => service._id.toString() === e.value
              );
              let total = parseInt(formData?.quantity || 1) * obj.price;
              setValue(UNIT_PRICE, obj.price);
              setValue(PRICE, total);
              setValue(TOTAL_AMOUNT, total);
              setService(e.label);
              setServicePrice(obj.price);
              trigger(SERVICE);
            }}
            maxMenuHeight={200}
          />
        </div>
      </div>
    );
  };

  const Select_ProcedureSubtype: any = () => {
    return formData?.age_group?.value === 'adult' && procedure === 'Amalgam' ? (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
        Surface<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="Surface"
            closeMenuOnSelect={true}
            isSearchable={false}
            isDisabled={selectToothIds.length === 0 ? true : false}
            value={watch(PROCEDURE_SUBTYPE)}
            {...register(PROCEDURE_SUBTYPE)}
            options={amalgum_options}
            onChange={(e: any) => {
              setValue(PROCEDURE_SUBTYPE, e);
              let obj: any = amalgum_options.find(
                (subtype: any) => subtype.value === e.value
              );
              setProcedureSubtype(obj.value);
              trigger(PROCEDURE_SUBTYPE);
            }}
            maxMenuHeight={200}
          />
        </div>
      </div>
    ) : (
      ''
    );
  };

  const Input_SelectedToothIds: any = () => {
    return (
      <div className={styles.labelField}>
        <div className={styles.fieldErrorContainer}>
          <input
            type="hidden"
            {...register(SELECTED_TOOTHS)}
            onChange={(e) => trimValue(e)}
          />
          {errors[SELECTED_TOOTHS] && (
            <p className="errorText">{errors[SELECTED_TOOTHS].message}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_UnitPrice: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Unit Price<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <input
            type="number"
            min="1"
            step={1}
            className={styles.inputField}
            placeholder="Enter Unit Price"
            {...register(
              UNIT_PRICE,
              toothSelectionFormValidatorsValidators[UNIT_PRICE]
            )}
            onChange={(e: any) => {
              trimValue(e);
              handleChangePricing('unit_price', parseFloat(e.target.value));
              setServicePrice(e.target.value);
            }}
          />
          {errors[UNIT_PRICE] && (
            <p className="errorText">{errors[UNIT_PRICE].message as any}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_Price: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Price<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <input
            type="number"
            min="1"
            step={1}
            readOnly={true}
            disabled={true}
            className={styles.inputField}
            placeholder="Enter Price"
            {...register(PRICE, toothSelectionFormValidatorsValidators[PRICE])}
            onChange={(e: any) => {
              trimValue(e);
            }}
          />
          {errors[PRICE] && (
            <p className="errorText">{errors[PRICE].message}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_Discount: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Discount<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <input
            type="number"
            min="0"
            step={1}
            className={styles.inputField}
            placeholder="Enter Discount"
            {...register(
              DISCOUNT,
              toothSelectionFormValidatorsValidators[DISCOUNT]
            )}
            onChange={(e) => {
              trimValue(e);
              handleChangePricing('discount', parseFloat(e.target.value));
            }}
          />
          {errors[DISCOUNT] && (
            <p className="errorText">{errors[DISCOUNT].message}</p>
          )}
        </div>
      </div>
    );
  };

  const handleChangePricing = (fieldName: string, value: number) => {
    let formValue: any = getValues();
    let discount: any =
      fieldName === 'discount' ? value : parseFloat(formValue.discount);
    let quantity: any =
      fieldName === 'quantity' ? value : parseInt(formValue.quantity);
    let unit_price: any =
      fieldName === 'unit_price' ? value : parseFloat(formValue.unit_price);
    if (discount === 'NaN') {
      discount = 0;
    }
    let price = quantity * unit_price;
    let total = price - discount;
    setValue(PRICE, price);
    setValue(TOTAL_AMOUNT, total);
  };

  const Input_TotalAmount: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Total Amount<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <input
            type="number"
            min="0"
            step={1}
            readOnly={true}
            disabled={true}
            className={styles.inputField}
            placeholder="Enter Total Amount"
            {...register(
              TOTAL_AMOUNT,
              toothSelectionFormValidatorsValidators[TOTAL_AMOUNT]
            )}
            onChange={(e) => trimValue(e)}
          />
          {errors[TOTAL_AMOUNT] && (
            <p className="errorText">{errors[TOTAL_AMOUNT].message}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_Quantity: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Quantity<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <input
            type="number"
            min="0"
            step={1}
            className={styles.inputField}
            placeholder="Enter Quantity"
            {...register(
              QUANTITY,
              toothSelectionFormValidatorsValidators[QUANTITY]
            )}
            onChange={(e) => {
              trimValue(e);
              handleChangePricing('quantity', parseInt(e.target.value));
            }}
          />
          {errors[QUANTITY] && (
            <p className="errorText">{errors[QUANTITY].message}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_Complaint: any = () => {
    return (
      <div className={styles.labelField}>
       
        <div className={styles.fieldErrorContainer}>
        <label className={styles.labelText} style={{ float:'left' }}>
          Complaint<span className="asterick">*</span>
        </label><br/>
          <textarea
            className={styles.textareaField}
            placeholder="Enter Complaint"
            rows={10}
            {...register(
              COMPLAINT,
              toothSelectionFormValidatorsValidators[COMPLAINT]
            )}
            onChange={(e) => trimValue(e)}
          ></textarea>
          {errors[COMPLAINT] && (
            <p className="errorText">{errors[COMPLAINT].message as any}</p>
          )}
        </div>
      </div>
    );
  };

  const Input_Note: any = () => {
    return (
      <div className={styles.labelField}>
        <div className={styles.fieldErrorContainer}>
          <label className={styles.labelText}  style={{ float:'left' }}>Note</label><br/>
          <textarea
            className={styles.textareaField}
            placeholder="Enter Note"
            rows={8}
            {...register(NOTE)}
            onChange={(e) => trimValue(e)}
          ></textarea>
          {errors[NOTE] && <p className="errorText">{errors[NOTE].message}</p>}
        </div>
      </div>
    );
  };

  const Select_Billable: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          Billable<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="Billable"
            closeMenuOnSelect={true}
            isSearchable={true}
            value={watch(BILLABLE)}
            {...register(
              BILLABLE,
              toothSelectionFormValidatorsValidators[BILLABLE]
            )}
            options={billableOptions}
            onChange={(e: any) => {
              setValue(BILLABLE, e);
              trigger(BILLABLE);
            }}
            maxMenuHeight={200}
          />
          {errors[BILLABLE] && (
            <p className="errorText">{errors[BILLABLE].message as any}</p>
          )}
        </div>
      </div>
    );
  };

  const Select_AgeGroup: any = () => {
    return (
      <div className={styles.labelField}>
        <label className={styles.labelText}>
          AgeGroup<span className="asterick">*</span>
        </label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="AgeGroup"
            closeMenuOnSelect={true}
            isSearchable={true}
            value={watch(AGE_GROUP)}
            options={ageGroupOptions}
            {...register(
              AGE_GROUP,
              toothSelectionFormValidatorsValidators[AGE_GROUP]
            )}
            onChange={(e: any) => {
              setValue(AGE_GROUP, e);
              trigger(AGE_GROUP);
            }}
            maxMenuHeight={200}
          />
          {errors[AGE_GROUP] && (
            <p className="errorText">{errors[AGE_GROUP].message as any}</p>
          )}
        </div>
      </div>
    );
  };

  const showBillInputs = () => {
    return formData?.type == 'TREATMENT' ? (
      <div>
        {Input_Quantity()}
        {Input_UnitPrice()}
        {Input_Price()}
        {Input_Discount()}
        {Input_TotalAmount()}
        {Select_Billable()}
      </div>
    ) : (
      ''
    );
  };

  return (
    <>
      <div
        className={styles.popupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />

        <div className={styles.toothSelection}>
          <p className={styles.title}>Dental Chart</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContainer}>
            <div>
              <div>
                {showUpperTooths()}
                {showLowerTooths()}
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formContainer}
            >
              <div className={styles.form}>
                <div>
                  {chartModeRadio()}
                  {Input_Complaint()}
                </div>

                <div>
                  {Input_SelectedToothIds()}
                  {/*  {Select_AgeGroup()} */}
                 
                  {Select_Procedure()}
                  {Select_ProcedureSubtype()}
                  {Select_Service()}
                  {Input_Note()}

                </div>
                <div>
                {showBillInputs()}
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  title={popData?.mode === 'EDIT' ? 'Update' : 'Create'}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToothModal;
