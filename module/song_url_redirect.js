// 歌曲链接

const crypto = require('crypto')
module.exports = async (query, request) => {
  if (!('MUSIC_U' in query.cookie)) {
    query.cookie._ntes_nuid = crypto.randomBytes(16).toString('hex')
  }
  query.cookie.os = 'pc'
  const data = {
    ids: '[' + query.id + ']',
    br: parseInt(query.br || 999000),
  }

  const { body } = await request(
    'POST',
    `https://interface3.music.163.com/eapi/song/enhance/player/url`,
    data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
      url: '/api/song/enhance/player/url',
    },
  )

  const { data: res } = body
  if (res.length > 0 && res[0].url) {
    return res[0].url
  }

  return `https://music.163.com/song/media/outer/url?id=${query.id}.mp3`
}
