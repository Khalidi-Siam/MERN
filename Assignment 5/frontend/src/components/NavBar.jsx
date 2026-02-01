import { Link } from "react-router";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link to="/"
                 className="navbar-brand text-uppercase">
                    <strong>Contact</strong> App
                </Link>
            </div>
        </nav>
    )
}
