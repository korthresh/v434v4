const { Discord, Client } = require('discord.js');
const fs = require('fs');
const data = fs.readFileSync('./tokens.txt', { encoding: 'utf-8' });


Array.prototype.clear = function() {
    let newArray = [];
    for (let i of this) {
		if (!newArray.includes(i) && i.length > 0) newArray.push(i);
    }
    return newArray;
}

function convertArray(tokens) {
	let converted = tokens.split(/\n/).map(x => x.trim().replace("\r", ""));
	return converted.clear()
}

const tokens = convertArray(data);

for (var i = 0; i < tokens.length; i++) {
  const client = new Client();
  client.login(tokens[i]).then(x => console.log(`${client.user.tag} logged in.`)).catch(err => console.error(err));
  setTimeout(() => {
	client.on('ready', () => {
		client.destroy()
	})
  }, i*500)
};
