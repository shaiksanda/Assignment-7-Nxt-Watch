import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import {FaThumbsDown} from 'react-icons/fa'
import Sidebar from '../Sidebar'
import NxtContext from '../../context/NxtContext'

import {
  HomeBgContainer,
  HomeContainer,
  DataContainer,
  TopIconContainer,
  StyledContainer,
  StyledHeading,
  StyledDescription,
} from '../../Style'

import './index.css'

const DislikedVideos = () => {
  console.log('Rendering DislikedVideos Component')

  return (
    <NxtContext.Consumer>
      {value => {
        const {dislikedVideos, darkTheme} = value

        const getTimeDistance = publishedAt => {
          const publishedDate = new Date(publishedAt)
          const distance = formatDistanceToNow(publishedDate, {addSuffix: true})
          return distance.replace(/about |almost |over |some /g, '') // Remove specified words
        }

        return (
          <HomeBgContainer darkTheme={darkTheme}>
            <HomeContainer darkTheme={darkTheme}>
              <Sidebar />
              <DataContainer darkTheme={darkTheme}>
                <TopIconContainer darkTheme={darkTheme}>
                  <FaThumbsDown size={30} color="red" />
                  <StyledHeading darkTheme={darkTheme}>
                    Disliked Videos
                  </StyledHeading>
                </TopIconContainer>
                {dislikedVideos.length === 0 ? (
                  <StyledContainer darkTheme={darkTheme}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no disliked videos"
                      className="not-found-image"
                    />
                    <StyledHeading darkTheme={darkTheme}>
                      No Disliked Videos Found
                    </StyledHeading>
                    <StyledDescription darkTheme={darkTheme}>
                      You can dislike your videos while watching them.
                    </StyledDescription>
                  </StyledContainer>
                ) : (
                  dislikedVideos.map(each => (
                    <Link
                      to={`/videos/${each.id}`}
                      className="nav-item-link"
                      key={each.id}
                    >
                      <div key={each.id}>
                        <div
                          style={{display: 'flex', gap: '10px', margin: '10px'}}
                        >
                          <div>
                            <img
                              className="saved-image"
                              src={each.thumbnailUrl}
                              alt="thumbnail"
                            />
                          </div>
                          <div>
                            <StyledHeading darkTheme={darkTheme}>
                              {each.title}
                            </StyledHeading>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                              }}
                            >
                              <StyledDescription darkTheme={darkTheme}>
                                {each.channel.name}
                              </StyledDescription>
                              <StyledDescription darkTheme={darkTheme}>
                                {each.viewCount} Views
                              </StyledDescription>
                              <StyledDescription darkTheme={darkTheme}>
                                {getTimeDistance(each.publishedAt)}
                              </StyledDescription>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </DataContainer>
            </HomeContainer>
          </HomeBgContainer>
        )
      }}
    </NxtContext.Consumer>
  )
}

export default DislikedVideos
