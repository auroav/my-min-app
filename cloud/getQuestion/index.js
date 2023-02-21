// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event) => {
  let response = {};
  let result = {};
  if (event.type) {
    response = await cloud.database().collection('question_set')
      .where({
        type: event.type,
      })
      .skip(event.page_no)
      .limit(event.page_size)
      .orderBy('updateAt', 'desc')
      .get();
    result = await cloud.database().collection('question_set')
      .where({
        type: event.type,
      })
      .count()
  } else {
    response = await cloud.database().collection('question_set')
      .skip(event.page_no)
      .limit(event.page_size)
      .orderBy('updateAt', 'desc')
      .get();
    result = await cloud.database().collection('question_set')
      .count()
  }
  return {
    response,
    result
  }
}