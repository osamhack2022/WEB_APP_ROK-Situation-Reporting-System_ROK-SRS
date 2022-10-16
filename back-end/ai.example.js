const getScore = require('./ai/classifier.js')


let { val } = await getScore('위병소 앞 총기를 든 거수자들이 나타났습니다. 자살하고싶어')
console.log(val)