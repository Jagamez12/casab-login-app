const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')


// configuracion de los tokens para validar correos

const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, 'SECRET', { expiresIn: '2h'})
}

const getDataToken = (token) => {
    let data = null
    jwt.verify(token, 'SECRET', (err, decode)=>{
        if(err){
            console.log('error al obtener data')
        }else{
            data = decode
        }
    })
    return data;
}

const mail = {
    email: 'nonreplyblockchain@gmail.com',
    password: 'q1w2e3r4t1010'
}

let transporter = nodemailer.createTransport({
    host: 'mail.gmail.com',
    port: 2525,
    secure: false,
    auth: {
        user: mail.email,
        pass: mail.password
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail = async(email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `BlockChainAPP <${ mail.email }>`,
            to: email,
            subject,
            text: 'No responder a este email',
            html
        })
    } catch (error) {
        console.log('algo malo ocurrio mrk')
    }
}

const getTemplateCorreo = (name, token) => {
    return `
    <div class="email-content">
    <h2>Hi ${ name }</h2>
    <p>Para confirmar tu cuenta, has click en el siguiente texto</p>
    <a href="http://localhost:3000/api/user/confirm/${ token }">Confirmar cuenta</a>
</div>
    `
}
const getTemplateCode = (name, code) =>{
    return `
    <div class="email-content">
    <h2>Hi ${ name }</h2>
    <p>Este es tu codigo de inicio de sesion, no olvides que expira en 2minutos</p>
    <h1> ${code}</h1>
</div>
    `
}
module.exports = {
    sendEmail,
    getTemplateCorreo,
    getTemplateCode,
    getDataToken,
    getToken
}