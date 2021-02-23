/* eslint-disable prettier/prettier */
/**
 * @format
 * @Description: 发现音乐功能
 * @Author: Pokkio
 * @Date: 2020-12-23 20:10:19
 * @LastEditTime: 2020-12-23 20:10:21
 * @LastEditors: Pokkio
 */
import React, { FC, memo, ReactElement, ReactNode } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { NavLink } from 'react-router-dom'

import { dicoverMenu } from '../../common/local-data'

import { DiscoverWrapper, DiscoverTopMenu } from './style'

interface Iprops {
  children?: ReactNode
}

const RMDiscover = (props: RouteConfigComponentProps & Iprops): ReactElement => {
  const { route } = props

  return (
    <DiscoverWrapper>
      <div className="discover_top">
        <DiscoverTopMenu className="wrap-v1">
          {
            dicoverMenu.map(item => {
              return (
                <div className="discover_menu-item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </DiscoverTopMenu>
      </div>
      { renderRoutes(route) }
    </DiscoverWrapper>
  )
}

export default memo(RMDiscover)
