import {useContext} from 'react'
import {useHistory, Link} from 'react-router-dom' // Import useHistory

import Cookies from 'js-cookie'
import {RiLightbulbLine} from 'react-icons/ri'
import {FaHamburger} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import {HiLightBulb} from 'react-icons/hi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css' // Import CSS for default styles
import NxtContext from '../../context/NxtContext'
import {HeaderContainer, LogoutContainer} from '../../Style' // Adjust the path accordingly

import './index.css'

const Header = () => {
  const history = useHistory() // Initialize useHistory
  const {darkTheme, updateDarkTheme} = useContext(NxtContext)

  const handleLogout = close => {
    Cookies.remove('jwt_token') // Adjust this based on your token storage
    history.replace('/login') // Navigate to the login route
    close() // Close the popup
  }

  return (
    <HeaderContainer bgColor={darkTheme ? ' #000000' : 'white'}>
      <div>
        <Link to="/" className="nav-item-link">
          {darkTheme ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="nxt watch logo"
              className="logo"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
              className="logo"
            />
          )}
        </Link>
      </div>
      <div className="mobile-container">
        {darkTheme ? (
          <RiLightbulbLine
            onClick={updateDarkTheme}
            size={25}
            style={{cursor: 'pointer'}}
            color="white"
          />
        ) : (
          <HiLightBulb
            onClick={updateDarkTheme}
            size={25}
            style={{cursor: 'pointer'}}
          />
        )}
        <FaHamburger size={25} style={{cursor: 'pointer'}} />
        <BiLogOut size={25} style={{cursor: 'pointer'}} />
      </div>
      <div className="medium-container">
        {darkTheme ? (
          <RiLightbulbLine
            onClick={updateDarkTheme}
            size={50}
            style={{cursor: 'pointer'}}
            color="white"
          />
        ) : (
          <HiLightBulb
            onClick={updateDarkTheme}
            size={50}
            style={{cursor: 'pointer'}}
          />
        )}
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile"
        />
        <Popup
          trigger={
            <button type="button" className="logout-button">
              Logout
            </button>
          }
          modal
          contentStyle={{backgroundColor: 'transparent', border: 'none'}}
        >
          {close => (
            <LogoutContainer darkTheme={darkTheme}>
              <h1 className="popup-heading">
                Are you sure you want to logout?
              </h1>
              <div className="popup-buttons">
                <button
                  type="button"
                  className="close-button"
                  onClick={close} // Close the popup
                >
                  Close
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={() => handleLogout(close)}
                >
                  Confirm
                </button>
              </div>
            </LogoutContainer>
          )}
        </Popup>
      </div>
    </HeaderContainer>
  )
}

export default Header
