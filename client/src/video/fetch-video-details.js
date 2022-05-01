const fetchPage = require('../utils/fetch-page')
const extractValue = require('../utils/cheerio-extract-value')

module.exports = async (videoId) => {
  console.log(videoId)
  const fetchedPage = await fetchPage({url: `https://www.youtube.com/watch?v=${videoId}`,})
  const parsedInfo = await parseVideoInfo(fetchedPage)
  console.log(parsedInfo)
  return parsedInfo;
}

function parseDurationInMilliSeconds (raw) {
  const m = /^[a-z]*(?:(\d+)M)?(\d+)S$/i.exec(raw)
  if (!m) return

  const minutes = m[1] ? parseInt(m[1], 10) : 0
  const seconds = m[2] ? parseInt(m[2], 10) : 0
  return (minutes * 60 + seconds) * 1000
}

function parseVideoInfo($) {
  if (!$('.watch-main-col').children().length) {
    throw new Error('Video does not exist.')
  }

  const url = extractValue($('.watch-main-col > link[itemprop="url"]'), 'href')

  const name = extractValue($('.watch-main-col > meta[itemprop="name"]'), 'content')

  const duration = extractValue(
    $('.watch-main-col meta[itemprop="duration"]'),
    'content'
  )
  const durationInSeconds = duration
    ? parseDurationInMilliSeconds(duration)
    : undefined

  const object = {url, name, durationInSeconds}

  console.log(durationInSeconds)

  return {
    object
  }
}
