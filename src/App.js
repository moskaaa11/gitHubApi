import React, {useState, useEffect} from 'react';
import './App.css';
import Input from './components/Input';
import Button from './UI/Button';
import Header from './UI/Header';
import Main from './UI/Main';
import InfoRepo from './components/InfoRepo';
import ToDo from './components/ToDo';
import InProgress from './components/InProgress';
import Done from './components/Done';


function App() {
  
  const [newRepo, setNewRepo] = useState('')
  const [submit , setSubmit] = useState(false)
  const [submitedRepo, setSubmitedRepo] = useState('')

  const newUrlRepo = (newValue) => {
    setNewRepo(newValue)
  }

  const submitClick = () => {
    setSubmit(true)
    setSubmitedRepo(newRepo)
  }

  return (
    <React.Fragment>
      <Header>
        <Input onChange={newUrlRepo}/>
        <Button onClick={submitClick} >Load issues</Button>
      </Header>
      {submit && <InfoRepo value={submitedRepo}/>}
      {!submit && <InfoRepo/>}
      <Main>
        <ToDo/>
        <InProgress/>
        <Done/>
      </Main>
    </React.Fragment>
  );
}

export default App;
