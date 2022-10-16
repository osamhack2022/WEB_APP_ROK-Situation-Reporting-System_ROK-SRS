const getScore = require('./ai/classifier.js')

async function getscorewrapper(){ 
    let score  = await getScore('위병소 앞 총기를 든 거수자들이 나타났습니다. 자살하고싶어') //should get 5
    console.log(score)
    let score2 = await getScore('당직사관님, 다음 회식때 피자를 먹고싶습니다!') //should get 2
    console.log(score2)
}
getscorewrapper()