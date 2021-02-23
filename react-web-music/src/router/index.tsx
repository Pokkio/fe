/**
 * @format
 * @Description:
 * @Author: Pokkio
 * @Date: 2020-12-17 22:12:20
 * @LastEditTime: 2020-12-17 22:14:07
 * @LastEditors: Pokkio
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

import RMDiscover from '../views/discover'
import RMRecommend from '../views/discover/c-views/recommend'
import RMRinking from '../views/discover/c-views/ranking'
import RMSongs from '../views/discover/c-views/songs'
import RMRadio from '../views/discover/c-views/radio'
import RMArtist from '../views/discover/c-views/artist'
import RMAlbum from '../views/discover/c-views/album'

import RMFriend from '../views/friend'
import RMMine from '../views/mine'

const RMRoutes: RouteConfig[] = [
  {
    path: '/',
    component: RMDiscover,
    exact: true,
    render() {
      return <Redirect to="/discover" />
    },
    routes: [
      {
        path: '/discover/recommend',
        component: RMRecommend,
      },
      {
        path: '/discover/ranking',
        component: RMRinking,
      },
      {
        path: '/discover/songs',
        component: RMSongs,
      },
      {
        path: '/discover/radio',
        component: RMRadio,
      },
      {
        path: '/discover/artist',
        component: RMArtist,
      },
      {
        path: '/discover/album',
        component: RMAlbum,
      },
    ],
  },
  {
    path: '/discover',
    component: RMDiscover,
  },
  {
    path: '/mine',
    component: RMMine,
  },
  {
    path: '/friend',
    component: RMFriend,
  },
]

export default RMRoutes
