const Twit = require('twit')
const keys = require('../keys/keys')
const fs = require('fs')

const T = new Twit(keys)

const getFollowed = screenName => {
    return new Promise((rs,rj) => T.get('friends/ids', { screen_name: screenName, stringify_ids: true }, (err, data, response) => {
        if (err) rj(err)
        rs(data.ids)
      }))
}
const destroyFriendship = id => {
    return new Promise((rs,rj) => T.post('friendships/destroy', { id: id }, (err, data, response) => {
        if (err) rj(err)
        rs(data)
      }))
}
const getFollowers = screenName => {
    return new Promise((rs,rj) => T.get('followers/ids', { screen_name: screenName, stringify_ids: true }, (err, data, response) => {
        if (err) rj(err)
        rs(data.ids)
      }))
}
const makeFriendship = id => {
    
    return new Promise((rs,rj) => T.post('friendships/create', { id: id }, (err, data, response) => {
        if (err) rj(err)
        else{
            getPosts(id)
                .then(posts => likeTweet(posts))
                .catch(err => console.error(err))
            rs(data)
        }
      }))
}
const getPosts = userID => {
    return new Promise((rs,rj) => T.get('statuses/user_timeline', { id: userID }, (err, data, response) => {
        if (err) rj(err)
        rs(data.slice(0,3))
      }))
}
const likeTweet = tweets => {
    fs.appendFileSync('./output/likes.json',JSON.stringify(tweets))
    for (var i = 0, len = tweets.length; i < len; i++){
        T.post('favorites/create', { id: tweets[i].id_str }, (err, data, response) => {
            if (err) rj(err)
        })
    }
}
async function deleteFollowers(mainMan){
    let destroyed = []
    try{
        ids = await getFollowed(mainMan)
    } catch(err){
        console.error("get followed " + err)
    }
    for (i = 0, len = ids.length; i < len; i++){
        console.log(`${i} of ${len} id: ${ids[i]}`)
        try{
            destroyed.push(await destroyFriendship(ids[i]))
        } catch(err){
            console.error("destroy " + err)
        }
    }
    return destroyed
}
function delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
}
const getRandomMan = () => {
    mainMans = [
        'ipazii', 
        'electroeb', 
        'fe_city_boy', 
        'No_more_Vodka', 
        'kass_my_ass', 
        'feeling_so_real',
        'nikitamartovsky',
        'badboev'
    ]
    return mainMans[Math.floor(Math.random() * mainMans.length)]
}

async function makeFollowers(){
    let maked = []
    try{
        ids = await getFollowers(getRandomMan())
    } catch(err){
        console.error("get followed " + err)
    }
    for (i = 0, len = ids.length; i < len; i++){
        console.log(`${i} of ${len} id: ${ids[i]}`)
        try{
            maked.push(await makeFriendship(ids[i]))
        } catch(err){
            console.error("make friends " + err)
        }
        await delay(Math.floor(Math.random() * (9 - 6 + 1) + 6) * 40000)
        ids = await getFollowers(getRandomMan())
    }
    return maked
}

module.exports.makeFollowers = makeFollowers
module.exports.deleteFollowers = deleteFollowers