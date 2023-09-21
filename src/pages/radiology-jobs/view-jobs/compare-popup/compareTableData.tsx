import { IcomparepopupTableData } from '../../../../interfaces/interfaces'
import styles from './comparePopup.module.scss'

// View Jobs Compare Popup Table
export const comparePopupTableHeaderData: any = [
  {
    Header: 'DATE',
    accessor: '_date',
  },
  {
    Header: 'TEST GROUP',
    accessor: 'test_group',
  },
  {
    Header: 'TEST',
    accessor: '_test',
  },
  {
    Header: 'RESULTS ',
    accessor: '_results',
    Cell: (props: any) => {
      return (
        <>
          <div className={styles.resultViewContainer}>
            <span className={styles.resultView} onClick={() => props.onClick()}>
              {' '}
              View
            </span>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkboxField} />
              <span className={styles.checkboxLabel}></span>
            </label>
          </div>
        </>
      )
    },
  },
]

export const comparePopupTableDummyData: any[] = [
  {
    _date: '29-Jun-2022',
    test_group: 'Test Group',
    _test: 'WBC',
    _results: 'view',
  },
  {
    _date: '29-Jun-2022',
    test_group: '-',
    _test: 'RBC',
    _results: 'view',
  },
  {
    _date: '29-Jun-2022',
    test_group: '-',
    _test: 'Hb',
    _results: 'view',
  },
  {
    _date: '29-Jun-2022',
    test_group: '-',
    _test: 'X-ray',
    _results: 'view',
  },
  {
    _date: '29-Jun-2022',
    test_group: 'Test Group',
    _test: 'WBC',
    _results: 'view',
  },
  {
    _date: '29-Jun-2022',
    test_group: '-',
    _test: 'RBC',
    _results: 'view',
  },
]
