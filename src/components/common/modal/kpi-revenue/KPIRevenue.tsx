import { FC } from 'react'
import styles from './kpiRevenue.module.scss'
import Button from '../../button/Button'
import Select from 'react-select'
import { targetsData } from '../../../../constants/data'
import { Fall, Rise } from '../../svg-components'
import { colors } from '../../../../constants/color'
import ComparativeGraph from '../../../../assets/images/ComparativeGraph.png'
import PatientInflowChart from '../../../../assets/images/PatientInflowChart.png'
interface IRadiologyReportModal {
  handleClose?: any
  handleOpen?: any
}

const KPIRevenueModal: FC<IRadiologyReportModal> = ({
  handleClose,
  handleOpen,
}) => {
  return (
    <div className={styles.kpiRevenueMainContainer}>
      <div className={styles.ButtonDropdownContanier}>
        <Button
          title="Target | Revenue"
          type="button"
          customClass={styles.targetButton}
        />
        <div className={styles.dropDownContainer}>
          <div className={styles.dropdown}>
            <span className={styles.dropdownName}>Month</span>
            <Select
              className={styles.selectInputField}
              isSearchable={true}
              isClearable={true}
              options={[]}
              maxMenuHeight={200}
              closeMenuOnSelect={false}
              placeholder="Select Month"
            />
          </div>
          <div className={styles.dropdown}>
            <span className={styles.dropdownName}>Year</span>
            <Select
              className={styles.selectInputField}
              isSearchable={true}
              isClearable={true}
              options={[]}
              maxMenuHeight={200}
              closeMenuOnSelect={false}
              placeholder="Select Month"
            />
          </div>
        </div>
      </div>
      <div className={styles.targetsKPIContainer}>
        <div className={styles.title}>Targets KPI for Doctors</div>
        <div className={styles.kpiCardsContainer}>
          {targetsData?.map((item: any, index: number) => {
            return (
              <div
                key={`${item.label}-${index}`}
                className={styles.kpiBoxContainer}
              >
                <div className={styles.kpiValueLabelContainer}>
                  <span className={styles.kpiValue}>$ {item?.value}</span>
                  <span className={styles.kpiLabel}>{item?.label}</span>
                </div>
                <div className={styles.kpiRiseContainer}>
                  {item?.rise ? (
                    <Rise fillColor={colors.green1} />
                  ) : (
                    <Fall fillColor={colors.red3} />
                  )}
                  <span
                    className={item?.rise ? styles.kpiRise : styles.kpiFall}
                  >
                    {item?.kpiIndex}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.comparaticeAnalysisGraph}>
        <span className={styles.title}>Comparative Analysis</span>
        <img src={ComparativeGraph} className={styles.imgGraph} alt="chart" />
      </div>
      <div className={styles.comparaticeAnalysisGraph}>
        <span className={styles.title}>Patients inflow</span>
        <img src={PatientInflowChart} className={styles.imgGraph} alt="chart" />
      </div>
    </div>
  )
}

export default KPIRevenueModal
