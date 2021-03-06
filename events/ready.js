var Nf = new Intl.NumberFormat('en-US'),
	reload = require('require-reload'),
	_Logger = reload('../utils/Logger.js'),
	logger;

var reload = require('require-reload'),
	formatTime = reload('../utils/utils.js').formatTime,
	version = reload('../package.json').version
	
module.exports = function(bot, config, games, utils) {
	if (logger === undefined)
		logger = new _Logger(config.logTimestamp);
	//utils.checkForUpdates();
	bot.shards.forEach(shard => {
		let name = games[~~(Math.random() * games.length)];
		shard.editStatus(null, {name});
	});
	(function() {
		var c = 0;
		var timeout = setInterval(function() {
		//do thing
		let totalCommandUsage = commandsProcessed + cleverbotTimesUsed;		
        let embed = {
            color: 9083663,
            author: {
                name: 'Megu-bot Live Statistics'
            },
            fields: [
                {
                    name: `Uptime`,
                    value: `${formatTime(bot.uptime)}`,
					inline: true
                },{
					name: `Memory Usage`,
                    value: `${Math.round(process.memoryUsage().rss / 1024 / 1000)}MB`,
					inline: true
				},{
					name: `Version`,
                    value: `megu-bot ${version}`,
					inline: true
				},{
					name: `Shards`,
                    value: `${bot.shards.size}`,
					inline: true
				},{
					name: `Available to...`,
                    value: `${Nf.format(bot.guilds.size)} Guilds\n`
					+ `${Nf.format(Object.keys(bot.channelGuildMap).length)} Channels\n`
					+ `${Nf.format(bot.privateChannels.size)} Private Channels\n`
					+ `${Nf.format(bot.users.size)} Users\n`
					+ `(${Nf.format((bot.users.size / bot.guilds.size).toFixed(2))} Average Users/Guild)`,
					inline: true
				},{
					name: `Command Usage`,
                    value: `${Nf.format(commandsProcessed)} Commands\n`
					+ `${Nf.format(cleverbotTimesUsed)} Cleverbot\n`
					+ `${Nf.format(totalCommandUsage)} Total\n`
					+ `${Nf.format(bot.users.size)} Users\n`
					+ `${(totalCommandUsage / (bot.uptime / (1000 * 60))).toFixed(2)}/min Average`,
					inline: true
				}
            ]
        }
			bot.editMessage('215075455978569729', '264028864005668864',{embed: embed});	
		c++;
		}, 10000);
	})();
	logger.logWithHeader('READY', 'bgGreen', 'black', `S:${Nf.format(bot.guilds.size)} U:${Nf.format(bot.users.size)} AVG:${Nf.format((bot.users.size / bot.guilds.size).toFixed(2))}`);
}
