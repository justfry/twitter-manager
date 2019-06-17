const program = require('commander')
const pkg = require('../package.json')
const configure = require('../commands/configure')
const util = require('../lib/util')

program
    .version(pkg.version)

program
    .command('consumer')
    .description('Add a Twitter API keys')
    .action(() => {configure.consumer(pkg.name).catch(util.handelError)})
program
    .command('tofollow')
    .description('Add users you want to steal subscribers from (leave empty to default)')
    .action(()=>{configure.toFollow(pkg.name).catch(util.handleError)})
program
    .parse(process.argv)

if (!process.argv.slice(2).length){
    program.outputHelp()
}