const express = require('express')
const {
  yinxiang: yinxiangConfig,
  evernote: evernoteConfig,
  domainName,
  static,
  mode,
  port
} = require('./config')

const {
  Client
} = require('evernote')

const app = express()
app.use(express.static(static))

const yinxiangClient = new Client({
  consumerKey: yinxiangConfig.consumerKey,
  consumerSecret: yinxiangConfig.consumerSecret,
  sandbox: false,
  china: true
})

const evernoteClient = new Client({
  consumerKey: evernoteConfig.consumerKey,
  consumerSecret: evernoteConfig.consumerSecret,
  sandbox: false,
  china: false
})


function getProxyClient(target) {
  if (target === 'evernote') {
    return {
      proxy: evernoteClient,
      config: evernoteConfig
    }
  } else if (target === 'yinxiang') {
    return {
      proxy: yinxiangClient,
      config: yinxiangConfig
    }
  } else return undefined
}

function auth(req, resp) {
  let target = req.query.target
  let {
    proxy
  } = getProxyClient(target)

  proxy.getRequestToken(`${domainName}/auth`, function (error, oauthToken, tokenSecret, results) {
    resp.redirect(proxy.getAuthorizeUrl(oauthToken))
  })
}

function auth_callback(req, resp) {
  let target = req.query.target
  let {
    proxy,
    config
  } = getProxyClient(target)

  let oauth_token = req.query.oauth_token
  let oauth_verifier = req.query.oauth_verifier
  proxy.getAccessToken(oauth_token, config.consumerSecret,
    oauth_verifier,
    function (error, accesstoken, accesstokenSecret, results) {
      resp.end(JSON.stringify({
        oauthAccessToken: accesstoken,
        oauthAccessTokenSecret: accesstokenSecret,
        edamShard: results.edam_shard,
        edamUserId: results.edam_userId,
        edamExpires: results.edam_expires,
        edamNoteStoreUrl: results.edam_noteStoreUrl,
        edamWebApiUrlPrefix: results.edam_webApiUrlPrefix
      }))
    })

}


function redirectHandler(req, resp) {
  let proxy = getProxyClient(req.query.targer)
  if (!proxy) {

  }
}

app.get('/auth', auth)
app.get('/auth_callback', auth_callback)
app.get('/redirect', redirectHandler)

const listenHost = mode === 'development' ? 'localhost' : '0.0.0.0'
app.listen(port, listenHost, undefined, () => {
  console.log(`server listen o ${listenHost}:${port}`)
})