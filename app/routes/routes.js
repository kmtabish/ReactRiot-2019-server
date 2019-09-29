module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const guessTheWord = require('../controllers/guessTheWord.controller.js');
    app.io.on('connection', (client) => {
        // client.on('subscribeToTimer', (interval) => {
        app.post('/quiz', (req, res)=>guessTheWord.Quiz.get(req, res, (data, id, groupId)=>{
           // client.broadcast.emit('timer', data[id].fullWord);
            client.broadcast.emit(groupId, data[id].fullWord);
            
            
        }));
          console.log('client is subscribing to timer with interval ');
      });
    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    // Create a new Note
    app.post('/addUser', guessTheWord.User.create);
    // app.post('/quiz', guessTheWord.Quiz.get);
    app.post('/groups', guessTheWord.Groups.get);


}