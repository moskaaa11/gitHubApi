import React from 'react'
import classes from './ToDo.module.css'
import Card from './Card'

const ToDo = (props) => {

  let data = props.data
  let year
  let month
  let day
  
  if (props.onSubmit) {
    console.log(data)
    year = new Date(data[0].created_at).getFullYear();
    month = new Date(data[0].created_at).getMonth() + 1
    day = new Date(data[0].created_at).getDate() + 1
  }

  return (
    <div className={classes.list}>
        <h1 className={classes.title}>To Do</h1>
        <div className={classes.column}>
        {props.onSubmit && data.map(el =>
        <Card 
            key={el.id}
            title={el.title}
            id={el.id}
            created={el.created_at}
            comments={el.comments}
            />)}
        </div>
    </div>
  )
}

export default ToDo