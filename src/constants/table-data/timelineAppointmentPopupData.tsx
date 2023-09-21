import Select from 'react-select';
import moment from 'moment';
import styles from './tableData.module.scss';

let dropdownData = ['Image', 'Document', 'Scribed Notes', 'Scribed Images'];

export const timelineAppointmentHeaderData: any = [
  {
    Header: 'DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.createdAt;
      const formattedDate = moment(originalDate).format('DD MMM YYYY');
      return <>{formattedDate}</>;
    },
  },
  {
    Header: 'DOCTOR',
    accessor: 'doctor_name',
  },
  {
    Header: 'ATTACHMENTS',
    Cell: (props: any) => {
      return (
        <Select
          className={styles.select}
          placeholder="Select"
          closeMenuOnSelect={true}
          isSearchable={true}
          options={dropdownData?.map((item: any) => ({
            label: item,
            value: item,
          }))}
          value={null}
          onChange={(e: any) => {
            let data = {
              id: props.row.original._id,
              value: e.value,
            };
            props?.onClick(data);
          }}
          maxMenuHeight={200}
        />
      );
    },
  },
  {
    Header: 'PATIENT HISTORY',
    Cell: (props: any) => {
      return (
        <p
          className={styles.blueLinkText}
          onClick={() => {
            props?.onRowClick(props?.row?.original);
          }}
        >
          Patient history
        </p>
      );
    },
  },
];
