import './css/Header.css'
import { Avatar, IconButton } from '@material-ui/core'
import ReorderIcon from '@material-ui/icons/Reorder'
import { Apps, ExpandMore, HelpOutline, Search, Settings } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Header = () => {
    const user = useSelector(selectUser);
    return (
        <div className="header">
            <div className="left">
                <IconButton>
                    <ReorderIcon />
                </IconButton>
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="logo" />
            </div>

            <div className="middle">
                <div className="search">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <input type="text" placeholder='search mail' />
                    <IconButton>
                        <ExpandMore />
                    </IconButton>
                </div>
            </div>

            <div className="right">
                <IconButton>
                    <HelpOutline />
                </IconButton>
                <IconButton>
                    <Settings />
                </IconButton>
                <IconButton>
                    <Apps />
                </IconButton>

                <Avatar src={user?.photoUrl} onClick={() => firebase.auth().signOut()} />
            </div>
        </div>
    )
}

export default Header
