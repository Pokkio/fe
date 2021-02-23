/* eslint-disable prettier/prettier */
/**
 * @format
 * @Description: 页面头部组件
 * @Author: Pokkio
 * @Date: 2020-11-27 20:49:41
 * @LastEditTime: 2020-12-17 22:00:23
 * @LastEditors: Pokkio
 */
import React, { FC, memo, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from "@ant-design/icons";

import { headerLinks } from '../../common/local-data'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

// 头部导航栏数据项
interface Item {
  title: string
  link: string
}

const RMAppHeader: FC = (): ReactElement => {
  // 构造头部导航栏
  const showSelectItem: ( item: Item, index: number ) => ReactElement = ( item, index ) => {
    if ( index < 3 ) {
      return (
        <NavLink to={ item.link } exact>
          { item.title }
          <i className="sprite_01 icon"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={ item.link }>{ item.title }</a>
      )
    }
  }

  return (
    <HeaderWrapper>
      <div className="header_content wrap-v1">
        <HeaderLeft>
          <a className="header_logo sprite_01" href="#/">网易云音乐</a>
          <div className="header_select-list">
            {
              headerLinks.map(( item, index ) => {
                return (
                  <div key={ item.title } className='header_select-item'>
                    { showSelectItem(item, index) }
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="header_search"
            placeholder="音乐/视频/电台/用户"
            prefix={ <SearchOutlined /> }
          />
          <div className="header_center">创作者中心</div>
          <div className="header_login">登录</div>
        </HeaderRight>
      </div>
      <div className="header_divide"></div>
    </HeaderWrapper>
  )
}

export default memo(RMAppHeader)
