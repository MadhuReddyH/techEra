import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import ItemDetails from './components/courseItemDetails'

import Notfound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={ItemDetails} />
    <Route component={Notfound} />
  </Switch>
)

export default App
