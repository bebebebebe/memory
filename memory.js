
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function Board(numCardTypes) {
  this.numCards = 2 * numCardTypes;

  var values = [];
  for (var i = 0; i < numCardTypes; i++) {
    values.push(i);
    values.push(i);
  }
  values = shuffle(values);
  console.log(values);
  
  this.values = values;
    
  this.match = function(i,j) {
    if (values[i] === values[j]) {
      return true;
    } else {
      return false;
    }
  }
}

function Game(board) {
  var matchedCards = [];
  var cardId1 = -1;
  var cardId2 = -1;
  
  this.peek = function(cardId) {
    var remaining = $.inArray(cardId, matchedCards) === -1 ? true : false;

    if (remaining) {
      if (cardId1 === -1 && cardId2 === -1) {
        cardId1 = cardId;
      } else if (cardId2 === -1) {
        cardId2 = cardId;
        this.turn(cardId1, cardId2);
      } 
    }
  }

  this.turn = function(i, j) {
    if (board.match(i, j)) {
      console.log('match!');
      matchedCards.push(i);
      matchedCards.push(j);
    }
    if (matchedCards.length === board.numCards) {
      this.gameOver()
    }
    cardId1 = -1;
    cardId2 = -1;
  }


  this.gameOver = function() {
      console.log('game over');
  }


}

function CanvasBoard(board) {
  var cards = '';
  var numCols = Math.floor(Math.sqrt(board.numCards));
  function card(i) {
    return "<canvas id = " + i + " width='50' height='50' style='border:1px solid black' onclick='game.peek(" + i + ")'></canvas> ";
  }

  for (var i = 0, l = board.numCards; i < l; i++) {
    cards += card(i);
    if ((i+1)%numCols === 0) {
      cards += "<br>";
    }
  }
  $('#board').append(cards);
}



$( document ).ready(function() {
  b = new Board(2);
  c = new CanvasBoard(b);
  game = new Game(b);
});





//   this.makeBoard = function() {
    
//     var numCols = Math.floor(Math.sqrt(n));
//     console.log(numCols);
    
//     var board = "";

//     function boardValues() {
//       var values = [];
//       for (var i = 0; i < n; i++) {
//         values.push(i);
//         values.push(i);
//       }
//       values = shuffle(values);
//       console.log(values);
//       return values;
//      }
    
//     function tile(i) {
//       return "<canvas id = " + i + " width='50' height='50' style='border:1px solid black' onclick='cellClicked(" + i + ")'></canvas> ";
//     }
    
//     for (var i = 0; i < n; i++) {
//       board += tile(i);
//       if ((i+1)%numCols === 0) {
//         board += "<br>";
//       }
//     }
        
//     $('#board').append(board);
//   }



// var images = {
//   0: 'red', 
//   1: 'blue', 
//   2: 'green', 
//   3: 'pink', 
//   4: 'orange', 
//   5: 'yellow', 
//   6: 'purple', 
//   7: 'gray'
// };

// var turn = 1;
// var prev;

// function cellClicked(i) {
  
//   var table = boardValues();
  
//   function color() {
//     var value = table[i];
//     console.log(images[value]);
//     return images[value];
//   }
  
//   console.log(i);
  
  
//   $('#'+i).css('background', color());
   
//   if (turn%2 === 1) {
//     prev = i;
//   } else {
//     if (board[i] === board[prev]) {
// //       win($('#'+ i));
//  //     win($('#' + prev));
//       win();
//     } else {
//       lose();
//       /* lose($('#'+ i));
//       lose($('#'+ prev)); */
//     }
//   } 
//   turn ++;
// } 

// function win() {
//   console.log('match!');
// }

// function lose() {
//   console.log('nope');
// }

/* function win(obj) {
  var timeoutID = window.setTimeout(function(){
  obj.css('background', 'white');
    obj.css('border', 'none');}, 1500);
}

function lose(obj) {
  var timeoutID = window.setTimeout(function(){
  obj.css('background', 'white');
    }, 1500);
} */

