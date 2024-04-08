import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000
const API_URL = 'https://v2.jokeapi.dev/joke'

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))


app.get('/', async (req, res) => {
  try {
    const result = await axios.get(API_URL + '/Any?type=single')
    res.render('index.ejs', {
      joke: result.data.joke,
    })
  } catch (error) {
    console.log(error.response.data);
  }
})

app.post('/get-joke', async (req, res) => {
  try {
    let apiUrl = API_URL
    console.log(req.body)
    if (req.body.filter) {
      console.log(req.body.filter)
      apiUrl += `/${req.body.filter}`;
    } else {
      apiUrl += '/Any';
    }
    if (req.body.typeJoke) {
      apiUrl += `?type=single`
    }
    if (req.body.blocklist) {
      apiUrl += `&blacklistFlags=${req.body.blocklist}`;
    }
    if (req.body.word) {
       apiUrl += `&contains=${req.body.word}`;
    }
    const result = await axios.get(apiUrl);
    console.log(apiUrl)
    res.render('index.ejs', {
      joke: result.data.joke ? result.data.joke : result.data.causedBy,
    });
  } catch (error) {
    console.log(error.response ? error.response.data : error.message);
    res.render('index.ejs', {
      joke: 'No jokes were found, try it again.',
    });
  }
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
