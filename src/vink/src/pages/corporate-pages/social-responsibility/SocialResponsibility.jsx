import Button from '../../../components/button/Button';
import { corporateButtonData } from '../../../data/data';
import styles from './socialresponsibility.module.scss'
import image8 from '../../../assests/images/image8.png'
const SocialResponsibility = () => {
    return (
        <div className={styles.socialResponsibilityMainContainer}>
            <div className={styles.buttonContainer}>
                {
                    corporateButtonData.map((item, index) => {
                        return (
                            <Button
                                title={item.name}
                                customClass={styles.button}
                                // customClassForIcon={styles.btnIcon}
                                customClassForText={styles.btnText}
                                key={item.id}
                            />
                        )
                    })
                }
            </div>
            <img src={image8} alt="mask group" className={styles.maskGroup} />
            <div className={styles.paragraph}>
                The office of the chief executive officer drives the strategy behind the work of the VMS SOCIAL DEVELOPMENT, and also oversees the day-to- day operations of the four VMS SOCIAL RESPONSIBILITY departments. This office also drives the VMS SOCIAL DEVELOPMENT 's special projects and programmes, as well as research, and constantly seeks to develop and deliver new products and services to all stakeholders.
            </div>
            <div className={styles.paragraph}>
                The current occupant of the CEO post, Siyasanga Mahlulo, has been with the VMS SOCIAL RESPONSIBILITY since its inception in 2018 and has led the organisation since 2021. she is aided in her daily duties by a personal assistant.
            </div>
            <div className={styles.paragraph}>
                Financial administration and human resources (HR) also fall under the CEO’s office and are driven by a finance & HR manager and a finance & HR assistant.
            </div>
            <div className={styles.meetParagraph}>
            Meet the team in the <span className={styles.officeLink}>Office of the CEO</span>  
            </div>
        </div>
    )
}
export default SocialResponsibility;