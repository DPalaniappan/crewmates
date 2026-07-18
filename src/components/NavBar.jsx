import '../styles/NavBar.css'
import { Link, Outlet } from 'react-router'

const NavBar = () => {
    return (
        <div>
            <div className="App">
                <div className="Nav">
                    <ul>
                        <li className="nav-item">
                            <Link to="/">
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create-character">
                                <p>Create a DB Character</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/db-gallery">
                                <p>DB Gallery</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="App-content">
                <Outlet />
            </div>
        </div>
    )
}

export default NavBar;
