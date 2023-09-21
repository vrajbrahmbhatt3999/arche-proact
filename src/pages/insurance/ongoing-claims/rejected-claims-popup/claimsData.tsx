import { Link } from "react-router-dom";
import React from "react"
import Select from "react-select/dist/declarations/src/Select";

// Create Jobs Table
export const rejectedClaimsHeaderData: any = [
  {
    Header: "CLAIMS",
    accessor: "_date",
  },
  {
    Header: "DATE INITIATED",
    accessor: "_dateinitiated",
  },
  {
    Header: "DATE SETTLED",
    accessor: "_datesettled",
  },
  {
    Header: "CLAIM AMOUNT",
    accessor: "claim_amount",
  },
  {
    Header: "SETTLED AMOUNT",
    accessor: "settled_amount",
  },
  {
    Header: "STATUS",
    Cell: () => {
      return (
        <select style={{ borderRadius: '6px', border: '1px solid #CDD4D8', padding: '3px 8px', fontSize: '14px', color: '#797979' }}>
          <option value="initiated">initiated</option>
          <option value="initiated">initiated</option>
        </select>
      )
    },
  },
  {
    Header: 'NOTES',
    accessor: '_notes',
    Cell: () => {
      return React.createElement(
        Link,
        { to: '/', className: 'viewLinkStyle' },
        'View'
      )
    },
  },
];

export const rejectedDummyData: any[] = [
  {
    _date: '-',
    _dateinitiated: "-",
    _datesettled: "-",
    claim_amount: '-',
    settled_amount: "-",
    claim_amt: "-",
    _notes: '',
  },
];