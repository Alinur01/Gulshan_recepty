import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderList from "./HeaderList";
import Gotop from "./Gotop";
import Burger from "./Burger";
import HeaderRight from "./HeaderRight";
import logo from '../../assets/tochka.png'

const Header = () => {
    const user = useSelector((s) => s.user.user);
    const [burger, setBurger] = useState(false);

    return (
        <header id='header' className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <Burger burger={burger} setBurger={setBurger}/>
                    <Link to='/'>
                        <img src={logo} style={{width: '200px'}} alt=""/>
                    </Link>
                    <HeaderRight user={user}/>
                    <HeaderList burger={burger} user={user}/>
                </nav>
            </div>
            <Gotop/>
        </header>
    );
};

export default Header;
