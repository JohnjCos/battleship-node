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


    it('should return hit if the coordinates are part of the ship array',function(){
        const game = new Battleship({
            gameName:'second',
            password:'4321',
            player1Ships:[[{x:1,y:1}]],
            player2Ships:[[{x:2,y:2},{x:2,y:3}],[{x:4,y:2},{x:4,y:3}]],
            player1Shots:[],
            player2Shots:[]

        })
        game.player1Shots.push({x:2,y:2})
        expect(game.checkHit({x:2,y:2},'player1')).to.equal('hit')
        game.player1Shots.push({x:5,y:2})
        expect(game.checkHit({x:5,y:2},'player1')).to.equal('miss')
        game.player2Shots.push({x:1,y:1})
        expect(game.checkHit({x:1,y:1},'player2')).to.equal('hit')
        expect(game.checkHit({x:1,y:2},'player2')).to.equal('miss')

    })
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
    it('should return the correct winning player', function(){
        const game = new Battleship({
            gameName:'second',
            password:'4321',
            player1Ships:[[{x:1,y:1}]],
            player2Ships:[[{x:2,y:2},{x:2,y:3}],[{x:4,y:2},{x:4,y:3}]],
            player1Shots:[],
            player2Shots:[]

        })
        expect(game.checkWin()).to.equal(null)
        game.player1Shots.push({x:2,y:2})
        expect(game.checkWin()).to.equal(null)
        game.player1Shots.push({x:2,y:3})
        expect(game.checkWin()).to.equal(null)
        game.player1Shots.push({x:4,y:2})
        expect(game.checkWin()).to.equal(null)
        game.player1Shots.push({x:4,y:3})
        expect(game.checkWin()).to.equal('player1')


    })
    it('should return play when both players have selected ships',function(){
        const game = new Battleship({
            gameName:'third',
            password:'1234',
            player1Ships:[],
            player2Ships:[]
        })

        expect(game.playtime).to.equal(null)
        game.player1Ships.push({x:1,y:2})
        expect(game.playtime).to.equal(null)
        game.player2Ships.push({x:1,y:2})
        expect(game.playtime).to.equal('play')
    })

})

