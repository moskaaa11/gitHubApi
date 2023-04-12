import React from 'react'
import classes from './ToDo.module.css'
import Card from './Card'

const ToDo = () => {
  return (
    <div className={classes.list}>
        <h1 className={classes.title}>To Do</h1>
        <div className={classes.column}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default ToDo