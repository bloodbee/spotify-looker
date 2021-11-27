import React, { useState, useEffect } from 'react'

import Layout from '../layouts/layout'

import InputForm from '../components/InputForm'
import AlbumList from '../components/AlbumList'
import Pagination from '../components/Pagination'

export default function Home(props) {
  const [albums, setAlbums] = useState([])
  const [limit, setLimit] = useState(50)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [paginateIndex, setPaginateIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Flush the datas
   */
  const clearQuery = () => {
    setAlbums([])
    setLimit(50)
    setOffset(0)
    setTotal(0)
    setPaginateIndex(0)
    setSearchQuery('')
    localStorage.clear()
  }

  /**
   * Retrieve album list depending on the search query
   * @param {String} search 
   */
  const searchAlbums = async (search) => {
    setSearchQuery(search)
    processRequest(`https://api.spotify.com/v1/search?q=${search}&limit=${limit}&offset=${offset}&type=album`)
  }

  /**
   * Retrieve album list depending on the pagination index selected by user
   * @param {Number} off 
   */
  const searchIndex = (off) => {
    setPaginateIndex(off) // set the paginate index
    processRequest(`https://api.spotify.com/v1/search?q=${searchQuery}&limit=${limit}&offset=${off*limit}&type=album`)
  }

  /**
   * Process the request to get the album list
   * @param {String} url 
   */
  const processRequest = async (url) => {
    // call api/search to retrieve the albums - depending on search query, limit and offset
    const res = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      body: url
    })
    const data = await res.json()

    if (!data) return <div>Loading...</div>

    if (data && data.albums) { // we got this, so set our states
      setTotal(data.albums.total)
      setAlbums(data.albums.items)
      setOffset(data.albums.offset)

      // setup our local storage - for later reuse
      localStorage.setItem('queryUrl', url)
      localStorage.setItem('query', searchQuery)
      localStorage.setItem('pageIndex', paginateIndex)
    }
  }

  // when component is mounted - process a reseach and setup some state
  useEffect(() => {
    if (localStorage.getItem('query')) {
      setSearchQuery(localStorage.getItem('query'))
      localStorage.removeItem('query') // clear item in local storage
    }
    if (localStorage.getItem('pageIndex')) {
      setPaginateIndex(localStorage.getItem('pageIndex'))
      localStorage.removeItem('pageIndex') // clear item in local storage
    }
    if (localStorage.getItem('queryUrl')) {
      processRequest(localStorage.getItem('queryUrl')) // process research
      localStorage.removeItem('queryUrl') // clear item in local storage

    }
  }, [])

  return (
    <Layout title="Home">
      <p className="mt-3 mb-10 text-2xl">
        Get started by searching for some albums on Spotify
      </p>
      <InputForm searchSubmitted={searchAlbums} clearClicked={clearQuery} />
      { total !== 0 &&
        <AlbumList albums={albums} />
      }
      { total !== 0 &&
        <Pagination total={total} limit={limit} offset={offset} pageIndex={paginateIndex} indexClicked={searchIndex} />
      }
    </Layout>
  )
}
