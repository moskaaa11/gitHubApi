import classes from './ToDo.module.css'
import Card from './Card'

const Done = () => {
  return (
    <div className={classes.list}>
        <h1 className={classes.title}>Done</h1>
        <div className={classes.column}>
            <Card/>
        </div>
    </div>
  )
}

export default Done