// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  const response = await cloud.database().collection('article')
    .where({
      type: event.type,
    })
    .skip(event.page_no)
    .limit(event.page_size)
    .orderBy('updateAt', 'desc')
    .get()
  const result = await cloud.database().collection('article')
    .where({
      type: event.type,
    })
    .count()
  return {
    response,
    result
  }
}