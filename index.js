const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
    bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Error, unable to find commands list.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} Has loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready to go!`);

    bot.user.setActivity(`.help on ${bot.guilds.size} servers!` , {type: "PLAYING"});


});

bot.on("message", async message => {
    // If message's author is the bot return
    if(message.author.bot) return;








    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    // Organizer(TSC)
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});

bot.login(config.token);
