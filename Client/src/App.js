import React, {Component} from 'react';
import './App.css'
import{BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import LoginUser from './components/LoginUser';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import Menu from './components/Menu';

class App extends Component {
   
  render(){
  return (   
    <div>

    <Router>
    <Menu />
      <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/about' component={About} />
              <Route path='/contact' component={Contact} />
              <Route path='/cart' component={Cart} />
              <Route path='/login' component={LoginUser} />
              <Route path='/register' component={CreateUser} />

      </Switch>
  </Router>     
    </div>  
    
  );
}
}

export default App;
