/**
 * Method to format the artists
 * @param {Array[String]>} artists 
 */
export default function formattedArtists(artists) {
  return artists.reduce((prev, curr) => {
    if (prev) return `${prev}, ${curr.name}`
    else return curr.name
  }, null);
}