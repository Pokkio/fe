/**
 * @format
 * @Description: 发现音乐功能样式
 * @Author: Pokkio
 * @Date: 2020-12-30 22:30:29
 * @LastEditTime: 2020-12-30 22:30:29
 * @LastEditors: Pokkio
 */
import styled from 'styled-components'

const DiscoverWrapper = styled.div`
  .discover_top {
    height: 30px;
    background-color: #c20c0c;
  }
`

const DiscoverTopMenu = styled.div`
  display: flex;
  padding-left: 180px;
  position: relative;
  top: -4px;

  .discover_menu-item {
    a {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 13px;
      margin: 7px 12px 0;
      color: #fff;

      &:hover,
      &.active {
        text-decoration: none;
        background-color: #9b0909;
        border-radius: 20px;
      }
    }
  }
`

export { DiscoverWrapper, DiscoverTopMenu }
