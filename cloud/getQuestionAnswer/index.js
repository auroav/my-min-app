// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  const result = await cloud.database().collection('question_detail').where({
    exerciseKey: event.id
  }).get();
  return result;
}