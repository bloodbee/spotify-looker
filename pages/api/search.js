// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getAccessToken from '../../utils/getAccessToken'

export default async function searchAPI(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'POST':
      if (process.env.NODE_ENV !== 'test') {
        // Get access token
        const accessToken = await getAccessToken() 
        // Get the albums with the need authorization
        let accessHeaders = new Headers();
        accessHeaders.append('Authorization', accessToken)
        const resp = await fetch(req.body, {
          method: 'GET',
          headers: accessHeaders,
          mode: 'cors',
          cache: 'default'
        })
        const respJson = await resp.json()
        res.status(200).json(respJson)
      } else {
        // simulate testing 
        res.status(200).json({albums: [
          {
            id: 1,
            name: 'Fake album name'
          },
          {
            id: 2,
            name: 'Fake album name 2'
          }
        ]})
      }
      break
    default:
      // Only allow POST method for this api
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
