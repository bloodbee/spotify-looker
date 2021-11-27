const qs = require('qs')

/**
 * Get the access token for spotify
 */
export default async function getAccessToken() {
  // first set the headers for therequest
  let accessHeaders = new Headers();
  // generate a base 64 encoded string with client id and client secret
  accessHeaders.append('Authorization', `Basic ${(new Buffer(process.env.clientId + ':' + process.env.clientSecret).toString('base64'))}`)
  accessHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  // invoke the request
  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: accessHeaders,
    body: qs.stringify({
      'grant_type': 'client_credentials' 
    }),
    mode: 'cors',
    cache: 'default'
  })

  const jsonResp = await resp.json()
  return 'Bearer ' + jsonResp.access_token
}