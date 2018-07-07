'use strict'

module.exports = function (
      app,
      io,
      tutorialspoint // Collection Name
) {
    // SET WATCH ON COLLECTION 
    const changeStream = tutorialspoint.watch();  

    // Socket Connection  
    io.on('connection', function (socket) {
        console.log('Connection!');

        // USERS - Change
        changeStream.on('change', function(change) {
            console.log('COLLECTION CHANGED');

            tutorialspoint.find({}, (err, data) => {
                if (err) throw err;
  
                if (data) {
                    // RESEND ALL USERS
                    socket.emit('users', data);
                }
            });
        });
    });
};