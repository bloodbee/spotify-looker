import getAccessToken from '../../../utils/getAccessToken'

export default async function albumAPI(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      if (process.env.NODE_ENV !== 'test') {
        // Get access token
        const accessToken = await getAccessToken() 
        // Get the specific album with the need authorization
        let accessHeaders = new Headers();
        accessHeaders.append('Authorization', accessToken)
        const resp = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
          method: 'GET',
          headers: accessHeaders,
          mode: 'cors',
          cache: 'default'
        })
        const respJson = await resp.json()
        res.status(200).json(respJson)
      } else {
        // simulate testing 
        res.status(200).json({
          id: 1,
          name: 'Fake album name'
        })
      }
      break
    default:
      // Only allow GET method for this api
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}