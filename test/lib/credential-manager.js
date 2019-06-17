const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const CredentialManger = require('../../lib/credential-manager')

chai.use(chaiAsPromised)

describe('the credential manager', () => {
    var creds
    before(() => {
        creds = new CredentialManger('twitup-test')
    })
    it('should return credential when they are found', async () => {
        await creds.storeKeys('foo', 'bar', 'best', 'player')
        let [key, secret, acessSecret, accessToken] = await creds.getKeys()
        expect(key).to.equal('foo')
        expect(secret).to.equal('bar')
        expect(acessSecret).to.equal('best')
        expect(accessToken).to.equal('player')
    })
    it('should reject when no credentials are found', async () => {
        await creds.clearKeys()
        expect(creds.getKeys()).to.be.rejected
    })

    after(async () => {
        await creds.clearKeys()
    })
})