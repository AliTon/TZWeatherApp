import { HeaderStyle } from './Header.styles'
import Logo from '../../images/icon.jpg'
import { Link } from 'react-router-dom'
import TempTypeChanger from "./TempChanger";

const Header = () => {
    return (
        <HeaderStyle>
            <div style={{display: 'flex', alignItems: 'center' }}>
                <Link to={'/'}>
                    <img src={Logo} alt="Logo" height="80px" />
                </Link>
                <div className="title">TZ</div>
            </div>
           <TempTypeChanger/>
        </HeaderStyle>
    )
}

export default Header
