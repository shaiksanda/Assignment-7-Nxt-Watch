import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {FiHome} from 'react-icons/fi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiVideoUploadLine} from 'react-icons/ri'
import {BiLike} from 'react-icons/bi'
import {FaThumbsDown} from 'react-icons/fa'

import NxtContext from '../../context/NxtContext'
import {
  SidebarContainer,
  IconContainer,
  Heading,
  ContactUs,
  Content,
} from '../../Style'
import './index.css'

const Sidebar = () => {
  console.log()
  const {darkTheme} = useContext(NxtContext)
  return (
    <SidebarContainer darkTheme={darkTheme}>
      <div>
        <Link className="nav-item-link" to="/">
          <IconContainer darkTheme={darkTheme}>
            <FiHome size={20} color={darkTheme ? 'white' : 'black'} />
            <Heading darkTheme={darkTheme}>Home</Heading>
          </IconContainer>
        </Link>
        <Link to="/trending" className="nav-item-link">
          <IconContainer darkTheme={darkTheme}>
            <AiFillFire size={20} color={darkTheme ? 'white' : 'black'} />
            <Heading darkTheme={darkTheme}>Trending</Heading>
          </IconContainer>
        </Link>
        <Link to="/gaming" className="nav-item-link">
          <IconContainer darkTheme={darkTheme}>
            <SiYoutubegaming size={20} color={darkTheme ? 'white' : 'black'} />
            <Heading darkTheme={darkTheme}>Gaming</Heading>
          </IconContainer>
        </Link>
        <Link to="/saved-videos" className="nav-item-link">
          <IconContainer darkTheme={darkTheme}>
            <RiVideoUploadLine
              size={20}
              color={darkTheme ? 'white' : 'black'}
            />
            <Heading darkTheme={darkTheme}>Saved Videos</Heading>
          </IconContainer>
        </Link>
        <Link to="/liked-videos" className="nav-item-link">
          <IconContainer darkTheme={darkTheme}>
            <BiLike size={20} color={darkTheme ? 'white' : 'black'} />
            <Heading darkTheme={darkTheme}>Liked Videos</Heading>
          </IconContainer>
        </Link>
        <Link to="/disliked-videos" className="nav-item-link">
          <IconContainer darkTheme={darkTheme}>
            <FaThumbsDown size={20} color={darkTheme ? 'white' : 'black'} />
            <Heading darkTheme={darkTheme}>DisLiked Videos</Heading>
          </IconContainer>
        </Link>
      </div>
      <div>
        <ContactUs darkTheme={darkTheme}>CONTACT US</ContactUs>
        <div className="logos-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="logos"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="logos"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="logos"
          />
        </div>
        <Content darkTheme={darkTheme}>
          Enjoy! Now to see your channels and recommendations!
        </Content>
      </div>
    </SidebarContainer>
  )
}

export default Sidebar
