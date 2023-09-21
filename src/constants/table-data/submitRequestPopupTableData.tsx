import {
  CrossIcon,
  CrossIconWithoutStyle,
  EditIconWithoutStyle,
} from '../../components/common/svg-components';
import moment from 'moment';
import styles from './tableData.module.scss';
import AuthorizedStatusDropdown from '../../components/common/status-dropdown/authorized-status-dropdown/AuthorizedStatusDropdown';
import { useState, useEffect, useRef } from 'react';

export const submitRequestPopupHeaderData: any = [
  {
    Header: 'DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.createdAt;
      const formattedDate = moment(originalDate).format('DD MMM YYYY');
      return <>{formattedDate}</>;
    },
  },
  {
    Header: 'DOC ID',
    accessor: '_id',
    Cell: (props: any) => {
      return (
        <p
          className={
            props?.row?.original?.authorization_status === 'APPROVED'
              ? styles.blueLinkText
              : ''
          }
          onClick={() => {
            if (props?.row?.original?.authorization_status === 'APPROVED') {
              props?.onOpen(props?.row?.original?._id);
            } else return;
          }}
        >
          {props?.row?.original?.document_id}
        </p>
      );
    },
  },
  {
    Header: 'SOURCE',
    accessor: 'request_source_type',
    Cell: ({ row }: any) => {
      let source = (row?.original?.request_source_type).replace('_', ' ');
      return <>{source}</>;
    },
  },
  {
    Header: 'SUB SOURCE',
    accessor: 'request_source',
  },
  {
    Header: 'DESTINATION',
    accessor: 'store_name',
    // Cell: ({ row }: any) => {
    //   let source = (row?.original?.request_destination).replace('_', ' ');
    //   return <>{source}</>;
    // },
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
  {
    Header: 'AUTHORIZATION STATUS',
    accessor: 'is_approved',
    Cell: ({ row }: any) => {
      let appointment_id = row?.original?._id;
      const [showOption, setShowOption] = useState<boolean>(false);
      const statusRef = useRef<any>();

      // function for close dropdown
      useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
          if (
            showOption &&
            statusRef.current &&
            !statusRef.current.contains(e.target)
          ) {
            setShowOption(false);
          }
        };

        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
          document.removeEventListener('mousedown', checkIfClickedOutside);
        };
      }, [showOption]);

      return (
        <>
          <AuthorizedStatusDropdown
            appointmentStatus={
              row?.original?.authorization_status === 'ENTERED'
                ? 'Entered'
                : row?.original?.authorization_status === 'APPROVED'
                ? 'Approved'
                : 'Rejected'
            }
            appointment_id={appointment_id}
            setShowOption={setShowOption}
            showOption={showOption}
          />
        </>
      );
    },
  },
  {
    Header: 'ACTION',
    accessor: '_action',
    Cell: (props: any) => {
      return (
        <>
          <div
            style={{
              display: 'flex',
              columnGap: '10px',
              justifyContent: 'center',
            }}
          >
            <EditIconWithoutStyle
              handleClick={() => {
                if (props?.row?.original?.authorization_status === 'ENTERED') {
                  props?.onRowClick(props?.row?.original?._id);
                } else return;
              }}
              customClass={
                props?.row?.original?.authorization_status === 'ENTERED'
                  ? styles.editIconStyle
                  : styles.editIconStyleDisable
              }
            />

            <p
              style={{
                background: '#CDD4D8',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              <CrossIconWithoutStyle
                fillColor="#FFFF"
                handleClick={() => {
                  if (
                    props?.row?.original?.authorization_status === 'ENTERED'
                  ) {
                    props?.onPopClose(props?.row?.original?._id);
                  }
                }}
                customClass={
                  props?.row?.original?.authorization_status === 'ENTERED'
                    ? styles.editIconStyle
                    : styles.editIconStyleDisable
                }
              />
            </p>
          </div>
        </>
      );
    },
  },
];
