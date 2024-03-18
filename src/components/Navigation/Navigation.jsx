import styles from './Navigation.module.css';
import { Link, NavLink} from 'react-router-dom';
import clsx from 'clsx';
import { IoIosGitCompare } from "react-icons/io";


const changeClass = ({isActive}) =>{
    return clsx( styles.link, isActive && styles.linkActive);
};

const Navigation = () =>{
    return (
        <header className={styles.header}>
            <div>
                <Link to="/">
                    <IoIosGitCompare className={styles.logo} size={30}/> 
                </Link>
            </div>
            <nav className={styles.nav}>
                <NavLink to="/" className={changeClass}> Home </NavLink>
                <NavLink to="/movies" className={changeClass}> Movies </NavLink>
            </nav>
        </header>
    );
};

export default Navigation;
