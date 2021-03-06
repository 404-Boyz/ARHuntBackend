
module.exports = (io) => {
  console.log('IN THE SOCKET LOGIC')
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has given up the hunt`)
    })
  })
}
