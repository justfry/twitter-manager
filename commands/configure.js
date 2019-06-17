const inquirer = require('inquirer')
const CredentialManager = require('../lib/credential-manager')
const util = require ('../lib/util')

const configure = {
    async consumer (name) {
        let creds = new CredentialManager(name)
        let answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'key',
                message: 'Enter your Twitter Consumer Key:',
                validate: util.notEmpty,
            },
            {
                type: 'password', 
                name: 'secret', 
                message: 'Enter your Twitter Consumer Secret: ',
                validate: util.notEmpty,
            },
            {
                type: 'password', 
                name: 'accessSecret', 
                message: 'Enter your Twitter Access Token: ',
                validate: util.notEmpty,
            },
            {
                type: 'password', 
                name: 'accessToken', 
                message: 'Enter your Twitter Access Token Secret: ',
                validate: util.notEmpty,
            },
        ])
        await creds.storeKeys(answers.key, answers.secret, answers.accessSecret, answers.accessToken)
    },
    async toFollow (name) {
        let creds = new CredentialManager (name)
        let answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'key',
                message: 'Enter list of usernames you want to steal followers from separeted by comma \n or leave it empty to use default settings'
            }
        ])
        if (answers == '') answers = [
            'ipazii', 
            'electroeb', 
            'fe_city_boy', 
            'No_more_Vodka', 
            'kass_my_ass', 
            'feeling_so_real',
            'nikitamartovsky',
            'badboev'
            ].join(',')
        await creds.storeToFollow(answers)
    }
}

module.exports = configure