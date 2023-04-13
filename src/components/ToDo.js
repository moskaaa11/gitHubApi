import classes from './ToDo.module.css'

const ToDo = (props) => {
  

  let data = props.data  

  return (
    <div className={classes.list}>
        <h1 className={classes.title}>{props.title}</h1>
        <div 
        className={classes.column}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
        >
          {props.children}
        </div>
    </div>
  )
}

export default ToDo