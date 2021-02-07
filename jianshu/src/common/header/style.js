import styled from 'styled-components'
import logoPic from '../../statics/logo.png'

export const HeaderWrapper = styled.div`
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  z-index: 1;
`

export const Logo = styled.a`
  height: 56px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: url(${logoPic});
  background-size: contain;
`

export const Nav = styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  padding-right: 70px;
  box-sizing: border-box;
`

export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #333;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    color: #969696;
  }
  &.active {
    color: #ea6f5a;
  }
  &.logout, &.login {
    cursor: pointer;
  }
`

export const SearchWrapper = styled.div`
  float: left;
  position: relative;
  .zoom {
    position: absolute;
    right: 5px;
    width: 30px;
    line-height: 30px;
    border-radius: 15px;
    bottom: 5px;
    text-align: center;

    &.focused {
      color: #fff;
      background: #777;
    }
  }
`

export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
  width: 190px;
  height: 38px;
  padding: 0 40px 0 20px;
  margin-top: 9px;
  margin-left: 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  color: #666;

  &::placeholder {
    color: #999;
  }
  &.focused {
    width: 260px;
  }
  &.slide-enter {
    width: 190px;
    transition: all .2s ease-out;
  }
  &.slide-enter-active {
    width: 260px;
  }
  &.slide-exit {
    width: 190px;
    transition: all .2s ease-out;
  }
`

export const SearchInfo = styled.div`
  position: absolute;
  left: 20px;
  top: 56px;
  width: 240px;
  padding: 0 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, .2);
  background: #fff;
`

export const SearchInfoTitle = styled.div`
  margin: 20px 0 15px 0;
  line-height: 20px;
  font-size: 14px;
  color: #969696
`

export const SearchInfoSwitch = styled.span`
  float: right;
  font-size: 13px;
  cursor: pointer;
  .spin {
    displat: block;
    font-size: 12px;
    margin-right: 3px;
    transition: all .2s ease-in;
    transform-origin: center center;
  }
`

export const SearchInfoList = styled.div`
  overflow: hidden;
`

export const SearchInfoItem = styled.a`
  display: block;
  float: left;
  line-height: 20px;
  padding: 0 5px;
  margin: 0 10px 15px 0;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #787878;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`

export const Button = styled.div`
  float: right;
  line-height: 38px;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  border-radius: 19px;
  border: 1px solid #ec6149;
  font-size: 14px;

  &.reg {
    color: #ec6149;
  }
  &.writting {
    color: #fff;
    background: #ec6149;
  }
`

