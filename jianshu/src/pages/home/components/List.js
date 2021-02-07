import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListItem, ListInfo, LoadMore } from '../style'
import { actionCreators } from '../store'

class List extends Component {
  render() {
    const { articleList, getMoreList, articlePage } = this.props

    return (
      <div>
        {
          articleList.map(item => {
            return (
              <Link
                key={item.get('id')}
                to={'/detail/' + item.get('id')}
              >
                <ListItem
                >
                  <img
                    src={item.get('imgUrl')}
                    alt='img'
                    className='pic'
                  />
                  <ListInfo>
                    <h3 className='title'>{item.get('title')}</h3>
                    <p className='desc'>{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(articlePage)}>更多内容</LoadMore>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.getIn(['home', 'articleList']),
    articlePage: state.getIn(['home', 'articlePage'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMoreList(page) {
      dispatch(actionCreators.getMoreList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)