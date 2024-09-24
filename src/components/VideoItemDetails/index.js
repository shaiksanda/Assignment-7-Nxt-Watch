import {useState, useEffect, useCallback, useContext} from 'react'

import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {FaDotCircle} from 'react-icons/fa'
import ReactPlayer from 'react-player'
import {BiLike} from 'react-icons/bi'
import {RiVideoUploadLine} from 'react-icons/ri'
import {AiOutlineDislike} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import NxtContext from '../../context/NxtContext'
import Sidebar from '../Sidebar'

import {
  HomeBgContainer,
  HomeContainer,
  DataContainer,
  StyledHeading,
  StyledHr,
  ChannelName,
  Content,
} from '../../Style'

import './index.css'

const VideoItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [videoData, setVideoData] = useState(null)
  const [isFailure, setIsFailure] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const {savedVideos, updateSavedVideos} = useContext(NxtContext)
  const {likedVideos, updateLikedVideos} = useContext(NxtContext)
  const {dislikedVideos, updateDislikedVideos, darkTheme} = useContext(
    NxtContext,
  )

  const handleSaveVideo = () => {
    // Check if videoData is already in savedVideos
    const isVideoSaved = savedVideos.some(video => video.id === videoData.id)

    if (!isVideoSaved) {
      updateSavedVideos(videoData)
      setSuccessMessage('Video saved successfully!') // Save the video only if it's not already saved
    } else {
      setSuccessMessage('Video is already saved.')
      console.log('Video is already saved!')
    }
  }

  const handleDislikeVideo = () => {
    // Check if videoData is already in savedVideos
    const isVideoSaved = dislikedVideos.some(video => video.id === videoData.id)

    if (!isVideoSaved) {
      updateDislikedVideos(videoData)
      setSuccessMessage('Video DisLiked successfully!') // Save the video only if it's not already saved
    } else {
      setSuccessMessage('Video is already saved.')
      console.log('Video is already saved!')
    }
  }

  const handleLikeVideo = () => {
    // Check if videoData is already in savedVideos
    const isVideoSaved = likedVideos.some(video => video.id === videoData.id)

    if (!isVideoSaved) {
      updateLikedVideos(videoData)
      setSuccessMessage('Video Liked successfully!') // Save the video only if it's not already saved
    } else {
      setSuccessMessage('Video is already saved.')
      console.log('Video is already saved!')
    }
  }

  const fetchVideoData = useCallback(async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
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
        const updatedData = {
          id: responseData.video_details.id,
          channel: responseData.video_details.channel,
          videoUrl: responseData.video_details.video_url,
          thumbnailUrl: responseData.video_details.thumbnail_url,
          description: responseData.video_details.description,
          title: responseData.video_details.title,
          publishedAt: responseData.video_details.published_at,
          viewCount: responseData.video_details.view_count,
        }
        setVideoData(updatedData)
        setIsLoading(false)
      } else {
        console.error('Error fetching video data:', responseData)
        setIsFailure(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setIsFailure(true)
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchVideoData()
  }, [fetchVideoData])

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="BallTriangle" color="green" height="80" width="80" />
    </div>
  )

  const renderSuccessView = () => {
    const publishedDate = videoData ? new Date(videoData.publishedAt) : null
    const distance = publishedDate
      ? formatDistanceToNow(publishedDate, {addSuffix: true})
      : ''

    return (
      <DataContainer darkTheme={darkTheme}>
        {videoData && (
          <>
            <ReactPlayer
              url={videoData.videoUrl}
              width="100%"
              height="500px"
              controls
            />
            <StyledHeading darkTheme={darkTheme}>
              {videoData.title}
            </StyledHeading>
            <div className="views-and-likes-container">
              <div className="view-container">
                <p>{videoData.viewCount} views</p>
                <FaDotCircle />
                <p>{distance.replace(/about |almost |over |some /g, '')}</p>
              </div>
              <div className="view-container">
                <div className="view-container">
                  <BiLike size={20} onClick={handleLikeVideo} />
                  <p onClick={handleLikeVideo}>Like</p>
                </div>
                <div className="view-container">
                  <AiOutlineDislike onClick={handleDislikeVideo} size={20} />
                  <p onClick={handleDislikeVideo}>Dislike</p>
                </div>
                <div className="view-container">
                  <RiVideoUploadLine onClick={handleSaveVideo} size={20} />
                  <p onClick={handleSaveVideo}>Save</p>
                </div>
              </div>
            </div>
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <StyledHr />
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <img
                src={videoData.channel.profile_image_url}
                alt="profile"
                className="profile-logo"
              />
              <div>
                <ChannelName darkTheme={darkTheme}>
                  {videoData.channel.name}
                </ChannelName>
                <ChannelName darkTheme={darkTheme}>
                  {videoData.channel.subscriber_count} subscribers
                </ChannelName>
              </div>
            </div>
            <Content darkTheme={darkTheme}>{videoData.description}</Content>
          </>
        )}
      </DataContainer>
    )
  }

  const renderFailureView = () => (
    <FailureView fetchVideoData={fetchVideoData} />
  )

  const renderContent = () => {
    if (isLoading) {
      return renderLoaderView()
    }
    if (isFailure) {
      return renderFailureView()
    }
    return renderSuccessView()
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

export default VideoItemDetails
