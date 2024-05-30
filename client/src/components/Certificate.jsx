import headerGraphic from "../assets/header.svg";
import styles from "./certificate.module.css";

const Certificate = () => {
  return (
    <div className={styles.certContainer}>
      <img className={styles.certHeader} src={headerGraphic} alt="" />
      <div className={styles.certBody}>
        <div className={styles.certTitle}>
          <p>CERTIFICATE</p>
          <p>OF ACHIEVEMENT</p>
        </div>
        <p className={styles.certSubtitle}>THIS CERTIFICATE IS PRESENTED TO</p>
        <p className={styles.certRecepient} contentEditable spellCheck="false">
          John Doe
        </p>
        <p className={styles.certContent}>
          in recognition of his/her efforts and achievement in completing the
          program. He/She scored 90% and was awarded with A grade.
        </p>
        <div className={styles.certFooter}>
          <p>Instructor</p>
        </div>
      </div>
    </div>
  );
};
export default Certificate;
