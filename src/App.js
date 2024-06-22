import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (searchTerm) {
      setData(fetchData(searchTerm))
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if (resData.results.length > 0) {
          return setData(resData.results)
        } else {
          return setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  const rednerGallery = () => {
    if(data){
      return (
        <div>
          <SearchBar handleSearch={handleSearch} />
          {message}
          <Suspense fallback={<h1>Loading...</h1>}>
            <Gallery data={data} />
          </Suspense>
          <Gallery data={data} />
          <AlbumView />
          <ArtistView />
        </div>
    )}
  }
}




export default App;

