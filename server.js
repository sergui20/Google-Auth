const express = require('express');
const app = express();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('735206298178-5crsd0u2l8aa7423v5vugfrolb5uo4rv.apps.googleusercontent.com');

app.use(express.urlencoded({ extended: false }))

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send('index')
})

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '735206298178-5crsd0u2l8aa7423v5vugfrolb5uo4rv.apps.googleusercontent.com',  
    });
    const payload = ticket.getPayload();
    console.log('Payload', payload)

    const userid = payload['sub'];
    console.log('UserID ' + userid)

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture
    }
}

// BBBBB
app.post('/google', async (req, res) => {
    let tokenID = req.body.idtoken;

    let googleUser = await verify(tokenID)
        .catch( err => {
            console.log(err)
        });

    console.log(googleUser)    

})


app.listen(3000, () => {
    console.log('Server listening on port 3000');
})