/**
 * @format
 * @Description: 页面头部组件
 * @Author: Pokkio
 * @Date: 2020-11-24 20:53:25
 * @LastEditTime: 2020-12-17 21:36:10
 * @LastEditors: Pokkio
 */
import React, { FC, memo, ReactElement } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'

import RMRoutes from './router'

import RMAppHeader from './components/app-header'
import RMAppFooter from './components/app-footer'

const App: FC = (): ReactElement => {
  return (
    <HashRouter>
      <RMAppHeader />
      {renderRoutes(RMRoutes)}
      <RMAppFooter />
    </HashRouter>
  )
}

export default memo(App)
