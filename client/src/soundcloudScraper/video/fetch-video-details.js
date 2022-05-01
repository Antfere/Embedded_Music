const fetch = require('node-fetch');

module.exports = async (url) => {
  const fetchedPage = await fetch(url)
    .then(res => res.text())
    .then(body => parseSongInfo(body))
  return fetchedPage
}

function parseSongInfo(page) {

  function parseHTML(page) {
    let dur = page.match(/(?<=content="PT).{9}/g)
    const hours = dur[0].substr(0, 2);
    const minutes = dur[0].substr(3, 2);
    const seconds = dur[0].substr(6, 2);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
  }

  return parseHTML(page)

}