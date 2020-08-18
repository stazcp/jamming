import React from 'react'
import Track from '../Track/Track'
import './TrackList.css'


function TrackList(props){
    // if(!props.tracks){
    //   console.log('No Tracks found!')
    //   return <p>No Tracks!</p>
    // }
    console.log('TrackList')
    return(
      <div className="TrackList">    
          {
            props.tracks.map(trax =>{
              console.log(trax)
              trax.map((track,index) =>{
                console.log(track)
                return <Track
                  track={track}
                  key={index} //track.id
                  onAdd={props.onAdd}
                  onRemove={props.onRemove}
                  isRemoval={props.isRemoval} /> 
              })
            })
          }
      </div>
    )
  
}


export default TrackList