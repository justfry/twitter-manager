const Configstore = require('configstore')

class CredentialManager {
    constructor (name) {
        this.conf = new Configstore(name)
        this.service = name
    }
    async getKeys(){
        let key = this.conf.get('apiKeys')
        if (!key) {
            throw new Error(`Missing keys -- have you run 'configure ?`)
        } else {
            return [key.key, key.secret, key.accessSecret, key.accessToken]
        }
    }
    async storeKeys(key, secret, accessSecret, accessToken){
        let keys = {
            'key': key, 
            'secret': secret, 
            'accessSecret': accessSecret, 
            'accessToken': accessToken, 
        }
        this.conf.set({ 'apiKeys': keys })
    }
    async clearKeys(){
        this.conf.delete('apiKeys')
    }
    async getToFollow(){
        let toFollow = this.conf.get('toFollow')
        if (!toFollow){
            throw new Error('There is no persons to follow')
        } else {
            return toFollow
        }
    }
    async storeToFollow(toFollow){
        this.conf.set({ 'toFollow': toFollow })
    }
    async clearAll(){
        this.conf.delete('apiKeys')
        this.conf.delete('toFollow')
    }
}

module.exports = CredentialManager