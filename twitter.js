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

async function main () {
    let whatToDo
    try {
        whomToDo = process.argv[2] || await ask("Please enter username: ")
    } catch(err){}
    try{
        whatToDo = process.argv[3] || await ask("Enter d to delete followed users or a to add followers")
    } catch(err) {}
    switch (whatToDo){
        case "d": twitter.deleteFollowers(whomToDo).then(destroyed => console.log(destroyed))
        break
        case "a": twitter.makeFollowers(whomToDo).then(maked => console.log(maked))
        break
        default:
    }
}
main()