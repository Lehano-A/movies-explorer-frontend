import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Main/Movies/Movies';


function App() {


  const [isReg, setIsReg] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const [isProfile, setIsProfile] = useState(true);

  const [isCountCards, setIsCountCards] = useState([0])


  function handleIsReg() {
    setIsReg(true)
  }

  function handleIsLog() {
    setIsReg(true)
  }

  function handleIsProfile() {
    setIsReg(true)
  }

  function handleIsCountCards() {
    setIsCountCards(+1)
  }

  return (
    <div className="page">
      <div className="page__box">

        <Header
          isReg={isReg}
          isLog={isLog}
          isProfile={isProfile}
        />

        <Switch>

          <Route path="/movies">
            <Movies
              handleIsCountCards={handleIsCountCards}

            />
          </Route>

          <Route path="/signup">

          </Route>

          <Route path="/signin">

          </Route>

          <Route path="/">
            <Main />
          </Route>



        </Switch>

        <Footer />

      </div>
    </div>
  )
};

export default App;
