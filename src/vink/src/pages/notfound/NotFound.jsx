import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import styles from './notfound.module.scss'
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.pagenotFoundContainer}>
            <div className={styles.erroeCode}>404</div>
            <div className={styles.errorText}>We can't seem to find the page you're looking for.</div>
            <Button title='Go to Home' handleClick={()=>navigate('/')} customClass={styles.homeButton}/>
        </div>
    )
}
export default NotFound;