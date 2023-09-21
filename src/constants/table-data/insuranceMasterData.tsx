import styles from './tableData.module.scss';

export const inusranceMasterHeaderData: any = [
  {
    Header: 'MARKETPLACE COMPANY',
    accessor: 'marketplace_name',
  },
  {
    Header: 'INSURANCE COMPANY NAME',
    accessor: 'insurance_company_name',
  },
  {
    Header: 'PLAN',
    accessor: 'insurance_plan',
  },
  {
    Header: 'CLAIM TYPES',
    Cell: ({ row }: any) => {
      let claimType = row?.original?.claim_type;
      return (
        <>
          {claimType?.map((item: any) => (
            <p>{item}</p>
          ))}
        </>
      );
    },
  },
  // {
  //   Header: 'REIMBURSEMENT TO',
  //   Cell: ({ row }: any) => {
  //     let typeData = row?.original?.reimbursement_type;
  //     return (
  //       <>
  //         {typeData?.map((item: any) => (
  //           <p>{item}</p>
  //         ))}
  //       </>
  //     );
  //   },
  // },
  {
    Header: 'REMARKS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.remarks ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onClick(props?.row?.original);
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
    Header: 'DEPARTMENTS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.departments?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onRowClick(props?.row?.original);
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
    Header: 'DOCUMENTS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.attachments?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onPopClose(props?.row?.original?._id);
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
