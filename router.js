const express = require('express')
const Battleship = require('./model')
const router = express.Router()


router.post('/',(req,res,next)=>{
    const {gameName,password} = req.body
    const newGame = {
        gameName,
        password,
        player1Ships:[],
        player1Shots:[],
        player2Ships:[],
        player2Shots:[]
    }

    Battleship.create(newGame)
    .then((result)=>{
        res.status(200).location(`/${req.originalUrl}/${gameName}`).json(result)
    })
})
router.put('/:gameName/:player',(req,res,next)=>{
    const gameName = req.params.gameName
    const player = req.params.player
    const updateBattleShip={}
    const updatedablefields = ['Ships','Shots']
    let updateField;
    let playerField;
    updatedablefields.forEach(field =>{
        if(field in req.body){
            playerField = player +field
            updateField = field
        }
    })

    Battleship.findOne({gameName})
    .then(result=>{
        updateBattleShip[playerField]= [...result[playerField],req.body[updateField]]
    })
        .then(()=>{
            Battleship.findOneAndUpdate(gameName,updateBattleShip,{new:true})
            .then(result =>{
                res.json(result)
            })
        })
        .catch(err => next(err))
})


module.exports= router