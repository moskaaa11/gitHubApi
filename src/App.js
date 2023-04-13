import React, {useState} from 'react';
import './App.css';
import Input from './components/Input';
import Card from './components/Card';
import Button from './UI/Button';
import Header from './UI/Header';
import Main from './UI/Main';
import InfoRepo from './components/InfoRepo';
import ToDo from './components/ToDo';
import { Octokit } from "octokit";


function App() {

  let arr
  let checkvalue = 0
  
  const [columnList, setColumnList] = useState([
    {id: 1, title: 'To do'},
    {id: 2, title: 'In progress'},
    {id: 3, title: 'Done'}
  ])

  const [newRepo, setNewRepo] = useState('')
  const [submit , setSubmit] = useState(false)
  const [submitedRepo, setSubmitedRepo] = useState('')
  const [repoCheck, setRepoCheck] = useState('')

  const octokit = new Octokit({ auth: `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`});

  const newUrlRepo = (newValue) => {
    setNewRepo(newValue)
  }

  const submitClick = () => {
    setSubmitedRepo(newRepo)
    for (let i=0; i < repoCheck.length; i++){
      if (repoCheck[i] === newRepo) {
        checkvalue = 1
      }
    }
    if (checkvalue === 0) {
      arr = (newRepo.split('https://github.com/').pop()).split('/');
      console.log('new repo')
      checkList(newRepo)
      fetchRepo(arr[0],arr[1])
      console.log(repoCheck)
    } else if (checkvalue === 1) {
      console.log('again this repo')
    }
  }

  const checkList = (newRepo) => {
    setRepoCheck([...repoCheck, newRepo]);
  } 

  async function fetchRepo(owner, repo) {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
      owner: `${owner}`,
      repo: `${repo}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(response => {
      setColumnList([
        {id: 1, title: 'To do', items: response.data},
        {id: 2, title: 'In progress', items: []},
        {id: 3, title: 'Done', items: []}
      ])
      setSubmit(true)
    })
  }


  const dragOver = () => {
    console.log(1)
  }

  const dragLeave = () => {
    
  }

  const dragStart = () => {
    
  }

  const dragEnd = () => {
    
  }

  const onDrops = () => {
    
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
        {columnList.map(list=> 
        <ToDo key={list.id} title={list.title}>
          {submit && list.items.map(el =>
            <Card 
              onDragOver={(e)=> dragOver(e, list , el)}
              onDragLeave={(e)=> dragLeave(e)}
              onDragStart={(e)=> dragStart(e)}
              onDragEnd={(e)=> dragEnd(e)}
              onDrop={(e)=> onDrops(e, list , el)}
              name={el.author_association}
              key={el.id}
              title={el.title}
              id={el.id}
              created={el.created_at}
              comments={el.comments}
            />)}
        </ToDo>)}
      </Main>
    </React.Fragment>
  );
}

export default App;
