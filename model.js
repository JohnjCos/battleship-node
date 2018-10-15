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

BattleshipSchema.virtual('playtime').get(function(){
    if(this.player1Ships.length >0 && this.player2Ships.length >0 ){
        return 'play'
    }
    return null
})

BattleshipSchema.method('checkHit', function(coordinate, player){
    if(player === 'player1'){
        const check2 = this.player2Ships
            .map(ship =>ship
                    .some(square =>square.x===coordinate.x 
                            && square.y===coordinate.y
                    )
                )
        if(check2.includes(true)){
            return {hitOrMiss:'hit',coordinate}
        }else{
            return {hitOrMiss:'miss',coordinate}
        }
    } else if(player === 'player2'){
        const check1 = this.player1Ships
            .map(ship =>ship
                .some(square =>square.x===coordinate.x 
                    && square.y===coordinate.y
                )
            )
        if(check1.includes(true)){
            return {hitOrMiss:'hit',coordinate}
        }else{
            return {hitOrMiss:'miss',coordinate}
        }
    }
})

BattleshipSchema.method('checkWin',function(){

    const didPlayer1Win = this.player2Ships.every(player2Ship =>
        player2Ship.every(player2ShipSquare =>
            this.player1Shots.some(
                player1Shot => player2ShipSquare.x === player1Shot.x && player2ShipSquare.y === player1Shot.y
            )))
            const didPlayer2Win = this.player1Ships.every(player1Ship =>
                player1Ship.every(player1ShipSquare =>
                    this.player2Shots.some(
                        player2Shot => player1ShipSquare.x === player2Shot.x && player1ShipSquare.y === player2Shot.y
                    )))
    if(didPlayer1Win){
        return 'player1'
    }
    else if(didPlayer2Win){
        return 'player2'
    }
    return null
})


module.exports = mongoose.model('Battleship',BattleshipSchema);
