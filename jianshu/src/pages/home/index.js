import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  List,
  Recommend,
  Topic,
  Writer
} from './components'
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
 } from './style'
import { actionCreators } from './store'
import banner from '../../statics/banner.jpg'

class Home extends Component {

  constructor(props) {
    super(props)
    this.handleScrollTop = this.handleScrollTop.bind(this)
  }

  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvents()
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.props.changeScrollTop)
  }

  handleScrollTop() {
    window.scrollTo(0, 0)
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTop)
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img
            src={banner}
            className='banner-img'
            alt='banner'
          ></img>
          <Topic />
          <List />
        </HomeLeft>
        
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        {
          this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null
        }
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showScroll: state.getIn(['home', 'showScroll'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeHomeData: () => {
      dispatch(actionCreators.getHomeInfo())
    },
    changeScrollTop: () => {
      if ( document.documentElement.scrollTop > 250 ) {
        dispatch(actionCreators.toggleTopShow(true))
      } else {
        dispatch(actionCreators.toggleTopShow(false))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)