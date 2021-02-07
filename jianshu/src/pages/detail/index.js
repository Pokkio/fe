import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { actionCreators } from './store'
import {
  DetailWrapper,
  Header,
  Content
} from './style'

class Detail extends Component {

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id)
  }

  render() {
    const { title, content } = this.props

    return (
      <DetailWrapper>
        <Header>{title}</Header>
        <Content dangerouslySetInnerHTML={{__html: content}}>
        </Content>
      </DetailWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (id) => {
      dispatch(actionCreators.getDetail(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail))