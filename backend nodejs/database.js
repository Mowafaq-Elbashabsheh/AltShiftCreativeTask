const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123",
    database: "AltShiftCreative"
});

module.exports = client;

/*
client.connect();


client.query(`SELECT * FROM public.users`, (err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    client.end();
});
*/