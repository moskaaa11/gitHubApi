import React from 'react'
import classes from './Card.module.css'

const Card = (props) => {

  let year = new Date(props.created).getFullYear();
  let month = new Date(props.created).getMonth() + 1
  let day = new Date(props.created).getDate() + 1

  let mainText =`# ${props.id} opened ${year}.${month}.${day}`

  return (
    <div 
      className={classes.container} 
      onDragOver={props.onDragOver}
      draggable={true}
      onDragLeave={props.onDragLeav}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      onDrop={props.onDrop}
    >
        <h4 className={classes.title}>{props.title}</h4>
        <p className={classes.text}>{mainText}</p>
        <p className={classes.text}>{props.name} | coments: {props.comments}</p>
    </div>
  )
}

export default Card