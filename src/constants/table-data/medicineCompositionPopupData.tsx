export const medicineCompositionHeaderData: any = [
  // {
  //   Header: "MEDICINE ID",
  //   accessor: "_id",
  // },
  {
    Header: 'MEDICINE NAME',
    accessor: 'medicine_name',
  },
  {
    Header: 'BRAND NAME',
    accessor: 'manufacturer',
  },
  {
    Header: 'DRUG CLASS',
    accessor: 'category',
  },
  {
    Header: 'COMPOSITION',
    accessor: 'composition',
  },
  {
    Header: 'NOTES',
    Cell: ({}) => {
      return <p>-</p>
    },
  },
]

export const meicineCompositionDummyData: any = [
  {
    _id: '-',
    medicine_name: '-',
    MRP: 48,
    category: '-',
    manufacturer: '-',
    composition: '-',
    createdAt: '-',
    updatedAt: '-',
    __v: 0,
  },
]
