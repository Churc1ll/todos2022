import React from 'react';
import Buttons from './Components/Buttons';
import Input from './Components/Input';
import List from './Components/List';

function App() {
  return (
    <main>
      <header>
        <div className='header-background'>
          <h1>todos</h1>
        </div>
        <section className='controls'>
          <Input />
          <Buttons />
        </section>
      </header>
      <List />
    </main>
  );
}

export default App;
