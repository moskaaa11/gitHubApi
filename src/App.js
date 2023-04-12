import React from 'react';
import './App.css';
import Input from './components/Input';
import Button from './UI/Button';
import Header from './UI/Header';
import Main from './UI/Main';

function App() {
  

  return (
    <React.Fragment>
      <Header>
        <Input/>
        <Button>Load issues</Button>
      </Header>
      <Main>

      </Main>
    </React.Fragment>
  );
}

export default App;
