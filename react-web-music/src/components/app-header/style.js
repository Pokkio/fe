/**
 * @format
 * @Description: 页面头部样式文件
 * @Author: Pokkio
 * @Date: 2020-12-28 21:16:31
 * @LastEditTime: 2020-12-28 21:16:31
 * @LastEditors: Pokkio
 */
import styled from 'styled-components'
import sprite01 from '../../assets/img/sprite_01.png'

const HeaderWrapper = styled.div`
  height: 75px;
  color: #fff;
  background-color: #242424;

  .header_content {
    height: 70px;

    display: flex;
    justify-content: space-between;
  }

  .header_divide {
    height: 5px;
    background-color: #c20c0c;
  }
`

const HeaderLeft = styled.div`
  display: flex;

  .header_logo {
    display: block;
    width: 176px;
    height: 69px;
    background-position: 0 0;
    text-indent: -9999px;
  }

  .header_select-list {
    display: flex;
    line-height: 70px;

    .header_select-item {
      position: relative;
      a {
        display: block;
        padding: 0 20px;
        color: #ccc;
      }

      :last-of-type a {
        position: relative;
        ::after {
          position: absolute;
          content: '';
          width: 28px;
          height: 19px;
          background-image: url(${sprite01});
          background-position: -190px 0;
          top: 20px;
          right: -15px;
        }
      }

      &:hover a,
      a.active {
        color: #fff;
        background: #000;
        text-decoration: none;
      }

      .active .icon {
        position: absolute;
        display: inline-block;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        background-position: -226px 0;
      }
    }
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 12px;

  .header_search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .header_center {
    margin: 0 16px;
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    cursor: pointer;
  }

  .header_login {
    cursor: pointer;
  }
`

export { HeaderWrapper, HeaderLeft, HeaderRight }
