// Getting Discord.JS from the NPM packages
const Discord = require("discord.js")
// Defining our config which holds our prefix / token
const config = require("./json/config.json")

// Making our client / bot
// You can add {disableEveryone: true} if you don't want to bot able to ping 
const client = new Discord.Client()

// Making our ready event which shows when the bot is ready for use.
client.on('ready', () => {
	// Showing in our console the bot works
	console.log(`Ready!`)

	// Giving the bot a status
    client.user.setPresence({
        status: "idle",  // You can show online, idle, dnd
        game: {
            name: "Testing",  // The message shown
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });

 });

client.on('message', async (message) => {
	if(message.author.bot) return // If a message is send by a bot do: nothing
	if(!message.guild) return // If the bot is not in the guild do: nothing

	// Our first command using a prefix we made in config.json
	if(message.content === `${config.prefix}test`) {
		message.channel.send(`This is a prefix test command!`)
	}

	// Alternate command without the use of a prefix
	if(message.content === "Test2") {
		message.channel.send(`This is a prefix-less command`)
	}

	// Creating a command with an embed
	if(message.content === "Embed") {
		const newEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			// Top line of the embed
			.setTitle(`This is a title`)
			// Shows the title of the embed
			.setColor("BLUE")
			// Sets the color of the line that is shown next to the embed
			.setThumbnail(client.user.displayAvatarURL())
			// is the smaller image on the side of the embed
			.setImage(client.user.displayAvatarURL())
			// Big image of the embed is the lower image
			.setDescription(`This is the description of the embed`)
			// The description of the embed can hold to 2048 characters
			.addField(`Title of the Field`, `Content of the filed`)
			// First is the title then the content can hold to 1024 characters
			.setFooter(`This template is by: Serena K.#4900`, client.user.displayAvatarURL()) 
			// First is the content of the footer after the "," its the image shown can be a link if marked as such
			.setTimestamp()
			// Will show the time of the embed post (Is local)
		message.channel.send(newEmbed)
		// If you want a message + an embed you do
		// message.channel.send('message', {embed: newEmbed}) 
		// This will post the message then the embed after it
	}

})

// Defining our token so that the bot can make an connection to discord.
client.login(config.token)
