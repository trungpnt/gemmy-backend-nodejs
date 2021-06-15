import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

function Navbar() {

    const [sidebar,setSideBar] = useState(false)

    const showSidebar = ( ) => setSideBar(!sidebar)

    return (
        <>
            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarData.map( (item, index) => {
                        return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon} 
                                <span>{item.title}</span>
                            </Link>
                        </li>        
                        )
                    })}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
