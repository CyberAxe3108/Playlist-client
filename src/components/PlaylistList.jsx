import { useState, useEffect } from 'react'
import { getAllPlaylists } from '../api/playlist'
import { Link } from 'react-router-dom'
import NewPlaylist  from './NewPlaylistForm'
// import PlaylistDetail from './PlaylistDetails'

function PlaylistList() {
    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // call getAllPlaylists here, handle success and error
        getAllPlaylists()
        .then((data) =>{
            setPlaylists(data)
            setLoading(false)
        })
        .catch((error) =>{
        setError(error.message)
        setLoading(false)
        })
    }, [])

    function handleAdd(newPlaylist) {
    setPlaylists(prevPlaylists => [...prevPlaylists, { ...newPlaylist, Songs: [] }])
    }

    //show a loading message
    if(loading) return <p style={{padding: 16}}> Loading Playlits...</p>
    if(error) return <p> Error: {error}</p>
    // show the error message
    return(
        <div>
            <div className="page-header">
                <h1>My Playlists</h1>
                <NewPlaylist onAdd={handleAdd} />
            </div>
            <div className="playlist-grid">
                {playlists.map((playlist) => (
                    <Link to={`/playlists/${playlist.id}`} key={playlist.id} className="playlist-card">
                    <h2>{playlist.name}</h2>
                    <p>{playlist.Songs.length} song{playlist.Songs.length !== 1 ? "s" : ''}</p>
                </Link>
                ))}
            </div>
        </div>
    )
}

export default PlaylistList