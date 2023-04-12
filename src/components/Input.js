import React , {useState , useEffect} from 'react'
import classes from './mainInput.module.css'

const Input = (props) => {

  const [urlValue, setUrlValue] = useState('')

  const changingValue = (event) => {
    setUrlValue(event.target.value)
  }

  useEffect(()=> {
    props.onChange(urlValue)
  }, [urlValue])

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