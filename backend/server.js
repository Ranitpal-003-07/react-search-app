const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Question = require('./models/Question');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb+srv://ranitpal699:Rp2003%40%26@cluster0.wv3ut.mongodb.net/SpeakX?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


app.get('/api/questions', async (req, res) => {
  console.log('Fetching all questions...');
  try {
    const questions = await Question.find();
    console.log(`Fetched ${questions.length} questions`);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});


app.get('/api/search', async (req, res) => {
  const { query, page = 1, pageSize = 10 } = req.query;
  
  console.log(`Search Query: ${query}, Page: ${page}, Page Size: ${pageSize}`);
  
  try {
    const regexQuery = new RegExp(query, 'i');
    console.log('Executing search with regex:', regexQuery);

    const questions = await Question.find({ title: regexQuery })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const totalCount = await Question.countDocuments({ title: regexQuery });

    console.log(`Fetched ${questions.length} questions out of ${totalCount} total matching questions`);

    res.json({
      questions,
      totalCount,
      page,
      pageSize
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
});


app.listen(5000, () => {
  console.log('Hola amigosss!!!');
});
