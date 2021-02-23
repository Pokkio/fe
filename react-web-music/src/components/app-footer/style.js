/**
 * @format
 * @Description: 页面底部样式文件
 * @Author: Pokkio
 * @Date: 2020-12-29 21:43:39
 * @LastEditTime: 2020-12-29 21:43:39
 * @LastEditors: Pokkio
 */
import styled from 'styled-components'
import sprite_footer_02 from '../../assets/img/sprite_footer_02.png'
import sprite_footer_01 from '../../assets/img/sprite_footer_01.png'

const FooterWrapper = styled.div`
  height: 172px;
  background-color: #f2f2f2;
  color: #666;
  border-top: 1px solid #d3d3d3;

  .footer_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const FooterLeft = styled.div`
  padding-top: 15px;
  line-height: 24px;

  .footer_link {
    a {
      color: #999;
    }
  }

  .footer_line {
    margin: 0 10px;
    color: #999;
  }

  .footer_copyright {
    span {
      margin-right: 15px;
    }
  }
`

const FooterRight = styled.ul`
  display: flex;

  .footer_img-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 40px;

    .footer_img-link {
      display: block;
      width: 50px;
      height: 45px;

      background-image: url(${sprite_footer_02});
      background-size: 110px 450px;
    }

    :nth-child(1) .link {
      background-position: -60px -101px;
    }
    :nth-child(2) .link {
      background-position: 0 0;
    }
    :nth-child(3) .link {
      background-position: -60px -50px;
    }
    :nth-child(4) .link {
      background-position: 0 -101px;
    }

    .footer_img-title {
      margin-top: 5px;
      display: block;
      width: 52px;
      height: 10px;
      background-image: url(${sprite_footer_01});
      background-size: 180px 100px;
    }

    :nth-child(1) .title {
      background-position: -1px -90px;
    }
    :nth-child(2) .title {
      background-position: 0 0;
      margin-top: 7px;
    }
    :nth-child(3) .title {
      background-position: 0 -54px;
      margin-top: 6px;
    }

    :nth-child(4) .title {
      background-position: -1px -72px;
      margin-top: 6px;
    }
  }
`

export { FooterWrapper, FooterLeft, FooterRight }
