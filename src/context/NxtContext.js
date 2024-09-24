import React from 'react'

const NxtContext = React.createContext({
  savedVideos: [],
  darkTheme: false,
  likedVideos: [],
  updateLikedVideos: () => {},
  dislikedVideos: [],
  updatedDislikedVideos: () => {},
  updateDarkTheme: () => {},
  updateSavedVideos: () => {},
})

export default NxtContext
