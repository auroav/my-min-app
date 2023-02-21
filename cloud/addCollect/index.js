// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  const result = await cloud.database()
    .collection('collected')
    .add({
      // data 字段表示需新增的 JSON 数据
      data: {
        exerciseKey: event.id,
        date: new Date(),
      }
    })
  return result;
}