import {useState, useEffect, useCallback, useContext} from 'react'

import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {TiDelete} from 'react-icons/ti'
import {FaDotCircle} from 'react-icons/fa'
import {BsSearch} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'

// import Header from '../Header'
// Uncomment this if you have a Sidebar component
import FailureView from '../FailureView'
import Sidebar from '../Sidebar'
import NxtContext from '../../context/NxtContext'
import {
  HomeBgContainer,
  HomeContainer,
  Container,
  DataContainer,
  ApiDataContainer,
  TitleHeading,
  ChannelName,
  PublishedContainer,
  SearchResultsHeading,
  SearchResultsContent,
} from '../../Style'

import './index.css'

const Home = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [showCrossContainer, setShowCrossContainer] = useState(true)
  const [finalSearchInput, setFinalSearchInput] = useState('') // For API call when button is clicked
  const {darkTheme} = useContext(NxtContext)

  const handleDeleteClick = () => {
    setShowCrossContainer(false) // This will hide the cross-container
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos?search=${finalSearchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const responseData = await response.json()
      if (response.ok) {
        const updatedData = responseData.videos.map(each => ({
          channel: each.channel,
          id: each.id,
          publishedAt: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          title: each.title,
          viewCount: each.view_count,
        }))
        setData(updatedData)
      } else {
        console.error('Error fetching data:', responseData.error_msg)
        setIsFailure(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setIsFailure(true)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }, [finalSearchInput]) // Dependencies go here

  useEffect(() => {
    fetchData()
  }, [finalSearchInput, fetchData]) // Trigger fetch when finalSearchInput changes (i.e., when button is clicked)

  const handleSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const handleSearchClick = () => {
    setFinalSearchInput(searchInput) // Triggers the API call via useEffect
  }

  const renderSuccesView = () => (
    <DataContainer darkTheme={darkTheme}>
      {showCrossContainer && ( // Only show this if showCrossContainer is true
        <Container darkTheme={darkTheme}>
          <div className="cross-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
              className="logo"
            />
            <TiDelete
              size={40}
              style={{cursor: 'pointer'}}
              onClick={handleDeleteClick} // Hide on click
            />
          </div>
          <h1>
            Buy Nxt watch Premium prepaid <br /> plans with UPI
          </h1>
          <button type="button" className="get-it-now-button">
            Get It Now
          </button>
        </Container>
      )}
      <ApiDataContainer darkTheme={darkTheme}>
        <div className="search-container">
          <input
            value={searchInput}
            onChange={handleSearchInput}
            className="input-search"
            type="search"
            placeholder="Search..."
          />
          <button
            className="search-button"
            type="button"
            onClick={handleSearchClick}
          >
            <BsSearch size={20} style={{cursor: 'pointer'}} />
          </button>
        </div>
        {data.length === 0 ? (
          <div className="no-search-results-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="no-videos"
            />
            <SearchResultsHeading darkTheme={darkTheme}>
              No Search results found
            </SearchResultsHeading>
            <SearchResultsContent darkTheme={darkTheme}>
              Try differnent key words or remove search filter
            </SearchResultsContent>
            <button onClick={fetchData} className="retry-button" type="button">
              Retry
            </button>
          </div>
        ) : (
          <div className="data">
            {data.map(each => {
              const distance = formatDistanceToNow(new Date(each.publishedAt), {
                addSuffix: true,
              })

              return (
                <Link
                  key={each.id}
                  className="nav-item-link"
                  to={`videos/${each.id}`}
                >
                  <div className="each-video-container" key={each.id}>
                    <img
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                      className="video_thumbnail"
                    />
                    <div className="channel-details-container">
                      <div>
                        <img
                          src={each.channel.profile_image_url}
                          alt="thumbnail"
                          className="profile-logo"
                        />
                      </div>
                      <div>
                        <TitleHeading darkTheme={darkTheme}>
                          {each.title}
                        </TitleHeading>
                        <ChannelName darkTheme={darkTheme}>
                          {each.channel.name}
                        </ChannelName>
                        <PublishedContainer darkTheme={darkTheme}>
                          <h1 className="views-count">
                            {each.viewCount} views
                          </h1>
                          <FaDotCircle />
                          <p>
                            {distance.replace(
                              /about |almost |over |some /g,
                              '',
                            )}
                          </p>
                        </PublishedContainer>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </ApiDataContainer>
    </DataContainer>
  )

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="BallTriangle"
        size={50}
        color="green"
        height="80"
        width="80"
      />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <FailureView />
    </div>
  )

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return renderLoaderView()
      case isFailure:
        return renderFailureView()
      default:
        return renderSuccesView()
    }
  }

  return (
    <HomeBgContainer darkTheme={darkTheme}>
      <HomeContainer darkTheme={darkTheme}>
        <Sidebar />
        {renderContent()}
      </HomeContainer>
    </HomeBgContainer>
  )
}

export default Home
