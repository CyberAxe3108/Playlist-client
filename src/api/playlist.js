

const BASE_URL = import.meta.env.VITE_API_URL

export async function getAllPlaylists() {
    const response = await fetch(`${BASE_URL}/playlists`)
    if (!response.ok) {
        throw new Error('Failed to fetch playlists')
    }
    return response.json()
}

export async function getPlaylistById(id){
    const response = await fetch(`${BASE_URL}/playlists/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch playlist')
    }
    return response.json();
}

export async function createPlaylist(data){
    const response = await fetch(`${BASE_URL}/playlists`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)

    })
    if(!response.ok) throw new Error('Failed to create playlist')
        return response.json() 

}

export async function addSong(playlistId, songData){
    const response = await fetch(`${BASE_URL}/playlists/${playlistId}/songs`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(songData)

    })
    if(!response.ok) throw new Error('Failed to add new song')
        return response.json() 

}

export async function deleteSong(id){
    const response = await fetch(`${BASE_URL}/songs/${id}`,{
        method: 'DELETE'
    })
    if (!response.ok) throw new Error ('Request was unsuccessful')
}

export async function deletePlaylist(id){
    const response = await fetch (`${BASE_URL}/playlists/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error ("Request was unsuccessful")

}

export async function updatePlaylist(id, data){
    const response = await fetch(`${BASE_URL}/playlists/${id}`,{
        method:'PATCH',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    if(!response.ok) throw new Error("Unable to update playlist")
        return response.json()
}