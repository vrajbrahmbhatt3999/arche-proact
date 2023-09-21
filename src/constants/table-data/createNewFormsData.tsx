import React from "react"
import { Link } from "react-router-dom"

/* tableHeaderColumns definition for create New Forms module */
export const createNewFormsTableHeaderData: any = [
    {
      Header: 'MODULE',
      accessor: (row: any) => {
        return row?.module_name || "-"
      },
    },
  
    {
      Header: 'DEPARTMENT',
      accessor: (row: any) => {
        return row?.department_id?.name
      },
    },
    {
      Header: 'CURRENT FORMS',
      accessor: 'name',
    },
    {
      Header: 'NOTES',
      accessor: 'notes',
      Cell: () => {
        return React.createElement(
          Link,
          { to: '/', className: 'viewLinkStyle' },
          'View'
        )
      },
    },
    {
      Header: 'STATUS',
    },
    {
      Header: 'ACTIONS'
    },
    {
      Header: 'PREVIEW'
    },
  ]
  /* tableHeaderColumns definition for create New Forms module */