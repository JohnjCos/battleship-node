const mongoose =require('mongoose')
const chai = require('chai')
const {TESTBASE_URL} =require('./config')
const Battleship = require('./model')

const expect = chai.expect

describe('model tests',function(){
    
    before(function () {
        return mongoose.connect(TESTBASE_URL)
        .then(() => mongoose.connection.db.dropDatabase());
    });

    it('should return the correct players turn',function(){
        const game = new Battleship({
            gameName:'first',
            password:'1234',
            player1Shots:[],
            player2Shots:[]
        })

        expect(game.turn).to.equal('player1')
        game.player1Shots.push({x:1})
        expect(game.turn).to.equal('player2')
        game.player2Shots.push({x:2})
        expect(game.turn).to.equal('player1')
    })


})

