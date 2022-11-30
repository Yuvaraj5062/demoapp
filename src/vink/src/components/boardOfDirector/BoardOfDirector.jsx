import styles from "./boardOfDirector.module.scss";
import Title from "../../components/title/Title";
import PersonImage from "../personImage/PersonImage";
import { boardMemberData } from "../../data/data";
import BoardCharter from "../board-Charter/BoardCharter";

const BoardOfDirector = () => {
  return (
    <>
      <BoardCharter />
      <div className={styles.boardOfDirectorContainer}>
        <Title title="Board Members" customClass={styles.titleStyle} />
        <div className={styles.imageContainer}>
          {boardMemberData.map((item, index) => {
            return <PersonImage img={item.img} name={item.name} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BoardOfDirector;
