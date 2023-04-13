import React, {useState} from 'react';
import './App.css';
import Input from './components/Input';
import Button from './UI/Button';
import Header from './UI/Header';
import Main from './UI/Main';
import InfoRepo from './components/InfoRepo';
import ToDo from './components/ToDo';
import InProgress from './components/InProgress';
import Done from './components/Done';
import { Octokit } from "octokit";


function App() {

  let arr

  const [newRepo, setNewRepo] = useState('')
  const [submit , setSubmit] = useState(false)
  const [submitedRepo, setSubmitedRepo] = useState('')
  const [jsonFile, setJsonFile] = useState('')

  const octokit = new Octokit({ auth: `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`});

  const newUrlRepo = (newValue) => {
    setNewRepo(newValue)
  }

  const submitClick = () => {
    setSubmitedRepo(newRepo)
    arr = (newRepo.split('https://github.com/').pop()).split('/');
    console.log(arr)
    fetchRepo(arr[0],arr[1])
  }

  async function fetchRepo(owner, repo) {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
      owner: `${owner}`,
      repo: `${repo}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(response => {
      setJsonFile(response.data)
      setSubmit(true)
    })
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
        <ToDo data={jsonFile} onSubmit={submit}/>
        <InProgress/>
        <Done/>
      </Main>
    </React.Fragment>
  );
}

export default App;
