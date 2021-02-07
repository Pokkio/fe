import { request } from './request';

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  });
};

export function getRecommends() {
  return request({
    url: '/recommend'
  })
};

export class Goods {
  // 商品基本数据
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
};

export class ShopC {
  // 店铺数据
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
};

export class GoodsParam {
  // 商品参数数据
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
};
