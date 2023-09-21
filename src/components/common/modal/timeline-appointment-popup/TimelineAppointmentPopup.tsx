import { FC, useState, useEffect } from 'react';
import styles from './timeLineAppointmentPopup.module.scss';
import { CloseIcon, SearchButton } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import TableV2 from '../../table/tableV2/TableV2';
import { timelineAppointmentHeaderData } from '../../../../constants/table-data/timelineAppointmentPopupData';
import ImageUploadPopup from '../image-upload-popup/ImageUploadPopup';
import Popup from '../../popup/Popup';
import DocumentUploadPopup from '../document-upload-popup/DocumentUploadPopup';
import ScribeNotesPopup from '../scribe-notes-popup/ScribeNotesPopup';
import ImageViewerModal from '../image-viewer-modal/ImageViewerModal';
import ScribeImagesPopup from '../scribe-images-popup/ScribeImagesPopup';
import ImageZoomInOutModal from '../image-zoom-in-out-modal/ImageZoomInOutModal';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  getAllPatientHistory,
  getAllPatientHistoryYear,
} from '../../../../redux/features/diagnosis/diagnosisAsyncActions';
import Pagination from '../../pagination/Pagination';
import moment from 'moment';
import Loader from '../../spinner/Loader';

interface ITimelineAppointmentPopup {
  handleClose?: any;
  popData?: any;
  handleSubmitData?: any;
}

const TimelineAppointmentPopup: FC<ITimelineAppointmentPopup> = ({
  handleClose,
  popData,
  handleSubmitData,
}) => {
  const { isLoading, patientHistoryData, patientHistoryDataYear } =
    useAppSelector((state) => state.diagnosis);
  const [imagePopup, setImagePopup] = useState(false);
  const [documentPopup, setDocumentPopup] = useState<boolean>(false);
  const [option, setOption] = useState<any>();
  const [scribeNotes, setScribeNotes] = useState<boolean>(false);
  const [scribeImages, setScribeImages] = useState<boolean>(false);
  const [scribeNotesPreview, setScribeNotesPreview] = useState<boolean>(false);
  const [scribeNotesLink, setScribeNotesLink] = useState('');
  const [scribeImagesPreview, setScribeImagesPreview] =
    useState<boolean>(false);
  const [scribeImagesLink, setScribeImagesLink] = useState('');
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [date, setDate] = useState<any>();
  const [doctor, setDoctor] = useState('');
  const { patientDataObjectById } = useAppSelector((state) => state.patient);
  const dispatch = useAppDispatch();

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    let reqData = {
      patient_id: patientDataObjectById?._id,
      year: patientHistoryData[popData]?.year,
      doctorName: doctor,
      date: date,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    if (reqData.patient_id !== undefined) {
      dispatch(getAllPatientHistoryYear(requestGenerator(reqData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage);
        }
      );
    }
  }, [dispatch, patientDataObjectById, pageIndex, dataPerPage]);

  // SHOW NOTES PREVIEW

  const handleNotesPreview = (item: any) => {
    setScribeNotesPreview(!scribeNotesPreview);
    setScribeNotesLink(item?.path);
  };

  // SHOW NOTES PREVIEW

  const handleImagesPreview = (item: any) => {
    setScribeImagesPreview(!scribeImagesPreview);
    setScribeImagesLink(item?.path);
  };

  const handleSearch = () => {
    let reqData = {
      patient_id: patientDataObjectById?._id,
      year: patientHistoryData[popData]?.year,
      doctorName: doctor,
      date: date,
      page: 1,
      pageSize: 10,
    };
    if (reqData.patient_id !== undefined) {
      dispatch(getAllPatientHistoryYear(requestGenerator(reqData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage);
        }
      );
    }
  };

  return (
    <>
      {imagePopup && (
        <Popup
          Children={ImageUploadPopup}
          handleClose={() => setImagePopup(false)}
          setModelOpenClose={setImagePopup}
          popData={option?.id}
        />
      )}

      {documentPopup && (
        <Popup
          Children={DocumentUploadPopup}
          handleClose={() => setDocumentPopup(false)}
          setModelOpenClose={setDocumentPopup}
          popData={option?.id}
        />
      )}

      {scribeNotes && (
        <Popup
          Children={ScribeNotesPopup}
          handleClose={() => setScribeNotes(false)}
          handleNotesPreview={handleNotesPreview}
          popData={option?.id}
        />
      )}
      {scribeNotesPreview && (
        <Popup
          Children={ImageViewerModal}
          popData={scribeNotesLink}
          handleClose={() => setScribeNotesPreview(false)}
        />
      )}

      {scribeImages && (
        <Popup
          Children={ScribeImagesPopup}
          handleClose={() => setScribeImages(false)}
          handleImagesPreview={handleImagesPreview}
          popData={option?.id}
        />
      )}
      {scribeImagesPreview && (
        <Popup
          Children={ImageZoomInOutModal}
          popData={scribeImagesLink}
          handleClose={() => setScribeImagesPreview(false)}
        />
      )}

      {isLoading && <Loader />}

      <div
        className={styles.mainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Appointments Timeline</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.searchContainer}>
            <label htmlFor={'date'} className={styles.labelText}>
              Date
            </label>
            <input
              className={styles.searchInput}
              type="date"
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value === '') {
                  let reqData = {
                    patient_id: patientDataObjectById?._id,
                    year: patientHistoryData[popData]?.year,
                    doctorName: doctor,
                    date: '',
                    page: pageIndex,
                    pageSize: dataPerPage,
                  };
                  if (reqData.patient_id !== undefined) {
                    dispatch(
                      getAllPatientHistoryYear(requestGenerator(reqData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage);
                    });
                  }
                }
              }}
            />
            <label className={styles.labelText}>Doctor</label>
            <input
              className={styles.searchInput}
              type="text"
              value={doctor}
              placeholder="Search by doctor"
              onChange={(e) => {
                setDoctor(e.target.value);
                if (e.target.value === '') {
                  let reqData = {
                    patient_id: patientDataObjectById?._id,
                    year: patientHistoryData[popData]?.year,
                    doctorName: '',
                    date: date,
                    page: pageIndex,
                    pageSize: dataPerPage,
                  };
                  if (reqData.patient_id !== undefined) {
                    dispatch(
                      getAllPatientHistoryYear(requestGenerator(reqData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage);
                    });
                  }
                }
              }}
            />
            <SearchButton handleClick={() => handleSearch()} />
          </div>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={timelineAppointmentHeaderData}
              tableRowData={patientHistoryDataYear}
              handleClick={(item: any) => {
                setOption(item);
                if (item?.value === 'Image') {
                  setImagePopup(true);
                } else if (item?.value === 'Document') {
                  setDocumentPopup(true);
                } else if (item?.value === 'Scribed Notes') {
                  setScribeNotes(true);
                } else if (item?.value === 'Scribed Images') {
                  setScribeImages(true);
                }
              }}
              handleRowClick={handleSubmitData}
            />
          </div>
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
    </>
  );
};

export default TimelineAppointmentPopup;
