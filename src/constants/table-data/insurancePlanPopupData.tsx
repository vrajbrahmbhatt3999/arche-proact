import moment from 'moment';
import styles from './tableData.module.scss';

export const insurancePlanPopupData: any = [
  {
    Header: 'POLICY NO.',
    accessor: 'policy_no',
  },
  {
    Header: 'INSURANCE PLAN',
    accessor: 'insurance_plan',
  },
  {
    Header: 'DEPARTMENT',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.departments?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onPopClose(props?.row?.original?.departments);
              }}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      );
    },
  },
  {
    Header: 'EXPIRY DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.expiry_date;
      const formattedDate = moment(originalDate).format('DD MMM YYYY');
      return <>{formattedDate}</>;
    },
  },
  {
    Header: 'CLAIM TYPE',
    accessor: 'claim_type',
  },
  // {
  //   Header: "REIMBURSEMENT TYPE",
  //   accessor: "reimbursement_type",
  // },
  {
    Header: 'ATTACHMENTS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.attachments?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onClick(props?.row?.original?.attachments);
              }}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      );
    },
  },
];
