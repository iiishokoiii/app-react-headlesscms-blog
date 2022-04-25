import styles from '../styles/header.module.scss';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.ttl}>
                <Link to={`/`}>
                    TestBlog
                </Link>
            </h1>
        </header>
    )
}