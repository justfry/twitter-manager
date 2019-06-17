const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const inquirer = require('inquirer')
const configure = require('../../commands/configure')
const CredentialManager = require('../../lib/credential-manager')

describe('the configure module', async() => {
    var creds
    before(() => {
        creds = new CredentialManager('twitup-test')
    })
    it('should add credential when none are found', async () => {
        sinon.stub(inquirer, 'prompt').resolves({key: 'one', secret: 'two', accessSecret: 'three', accessToken: 'four'})
        await configure.consumer('twitup-test')
        let [key, secret, accessSecret, accessToken] = await creds.getKeys()
        expect(key).to.equal('one')
        expect(secret).to.equal('two')
        expect(accessSecret).to.equal('three')
        expect(accessToken).to.equal('four')
        inquirer.prompt.restore()
    })
    it('should overwrite when none are found', async () => {
        sinon.stub(inquirer, 'prompt').resolves({key: 'three', secret: 'one', accessSecret: 'four', accessToken: 'two'})
        await configure.consumer('twitup-test')
        let [key, secret, accessSecret, accessToken] = await creds.getKeys()
        expect(key).to.equal('three')
        expect(secret).to.equal('one')
        expect(accessSecret).to.equal('four')
        expect(accessToken).to.equal('two')
        inquirer.prompt.restore()
    })
    it('should add to follow list of users', async () => {
        sinon.stub(inquirer, 'prompt').resolves([
            'ipazii', 
            'electroeb', 
            'fe_city_boy', 
            'No_more_Vodka', 
            'kass_my_ass', 
            'feeling_so_real',
            'nikitamartovsky',
            'badboev'
        ])
        await configure.toFollow('twitup-test')
        let toFollow = await creds.getToFollow()
        expect(toFollow.join(',')).to.equal(['ipazii', 
        'electroeb', 
        'fe_city_boy', 
        'No_more_Vodka', 
        'kass_my_ass', 
        'feeling_so_real',
        'nikitamartovsky',
        'badboev'].join(','))
    })
    after(async () => {
        await creds.clearAll()
    })
})