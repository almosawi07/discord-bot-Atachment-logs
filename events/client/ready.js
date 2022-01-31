module.exports = client => {   
  let botStatus = [
    'Legends',
    'World',
    'Staff'
  ]
  setInterval(function() {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)]
    client.user.setActivity(status, {type: 'WATCHING'})
  }, 20000)  
    console.log(`Logged in as ${client.user.username}`);  
};