import {useContext} from 'react'
import Sidebar from '../Sidebar'

import NxtContext from '../../context/NxtContext'
import {
  HomeBgContainer,
  HomeContainer,
  DataContainer,
  StyledContainer,
  Content,
} from '../../Style'
import './index.css'

const NotFound = () => {
  const {darkTheme} = useContext(NxtContext)

  return (
    <HomeBgContainer darkTheme={darkTheme}>
      <HomeContainer darkTheme={darkTheme}>
        <Sidebar />
        <DataContainer darkTheme={darkTheme}>
          <StyledContainer darkTheme={darkTheme}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
              className="not-found-image"
            />

            <h1 className="not-found-heading">Page Not Found</h1>
            <Content darkTheme={darkTheme}>
              We are sorry, the page you requested could not be found.
            </Content>
          </StyledContainer>
        </DataContainer>
      </HomeContainer>
    </HomeBgContainer>
  )
}

export default NotFound
