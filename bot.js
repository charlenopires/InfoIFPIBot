/** tem como toda vez que alguem postaar um link o bot perguntar para qual categoria ele associa o link.
Tipo: cursos / palestras / offtopic / assuntos internos */

//TODO: CRUD de Categoria
//TODO: Criar sessões para categorias
//TODO: Reply com possíveis categorias
//TODO: Guardar links com categoria no Firebase
//TODO: Subir para Heroku como cron

const {Telegraf, Markup} = require('telegraf')
const urlValida = require('valid-url') 
const bot = new Telegraf('1543897523:AAEh7haKaRAcy1ofLrzCjmJzfIMtk1fvJHM', {username: 'infoifpibot'})

let msg

bot.use(Telegraf.log())

bot.start(async ctx => {
    await ctx.reply(`Seja bem vind@, ${ctx.from.first_name}!`)
})

bot.on('message', (ctx, next) => {
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

function comandoMsg(cmd, msg){
    bot.command('cmd', ctx => ctx.reply(msg))
    bot.hears(`/${cmd}`, ctx => ctx.reply(msg))
}

bot.telegram.setMyCommands([
    {command: 'categorias', description: 'Adiciona/Apaga/Lista categorias'},
    {command: 'preencherqacademico', description: 'Preenche o QAcademico'},
    {command: 'help', description: 'Não ajuda em nada'}
])

// /categorias

const botoesCat = Markup.inlineKeyboard([
        Markup.button.callback('Adicionar', 'addcat'),
        Markup.button.callback('Listar', 'listcat'),
        Markup.button.callback('Apagar', 'delcat')
    ], {columns: 3})

bot.command('categorias', async ctx => {
    await ctx.replyWithMarkdown('Escolha uma ação para categoria:', botoesCat)
})

bot.action('addcat', ctx => {
    ctx.reply('Categoria adicionada!')
})

bot.action('listcat', ctx => {
    ctx.reply('Categoria listada!')
})

bot.action('delcat', ctx => {
    ctx.reply('Categoria apagada!')
})

// /help
comandoMsg('help','Rum! Tu é professor do IFPI === Samurai dos bits supremo das galáxias, oráculo sabedor de todo o conhecimento universal da Computação Global. Porque tá pedindo ajuda pra um botizim?')

// /preencherqacademico
comandoMsg('preencherqacademico', 'Vou já já')

// inicializa
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))