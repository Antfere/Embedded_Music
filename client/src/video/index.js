const fetchVideoDetails = require('./fetch-video-details')

module.exports = (videoId) => {
  if (!videoId) {
    throw new Error('Missing parameter video ID')
  }

  return fetchVideoDetails(videoId)
}