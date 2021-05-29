const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on('error', (e) => console.log(e));
mongoose.connection.once('open', () => console.log('Mongoose Connected'));
const dataSchema = mongoose.Schema({
    name : {
        type : String,
        default: "Anónimo",
    },
    date : Date,
});

const VisitorModel = mongoose.model('Visitor', dataSchema);

app.get('/', (request, response) => {
    

    const firstData = new VisitorModel({
        name : request.query.name,
        date : Date.now()
    });

    firstData.save((error) => {
        if (error){
            console.log(error);
            return
        }
        console.log('Document created');
    
        response.send("<h1>El visitante fue almacenado con éxito</h1>");
    });
        
});

app.listen(port, () => console.log(`Listening on port ${port}`));