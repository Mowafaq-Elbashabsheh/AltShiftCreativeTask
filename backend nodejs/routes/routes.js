const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const client = require('../database');
const userClass = require('../models/user');



router.post('/register', async(req,res) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.rpassword,salt);

        const user = new userClass(req.body.remail,hashedPassword);

        const result = user;

        const {rpassword, ...data} = result;
        

        client.query(`INSERT INTO public.users (email, password) VALUES($1, $2) `,[result.remail,result.rpassword], (err,rec)=>{
            if(!err){
                console.log(rec.rows);
                res.send(data);
            }else{
                console.log(err);
                res.status(500).send(err);
            }
        });
        
    }catch (error) {
        console.error(error);
        res.status(500).send(error);

    }
    
});

router.post('/login', async(req,res) => {
    try{
        client.query(`SELECT password FROM public.users WHERE email = $1`,[req.body.email],async(err,rec) => {
            if(rec.rowCount!=0){
                console.log(rec.rows);

                if(await bcrypt.compare(req.body.password, rec.rows[0].password))
                    {
                        const token = jwt.sign({_email: req.body.email}, 'secret');
                        res.cookie('jwt', token, {
                            httpOnly:true,
                            maxAge: 24*60*60*1000
                        })
                        res.send({
                            messege: 'success'
                        });
                    }
                    else{
                        return res.status(404).send({
                            meesage: 'incorrect password'
                        });
                    }
            }else{
                res.send('incorrect email');
            }

        });
    }catch(error){
        res.send(error.messege);
    }    
    
});

router.get('/user', (req,res) => {
    try{
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, 'secret');

        if(!claims){
            return res.status(401).send({
                messege: 'unauthenticated'
            });
        }
    
        client.query(`SELECT * FROM public.users WHERE email = $1`,[claims._email], (err,rec) => {
            if(!err){
                const user = rec.rows;
                const {password, ...data} = user[0];

                res.send(data);
            }else{
                console.log(err);
            }
        });
    }catch(error){
        return res.status(401).send({
            messege: 'unauthenticated'
        });
    }

});

router.post('/logout', (req,res) => {
    res.cookie('jwt', '',{maxAge:0});
    res.send({
        messege: 'success rm cookie'
    });
});

router.get('/show', (req,res) => {
    try{
        client.query('SELECT * FROM public.solutions', (err,rec) => {
            console.log(rec.rows);
            res.send(rec.rows);
        });
    }catch(err){
        res.send(err);
    }
});

router.post('/add-solution', (req,res) => {
    client.query(`INSERT INTO public.solutions (status, solution_name, solution_type, solution_id, devices_no, city, description, created_by, version, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) `,[req.body.status, req.body.solution_name, req.body.solution_type, req.body.solution_id, req.body.devices_no, req.body.city, req.body.description, req.body.created_by, req.body.version, req.body.created_on], (err,rec)=>{
        if(!err){
            res.send({messege:'done'});
        }else{
            res.send(err);
        }
    });
});

router.post('/search', (req,res) => {
    client.query(`SELECT * FROM public.solutions WHERE solution_name LIKE $1 OR status LIKE $1 OR solution_type LIKE $1 OR solution_id LIKE $1 OR city LIKE $1 OR description LIKE $1 OR created_by LIKE $1 OR version LIKE $1`, [`%${req.body.search}%`], (err,rec) => {
        if(!err){
            res.send(rec.rows);
        }else{
            res.send(err);
        }
    });
});


module.exports = router;

/*
client.query(`SELECT * FROM public.users WHERE email = '$1'`, [req.body.email]).then(() => {
    console.log("ok")
})
.catch(error => {
    console.log(error)
});
*/