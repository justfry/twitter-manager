#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const twitter = require('../lib/twitter')
const CredentialManager = require('../lib/credential-manager')

program
    .version(pkg.version)
    .command('configure', 'configure Twitter-related credentials')
    .parse(process.argv)


async function main () {
    const creds = new CredentialManager('twitup')
    let [key, secret, accessSecret, accessToken] = await creds.getKeys()
    console.log(key,secret,accessSecret,accessToken)

    switch (whatToDo){
        case "d": twitter.deleteFollowers(whomToDo).then(destroyed => console.log(destroyed))
        break
        case "a": twitter.makeFollowers(whomToDo, enableLikes).then(maked => console.log(maked))
        break
        default: 
    }
}
//main().catch(console.error)