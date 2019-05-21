const readline = require('readline')
const twitter = require('./drivers/twitter')


const ask = query => {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise(rs => r1.question(query, ans => {
        r1.close()
        rs(ans)
    }))
}
process.argv[2] = "justice_fry"
process.argv[3] = "a"

async function main () {
    let whomToDo = process.argv[2] 
    let whatToDo = process.argv[3] 
    let enableLikes = process.argv[4] 
    enableLikes == "yes"? enableLikes = true : enableLikes = false
    
    switch (whatToDo){
        case "d": twitter.deleteFollowers(whomToDo).then(destroyed => console.log(destroyed))
        break
        case "a": twitter.makeFollowers(whomToDo, enableLikes).then(maked => console.log(maked))
        break
        default: 
    }
}
main()