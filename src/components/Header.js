// import styles from '../styles/header.module.scss';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="">
            <h1 className="text-blue-500 underline">
                <Link to={`/`}>
                    TestBlog
                </Link>
            </h1>
        </header>
    )
}