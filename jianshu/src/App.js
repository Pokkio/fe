import React, { Component, Fragment} from 'react'
import  { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { GlobalStyle } from './style'
import { GlobalIconStyle } from './statics/iconfont/iconfont'
import store from './store'
import Header from './common/header'
import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Write from './pages/write'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <BrowserRouter>
            <GlobalStyle/>
            <GlobalIconStyle />
            <Header/>
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
            <Route path='/detail/:id' component={Detail}></Route>
          </BrowserRouter>
        </Fragment>
      </Provider>
      
    )
  }
}

export default App
