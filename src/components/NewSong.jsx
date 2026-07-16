import { useState } from 'react'
import {addSong} from '../api/playlist'

function NewSong({playlistId, onAdd}){
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [duration, setDuration] = useState('')
    const [error, setError] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        addSong(playlistId,{ title, artist, duration: Number(duration)})
        .then((newSong) => {
            onAdd(newSong)
            setTitle('')
            setArtist('')
            setDuration('')
        })
        .catch((error) => {
            setError(error.message)
        })
    }


    return( 
    <form onSubmit={handleSubmit} className="song-form" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center'}}>
    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
    <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
    <button type="submit" className="btn-primary">Add</button>
</form>
    )}

export default NewSong