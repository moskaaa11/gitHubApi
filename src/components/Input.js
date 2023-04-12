import React , {useState} from 'react'
import classes from './mainInput.module.css'

const Input = () => {

  const [urlValue, setUrlValue] = useState('')

  const changingValue = (event) => {
    setUrlValue(event.target.value)
    console.log(urlValue)
  }

  return (
    <React.Fragment>
        <input 
        className={classes.input}
        type='text'
        placeholder='Enter repo URL'
        value={urlValue}
        onChange={changingValue}
        />
    </React.Fragment>
  )
}

export default Input