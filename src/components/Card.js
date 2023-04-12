import React from 'react'
import classes from './Card.module.css'

const Card = () => {
  return (
    <div className={classes.container}>
        <h4 className={classes.title}>Some issues title</h4>
        <p className={classes.text}>#314 opened 3 days ago</p>
        <p className={classes.text}>Admin | coments: 3</p>
    </div>
  )
}

export default Card