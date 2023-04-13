import React, {useState, useEffect} from 'react';
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
  const [currentList, setCurrentList] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [againRepo, setAgainRepo] = useState(0)

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
      if (againRepo === 0) {
        setAgainRepo(1)
      } else {
        setAgainRepo(0)
      }
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
      console.log(response.data)
      setSubmit(true)
    })
  }

  const dragOver = (e) => {
    e.preventDefault()
    
  }

  const dragStart = (e, list , el) => {
    setCurrentList(list)
    setCurrentItem(el)
  }

  const onDrops = (e, list , el) => {
    e.preventDefault()
    const currentIndex = currentList.items.indexOf(currentItem)
    currentList.items.splice(currentIndex, 1)
    const dropIndex = list.items.indexOf(el)
    list.items.splice(dropIndex + 1, 0 , currentItem)
    setColumnList(columnList.map(l => {
      if(l.id === list.id) {
        return list
      } else if(l.id === currentList.id) {
        return currentList
      } else {
        return l
      }
    }))
  }

  const onDropsCard = (e, list ) => {
    list.items.push(currentItem)
    const currentIndex = currentList.items.indexOf(currentItem)
    currentList.items.splice(currentIndex, 1)
    setColumnList(columnList.map(l => {
      if(l.id === list.id) {
        return list
      } else if(l.id === currentList.id) {
        return currentList
      } else {
        return l
      }
    }))
  }

  useEffect(()=>{
    localStorage.setItem(`${newRepo}`, JSON.stringify(columnList));
  },[columnList])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(`${newRepo}`));
    if (items) {
      setColumnList(items);
    }
  }, [againRepo]);

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
        <ToDo 
        key={list.id} 
        title={list.title}
        onDragOver={(e)=> dragOver(e)}
        onDrop={(e)=> onDropsCard(e, list)}
        >
        {submit && list.items.map(el =>
          <Card 
            onDragOver={(e)=> dragOver(e)}
            onDragStart={(e)=> dragStart(e, list , el)}
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
