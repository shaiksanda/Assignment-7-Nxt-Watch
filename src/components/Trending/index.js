import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {FaDotCircle} from 'react-icons/fa'
import {AiFillFire} from 'react-icons/ai'

import Loader from 'react-loader-spinner'
import NxtContext from '../../context/NxtContext'
import FailureView from '../FailureView'

import Sidebar from '../Sidebar'
import {
  HomeBgContainer,
  HomeContainer,
  DataContainer,
  ChannelName,
  TopIconContainer,
  NormalHeading,
  StyledHeading,
} from '../../Style'
import './index.css'

const Trending = () => {
  const [trendingData, setTrendingData] = useState([])
  console.log(trendingData)
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)

  const {darkTheme} = useContext(NxtContext)

  const fetchVideoData = async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending' // Ensure this URL is incorrect for testing
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const responseData = await response.json()

      const updatedData = responseData.videos.map(each => ({
        id: each.id,
        channel: each.channel,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))

      if (response.ok) {
        setTrendingData(updatedData)
        setIsLoading(false)
      } else {
        console.error('Error fetching video data:', responseData) // Log the error response
        setIsFailure(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Fetch error:', error) // Log any network errors
      setIsFailure(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideoData()
  }, [])

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="BallTriangle" color="green" height="80" width="80" />
    </div>
  )

  const renderFailureView = () => (
    <FailureView fetchVideoData={fetchVideoData} />
  )

  const renderSuccessView = () => (
    <div>
      <TopIconContainer darkTheme={darkTheme}>
        <AiFillFire size={40} color="red" />
        <NormalHeading darkTheme={darkTheme}>Trending</NormalHeading>
      </TopIconContainer>
      {trendingData.map(each => {
        const distance = formatDistanceToNow(new Date(each.publishedAt), {
          addSuffix: true,
        })
        return (
          <div className="each-data" key={each.id}>
            <div className="image-container">
              <Link to={`/videos/${each.id}`}>
                <img
                  className="trending-image"
                  src={each.thumbnailUrl}
                  alt="thumbnail"
                />
              </Link>
            </div>
            <div className="trending-data-container">
              <StyledHeading darkTheme={darkTheme}>{each.title}</StyledHeading>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div>
                  <img
                    src={each.channel.profile_image_url}
                    alt="profile"
                    className="profile"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <ChannelName darkTheme={darkTheme}>
                    {each.channel.name}
                  </ChannelName>

                  <ChannelName darkTheme={darkTheme}>
                    {each.viewCount} views
                  </ChannelName>
                  <FaDotCircle color={darkTheme ? 'white' : 'black'} />
                  <ChannelName darkTheme={darkTheme}>
                    {distance.replace(/about |almost |over |some /g, '')}
                  </ChannelName>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderContent = () => {
    switch (true) {
      case isLoading:
        return renderLoaderView()
      case isFailure:
        return renderFailureView()

      default:
        return renderSuccessView()
    }
  }

  return (
    <HomeBgContainer darkTheme={darkTheme}>
      <HomeContainer darkTheme={darkTheme}>
        <Sidebar />
        <DataContainer darkTheme={darkTheme}>{renderContent()}</DataContainer>
      </HomeContainer>
    </HomeBgContainer>
  )
}

export default Trending
