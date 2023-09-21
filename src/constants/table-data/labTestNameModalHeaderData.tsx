export const labTestNameModalHeaderData: any = [
  {
    Header: "TEST NO.",
    accessor: "test_no",
    Cell: (props: any) => {
      const sixDigitString = props?.row?.original?.test_no
        .toString()
        .padStart(6, "0");
      return <>{sixDigitString ? <span>{sixDigitString}</span> : "-"}</>;
    },
    disableSortBy: true,
  },
  {
    Header: "TEST NAME",
    accessor: "test_name",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.test_name ? (
            <span>{props?.row?.original?.test_name?.toUpperCase()}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
    disableSortBy: true,
  },
];
