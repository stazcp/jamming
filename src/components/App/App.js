import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

// let sampleTrack1 = {
//   name: 'Bob',
//   artist: 'Eminem',
//   album: 'Untouchable',
//   id: 0
// }
// let sampleTrack4 = {
//   name: 'asd',
//   artist: 'Eminem',
//   album: 'XXX',
//   id: 0
// }
// let sampleTrack3 = {
//   name: 'fghasa',
//   artist: 'Eminem',
//   album: 'XXX',
//   id: 0
// }
// let sampleTrack2 = {
//   name: 'Mike',
//   artist: 'Dylan',
//   album: 'first',
//   id: 1
// }

export default function App(){
  //array containing track objects, function in use state makes it run only once
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState('New Playlist');
  const [playListTracks, setPlayListTracks] = useState([]);

  const addTrack = track => {
    if(playListTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    setPlayListTracks(playListTracks.concat(track))
  }

  const removeTrack = track => {
    setPlayListTracks(playListTracks.filter(currentTrack => currentTrack.id !== track.id))
  }

  const updatePlaylistName = name => {
    setPlayListName(name)
  }

  const savePlayList = () => {
    const trackUris = playListTracks.map(track => track.uri)
    Spotify.savePlaylist(playListName, trackUris).then( ()=> {
      setPlayListName('New Playlist')
      setPlayListTracks([])
    })
  }

  //might need arrow function on setSearchResults
  const search = term => {
    Spotify.search(term).then(results => setSearchResults([...searchResults,results]))
  }

  // debugger
  // throw new Error('test')
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
          <SearchBar onSearch={search}/>
        <div className="App-playlist">
            <SearchResults searchResults={searchResults} 
                           onAdd={addTrack}/>
            <Playlist playListName={playListName} 
                      playListTracks={playListTracks}
                      onRemove={removeTrack}
                      onNameChange={updatePlaylistName}
                      onSave={savePlayList} />
        </div>
      </div>
    </div>
  );
}


