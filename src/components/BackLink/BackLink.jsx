import styles from './BackLink.module.css';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const BackLink = ({ to, color = 'grey', size = 30, text = 'Back' }) => {
    return (
        <div className={styles.box}>
         <Link to={to}>
            <div className={styles.link}>
                <RiArrowGoBackLine size={size} color={color}/>
            </div>
         </Link>
         <span>{text}</span>
        </div>
    );
};

export default BackLink;