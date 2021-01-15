/** tem como toda vez que alguem postaar um link o bot perguntar para qual categoria ele associa o link.
Tipo: cursos / palestras / offtopic / assuntos internos */

//TODO: Montar Firebase
//TODO: CRUD de Categoria
//TODO: Analisar se msgs são links e reply com possíveis categorias
//TODO: Guardar links com categoria no Firebase
//TODO: Subir para Heroku como cron

const { Telegraf } = require('telegraf')
const urlValida = require('valid-url') 
const bot = new Telegraf('1543897523:AAEh7haKaRAcy1ofLrzCjmJzfIMtk1fvJHM', {username: 'infoifpibot'})

bot.use(Telegraf.log())
bot.on('message', (ctx, next) => {
    let msg
    if(ctx){
        if(ctx.message) {
            if(
                urlValida.isHttpUri(ctx.message.text) ||
                urlValida.isHttpsUri(ctx.message.text) ||
                urlValida.isUri(ctx.message.text) ||
                urlValida.isWebUri(ctx.message.text)
            ) {
                msg = 'eh url'
            }else{
                msg = 'nao eh url'
            }
            console.log(`${ctx.message.text} ${msg}`)
        }
    }
    next()
})
bot.help((ctx) => ctx.reply('Rum! Tu é professor do IFPI === Samurai dos bits supremo das galáxias, oráculo sabedor de todo o conhecimento universal da Computação Global. Porque tá pedindo ajuda pra um botizim?'))
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))