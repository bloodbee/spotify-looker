
import { LinkIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Image from 'next/image'

import formattedArtists from '../utils/formatArtists'

export default function AlbumList(props) {

  return (
    <div className="mt-20 w-full">
      <table className="w-full shadow divide-y divide-gray-200 table-auto rounded-lg border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="pl-2 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              className="sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Authors
            </th>
            <th
              scope="col"
              className="sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Type
            </th>
            <th
              scope="col"
              className="sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Total tracks
            </th>
            <th
              scope="col"
              className="relative pr-2 sm:px-6 py-3 bg-gray-50"
            >
              <span className="sr-only">Url</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.albums.map((album) => 
            <Link passHref href={`/album/${album.id}`} key={album.id}>
              <tr className="hover:bg-green-50 hover:cursor-pointer">
                <td className="pl-2 sm:px-6 py-4 whitespace-wrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 hidden sm:block">
                      <Image width="50" height="50" className="h-10 w-10 rounded-full" src={album.images[0].url} alt="" />
                    </div>
                    <div className="sm:ml-4 text-left text-sm font-medium text-gray-900">{album.name}</div>
                  </div>
                </td>
                <td className="sm:px-6 py-4 text-center whitespace-wrap text-sm text-gray-900">{formattedArtists(album.artists)}</td>
                <td className="sm:px-6 py-4 text-center whitespace-wrap text-sm text-gray-900">{album.album_type.toUpperCase()}</td>
                <td className="sm:px-6 py-4 text-center whitespace-wrap text-sm text-gray-500">{album.total_tracks}</td>
                <td className="pr-2 sm:px-6 py-4 whitespace-wrap text-right text-sm font-medium">
                  <a target="_blank" rel="noreferrer" href={album.external_urls.spotify} className="text-green-400 hover:text-green-600">
                    <LinkIcon className="h-5 w-5 float-right" />
                  </a>
                </td>
              </tr>
            </Link>
          )}
        </tbody>
      </table>
    </div>
  )
}