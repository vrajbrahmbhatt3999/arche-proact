import { useAppSelector } from "../../../../../hooks";
import Loader from "../../../spinner/Loader";
import styles from "./style.module.scss";
import TableV2 from "../../../table/tableV2/TableV2";
import moment from "moment";

const AttachmentsHeaderData: any = [
  {
    Header: "Attachment Name",
    accessor: "name",
  },
  {
    Header: "Download Attachment",
    Cell: (props: any) => {
      const { getAllRadiologyTestData } = useAppSelector(
        (state) => state.radiologyJobs
      );
      return (
        <a
          download={`${moment(getAllRadiologyTestData?.createdAt).format(
            "DD-MMM-YYYY"
          )}_${getAllRadiologyTestData?.name?.replaceAll(" ", "_")}_${
            getAllRadiologyTestData?.job_no
          }_${props.row.original?.name}.${
            props.row.original?.url.split(".")[1]
          }`}
          href={props.row.original?.data_uri}
          className={styles.downloadButton}
        >
          Download
        </a>
      );
    },
  },
];

const DownloadAttachments = () => {
  const { isLoading, LoadFiles } = useAppSelector(
    (state) => state.radiologyJobs
  );
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.tableContainer}>
        <TableV2
          tableHeaderData={AttachmentsHeaderData}
          tableRowData={LoadFiles?.length ? LoadFiles : []}
        />
      </div>
      <p className={styles.note}>
        <strong> Note :</strong> Diacom viewer only supports DICOM(.dcm),
        NIFTI(.nii, for 3D), KTX(.ktx), HDR(.hdr) extensions.
      </p>
    </>
  );
};

export default DownloadAttachments;
