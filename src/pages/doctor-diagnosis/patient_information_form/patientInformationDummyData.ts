import teeth_img from "../../../assets/images/teeth_img.png";
import scribe_notes_img from "../../../assets/images/scrib_notes_img.png";

export const diag_symptom_tags = [
  "sick",
  "Headache",
  "fever",
  "diabities",
  "covid",
  "teeth",
];

export const diag_medicine_prescription = [
  {
    med_name: "Pracetamol",
    med_qty: 20,
    med_duration: "4 days",
    med_frequency: "1-0-1",
  },
  {
    med_name: "Azythromicine",
    med_qty: 20,
    med_duration: "4 days",
    med_frequency: "1-0-1",
  },
  {
    med_name: "Pracetamol",
    med_qty: 20,
    med_duration: "4 days",
    med_frequency: "1-0-1",
  },
  {
    med_name: "Azythromicine",
    med_qty: 20,
    med_duration: "4 days",
    med_frequency: "1-0-1",
  },
];

export const diag_note =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi neque, gravida et velit nec, consectetur sollicitudin felis. In est nunc, posuere pulvinar aliquam eu, sodales sed metus. Etiam vel risus et nunc imperdiet faucibus vitae ut justo. Sed tempus sollicitudin massa, id interdum diam sagittis a";

export const docs_list = [
  {
    doc_name: "greey_duck",
    doc_category: "X-ray",
    doc_url: teeth_img,
  },
  {
    doc_name: "greey_duck",
    doc_category: "X-ray",
    doc_url: teeth_img,
  },
  {
    doc_name: "greey_duck",
    doc_category: "X-ray",
    doc_url: teeth_img,
  },
  {
    doc_name: "greey_duck",
    doc_category: "X-ray",
    doc_url: teeth_img,
  },
];

export const imgs_list = [
  {
    img_name: "greek_duck",
    img_category: "Y-ray",
    img_url: teeth_img,
  },
  {
    img_name: "greek_duck",
    img_category: "Y-ray",
    img_url: teeth_img,
  },
];

export const diagnosis_list = {
  diag_desc:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mi neque, gravida et velit nec, consectetur sollicitudin felis. In est nunc, posuere pulvinar aliquam eu, sodales sed metus. Etiam vel risus et nunc imperdiet faucibus vitae ut justo. Sed tempus sollicitudin massa, id interdum diam sagittis a",
  diag_scribed_notes: [scribe_notes_img, scribe_notes_img, scribe_notes_img],
  diag_scribed_images: [teeth_img, teeth_img, teeth_img],
};

export const viewAllDocumentsList = [
  {
    _id: "646e0979dafb09722afde19f",
    date: "2023-05-10",
    diag_note: "now brain is sick",
    diag: {
      img_id: "646ef198031f75fe3be79938",
      img_name: "greek_duck",
      img_category: "Y-ray",
    },
  },
  {
    _id: "646e0979dafb09722afde19f",
    date: "2023-05-10",
    diag_note: "now brain is sick",
    diag: {
      img_id: "646f57b41c317ae0040a15df",
      img_name: "bapu-rana",
      img_category: "X-ray",
    },
  },
  {
    _id: "646e0979dafb09722afde19f",
    date: "2023-05-10",
    diag_note: "now brain is sick",
    diag: {
      img_id: "646ef198031f75fe3be79938",
      img_name: "greek_duck",
      img_category: "Y-ray",
    },
  },
  {
    _id: "646e0979dafb09722afde19f",
    date: "2023-05-10",
    diag_note: "now brain is sick",
    diag: {
      img_id: "646f57b41c317ae0040a15df",
      img_name: "bapu-rana",
      img_category: "X-ray",
    },
  },
  // {
  //   _id: "646e0979dafb09722afde19f",
  //   date: "2023-05-10",
  //   diag_note: "now brain is sick",
  //   diag: {
  //     img_id: "646ef198031f75fe3be79938",
  //     img_name: "greek_duck",
  //     img_category: "Y-ray",
  //   },
  // },
  // {
  //   _id: "646e0979dafb09722afde19f",
  //   date: "2023-05-10",
  //   diag_note: "now brain is sick",
  //   diag: {
  //     img_id: "646f57b41c317ae0040a15df",
  //     img_name: "bapu-rana",
  //     img_category: "X-ray",
  //   },
  // },
  // {
  //   _id: "646e0979dafb09722afde19f",
  //   date: "2023-05-10",
  //   diag_note: "now brain is sick",
  //   diag: {
  //     img_id: "646ef198031f75fe3be79938",
  //     img_name: "greek_duck",
  //     img_category: "Y-ray",
  //   },
  // },
  // {
  //   _id: "646e0979dafb09722afde19f",
  //   date: "2023-05-10",
  //   diag_note: "now brain is sick",
  //   diag: {
  //     img_id: "646f57b41c317ae0040a15df",
  //     img_name: "bapu-rana",
  //     img_category: "X-ray",
  //   },
  // },
];
