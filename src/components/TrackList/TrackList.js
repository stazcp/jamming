import React from 'react'
import Track from '../Track/Track'
import './TrackList.css'


function TrackList(props){
    if(!props.tracks){
      console.log('No Tracks found!')
      return <p>No Tracks!</p>
    }

    return(
      <div className="TrackList">    
          {
            props.tracks.map(track =>{
                return <Track
                  track={track}
                  key={track.id} 
                  onAdd={props.onAdd}
                  onRemove={props.onRemove}
                  isRemoval={props.isRemoval} /> 
            })
          }
      </div>
    )
  
}


export default TrackList