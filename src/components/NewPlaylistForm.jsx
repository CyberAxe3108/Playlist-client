import { useState } from 'react'
import { createPlaylist } from '../api/playlist'


function NewPlaylist({ onAdd }){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        createPlaylist({name, description})
        .then((newPlaylist) => {
        onAdd(newPlaylist)
        setName('')
        setDescription('') 
        })
        .catch((err) => {
        setError(err.message)
        })
    }

    return(
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center'}}>
            <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
            {error && <p>Error: {error}</p>}
            <input
            type="text"
            placeholder="Playlist Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Create New Playlist</button>
        </form>
    )

}

export default NewPlaylist