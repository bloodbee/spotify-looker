import React from 'react'
import { useRouter } from 'next/router'
import useSwr from 'swr'

import Layout from '../../layouts/layout'
import formattedArtists from '../../utils/formatArtists'

import { LinkIcon, ArrowLeftIcon } from '@heroicons/react/solid'

// fetcher used by useSwr
const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Album() {
  const router = useRouter()
  
  // Call ou api/album/:id to get the specific album
  const { data, error } = useSwr(
    () => router.query.id && `/api/album/${router.query.id}`,
    fetcher
  )

  if (error) return <div>Failed to load user</div>
  if (!data) return <div>Loading...</div>

  // Some inline css background styling to display the album cover
  const backgroundStyle = {
    backgroundImage: `url(${data.images[0].url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <Layout title="Album">
      <span className="back-button flex items-center my-6 text-2xl mr-auto hover:cursor-pointer" onClick={() => router.back()}>
        <ArrowLeftIcon className="text-green-900 w-10 h-10 mr-2" />
        Back
      </span>
      {data != null && (
        <div className="w-full mx-auto rounded-lg" style={backgroundStyle}>
          <div className="my-4 sm:my-20 w-4/5 sm:w-3/5 mx-auto bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg sm:text-4xl leading-6 font-medium text-gray-900">{ data.name }</h3>
              <a href={ data.external_urls.spotify } rel="noreferrer" target="_blank" className="mt-1 max-w-2xl text-sm text-green-400">{ data.external_urls.spotify }</a>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Artists</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ formattedArtists(data.artists) }</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Label</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ data.label }</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Release date</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ new Date(data.release_date).toLocaleDateString() }</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Total tracks</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ data.total_tracks }</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ data.album_type.toUpperCase() }</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Tracks</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      { data.tracks.items.map(item => (
                        <li key={item.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 text-left">{ item.name }</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                          <a target="_blank" rel="noreferrer" href={item.external_urls.spotify} className="text-green-400 hover:text-green-600">
                            <LinkIcon className="h-5 w-5 float-right" />
                          </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
