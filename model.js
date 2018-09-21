const mongoose = require('mongoose')

const BattleshipSchema = mongoose.Schema({
    gameName:{type:String, require:true,unique:true},
    password:{type:String,require:true},
    player1Ships:{type:Array},
    player1Shots:{type:Array},
    player2Ships:{type:Array},
    player2Shots:{type:Array}
},{toObject:{virtuals:true},toJSON:{virtuals:true}})



BattleshipSchema.virtual('turn').get(function(){
    if(this.player1Shots.length === this.player2Shots.length){
        return 'player1'
    }else{
        return 'player2'
    }
})

BattleshipSchema.virtual('checkHit').get(function(coordinate, player){
    if(player === 'player1'){
        const check2 = this.player2ships.map(ship =>ship.some(square =>square.x===coordinate.x && square.y===coordinate.y))
        if(check2.includes(true)===true){
            return 'hit'
        }else{
            return 'miss'
        }
    }
    else if(player === 'player2'){
        const check1 = this.player1ships.map(ship =>ship.some(square =>square.x===coordinate.x && square.y===coordinate.y))
        if(check1.includes(true)===true){
            return 'hit'
        }else{
            return 'miss'
        }
    }
})


module.exports = mongoose.model('Battleship',BattleshipSchema);
