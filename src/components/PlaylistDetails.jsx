import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPlaylistById, deleteSong, deletePlaylist, updatePlaylist } from '../api/playlist'
import NewSong from './NewSong'

function PlaylistDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')

    useEffect(() => {
        getPlaylistById(id)
            .then((data) => {
                setPlaylist(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [id])

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    function handleAddSong(newSong) {
        setPlaylist(prevPlaylist => ({ ...prevPlaylist, Songs: [...prevPlaylist.Songs, newSong] }))
    }

    function handleDeleteSong(songId) {
        deleteSong(songId)
            .then(() => {
                setPlaylist(prevPlaylist => ({
                    ...prevPlaylist,
                    Songs: prevPlaylist.Songs.filter(song => song.id !== songId)
                }))
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    function handleDeletePlaylist() {
        deletePlaylist(id)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    function startEditing() {
        setEditName(playlist.name)
        setEditDescription(playlist.description)
        setIsEditing(true)
    }

    function handleEdit(e) {
        e.preventDefault()
        updatePlaylist(id, { name: editName, description: editDescription })
            .then((updatedPlaylist) => {
                setPlaylist(updatedPlaylist)
                setIsEditing(false)
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    if (loading) return <p style={{ padding: 16 }}>Loading Playlist...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="detail-page">
            <Link to="/" className="back-link">← Back to playlists</Link>

            {isEditing ? (
                <form onSubmit={handleEdit} className="song-form" style={{ marginBottom: '24px' }}>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="btn-delete" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <h1>{playlist.name}</h1>
                    <p className="description">{playlist.description}</p>
                </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {!isEditing && <button onClick={startEditing} className="btn-delete">Edit Playlist</button>}
                <button onClick={handleDeletePlaylist} className="btn-delete">Delete Playlist</button>
            </div>

            <h2>Add a Song</h2>
            <NewSong playlistId={id} onAdd={handleAddSong} />

            <h2>Songs</h2>
            <ul className="song-list">
                {playlist.Songs.map((song) => (
                    <li key={song.id} className="song-item">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist">{song.artist}</span>
                        <span className="song-duration">{formatDuration(song.duration)}</span>
                        <button onClick={() => handleDeleteSong(song.id)} className="btn-delete">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PlaylistDetail