import styles from "./imageGallery.module.scss";
import imageGalleryOne from "../../../assests/images/imageGalleryOne.png";
import imageGalleryTwo from "../../../assests/images/imageGalleryTwo.png";
import imageGalleryThree from "../../../assests/images/imageGalleryThree.png";
import imageGalleryFour from "../../../assests/images/imageGalleryFour.png";
import imageGalleryFive from "../../../assests/images/imageGalleryFive.png";
import imageGallerySix from "../../../assests/images/imageGallerySix.png";
import imageGalleryLogo from "../../../assests/images/imageGalleryLogo.png";
import Button from "../../../components/button/Button";

const ImageGallery = () => {
  return (
    <>
      <div className={styles.imageGalleryContainer}>
        <div className={styles.imageContainer}>
          <img src={imageGalleryOne} className={styles.imageOneStyle} />
          <div className={styles.smallImages}>
            <img src={imageGalleryFive} className={styles.imageFiveStyle} />
            <img src={imageGallerySix} className={styles.imageSixStyle} />
          </div>
        </div>
        <div className={styles.smallImageContainer}>
          <div className={styles.conatinerOne}>
            <img src={imageGalleryTwo} className={styles.imageTwoStyle} />
            <img src={imageGalleryThree} />
          </div>
          <div className={styles.conatinerTwo}>
            <img
              src={imageGalleryLogo}
              alt="logo"
              className={styles.logoStyle}
            />
            <img src={imageGalleryFour} className={styles.imageFourStyle} />
          </div>
          <div className={styles.vmsBank}>
            <span className={styles.careerText}>
              Interested in a career at VMS Bank?
            </span>
            <Button title="Visit Careers" customClass={styles.buttonStyle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
