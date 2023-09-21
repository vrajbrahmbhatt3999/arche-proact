import jsPDF from "jspdf";
import { utcToDate } from "../../utils/utils";
import styles from "./tableData.module.scss";

export const viewHistoryPopupTableHeaderData: any = [
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      let date = utcToDate(row?.original?.updatedAt);
      return <p>{date}</p>;
    },
  },
  {
    Header: "SUBMITTED QUESTIONNAIRE",
    Cell: ({ row }: any) => {
      const handleClick = (id: any) => {
        // Create a new PDF document
        const doc = new jsPDF();
        let data = id?.questionnaire;
        // Set the document font size
        doc.setFontSize(12);
        // Loop through the data array and add each question and answer to the PDF document
        data.forEach((item: any, index: number) => {
          const { question, answer } = item;
          // Add question to the PDF document
          doc.text(`Question ${index + 1}: ${question}`, 10, 20 + index * 30);
          // Add answer to the PDF document
          doc.text(`Answer: ${answer}`, 10, 30 + index * 30);
        });
        // Save the PDF document and open it in a new tab
        doc.save("questions-answers.pdf");
        window.open(doc.output("bloburl"), "_blank");
      };

      return (
        <>
          <button
            className={styles.buttonStyle}
            onClick={() => handleClick(row?.original)}
          >
            View Questionnaire
          </button>
        </>
      );
    },
  },
];
