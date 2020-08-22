// import Playlist from "../components/Playlist/Playlist";

let accessToken;
const clientId = '24a699cc555d4644ae3e0cac21ebb1dd';
const redirectUri = "http://localhost:3000/";

// accessToken = window.localStorage.getItem('accessToken');
const Spotify = {
  getAccessToken (){
    // preserving the token in local storage until it expires
    if (accessToken){
      return accessToken; 
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch){
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      //clean up params, allowing us to retrieve a new access token when expired.
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      window.localStorage.setItem('accessToken', accessToken);


      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    } 
  },

  search(term) {
    //use stored accessToken or generate a new one
    accessToken = window.localStorage.getItem('accessToken');
    console.log(accessToken)
    if (!accessToken){
      accessToken = Spotify.getAccessToken();
    }
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(!jsonResponse.tracks){
        return []
      }
      console.log('searching for:')
      console.log(jsonResponse);
      return jsonResponse.tracks.items.map(track=> ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    })
  },

  savePlaylist(playlistName, trackUris){
    if(!playlistName || !trackUris.length){
      return;
    }
    
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`}
    let userId;
    console.log('Saving a playlist')
    console.log(accessToken)

    //GET userId
    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id
      //POST new playlist
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: playlistName })
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id
        //POST tracks to playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        })
      })
    }) 
  }

}

export default Spotify