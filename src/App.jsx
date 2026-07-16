import { BrowserRouter, Routes, Route} from 'react-router-dom'
import PlaylistList from './components/PlaylistList'
import PlaylistDetail from './components/PlaylistDetails'

function App() {
    return (
        <BrowserRouter>
        {/* <nav style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #ccc' }}>
                <Link to="/">All Playlists</Link>
                
            </nav> */}
            <nav className="navbar">
                <div className="navbar-logo"></div>
                <span className="navbar-title">Playlist</span>
            </nav>

            <Routes>
                <Route path="/" element={<PlaylistList />} />
                <Route path="/playlists/:id" element={<PlaylistDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App