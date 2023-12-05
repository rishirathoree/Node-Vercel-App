import express from 'express'
const app = express()


app.use('/',(req,res)=>{
    console.log('running')
    return res.send('sending ressssponddddd')
})

app.listen(8000,()=>{
    console.log('server running')
})