export const ViewServicesTableData: any = [
  {
    Header: "Plan",
      Cell: (props: any) => {
        return <>{props.row.original.treatmentPlanName ?? "-"}</>;
      },
  },
  {
    Header: "DOCTOR NAME",
    Cell: (props: any) => {
      return <>{props.row.original.doctor_id.doctor_name ?? ""}</>;
    },
  },
  {
    Header: "SESSIONS",
    Cell: (props: any) => {
      return <>{props.row.original.sessions ?? ""}</>;
    },
  },
  {
    Header: "SESSION#",
    Cell: (props: any) => {
      return <>{props.row.original.sessionsIndex ?? ""}</>;
    },
  },
  {
    Header: "STATUS",
    Cell: (props: any) => {
      return <div style={{textTransform: 'capitalize'}}>{props.row.original.status ?? ""}</div>;
    },
  },
  {
    Header: "ATTENDED BY",
    Cell: (props: any) => {
      return <>{props.row.original.attended_by_id.name ?? ""}</>;
    },
  },
];
