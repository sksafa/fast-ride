import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router';
import Error from './components/Error/Error';
import Home from './components/Home/Home';
import SearchArea from './components/SearchArea/SearchArea';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      <p>email :{loggedInUser.name}</p>
      <Router>
        <Header></Header>

        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>


          <PrivateRoute path="/details/:id">
            <SearchArea></SearchArea>
          </PrivateRoute>

          <Route path="*">
            <Error></Error>
          </Route>


        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
