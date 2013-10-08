
function shuffle(o){ // from http://jsfromhell.com/array/shuffle
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

  var canvas = new CanvasBoard(board);
  function canvasCard(cardId) {
    return canvas.cards[cardId];
  }

  var matchedCards = [];
  var cardId1 = -1;
  var cardId2 = -1;
  
  this.peek = function(cardId) {
    var remaining = $.inArray(cardId, matchedCards) === -1 ? true : false;

    if (remaining) {
      if (cardId1 === -1 && cardId2 === -1) {
        cardId1 = cardId;
        show(cardId1);
      } else if (cardId2 === -1 && cardId !== cardId1) {
        cardId2 = cardId;
        show(cardId2);
        turn(cardId1, cardId2);
      } 
    }
  }

  turn = function(i, j) {
    if (board.match(i, j)) {
      matchedCards.push(i);
      matchedCards.push(j);
      var setTimeout = window.setTimeout(function() {
        removal(i);
        removal(j);
      }, 500);
    } else {
      var setTimeout = window.setTimeout(function() {
        conceal(i);
        conceal(j);
      }, 500);

    }
    if (matchedCards.length === board.numCards) {
      gameOver();
    }
    cardId1 = -1;
    cardId2 = -1;
    
  }

  show = function(id) {
    canvasCard(id).frontColor();
  }

  conceal = function(id) {
    canvasCard(id).backColor();
  }

  removal = function(id) {
    canvasCard(id).pageColor();
  }

  gameOver = function() {
    console.log('game over');
  }
  
}

function CanvasBoard(board) {
  
  var cards = [];

  for (var i = 0, l = board.numCards; i < l; i++) {
    card = new Card(i, board);
    cards.push(card);
    document.getElementById('board').appendChild(card.canvas);
  }

  this.cards = cards;
}

function Card(i, board) {
  this.id = i;

  var numCols = Math.floor(Math.sqrt(board.numCards));
  var usableWidth = 350 - 4*numCols //border adds 2px on each side
  var extraRow = Math.sqrt(board.numCards) === numCols ? 0 : 1;
  var cardLength = usableWidth/(numCols + extraRow);
  
  var canvas = document.createElement('canvas');
  canvas.id = i;
  canvas.className = 'card';
  canvas.height = canvas.width = cardLength;

  $(canvas).click(function(){
    game.peek(i);
 });

  this.canvas = canvas;

  this.frontColor = function() {
    var value = board.values[this.id];
    var color = Colors[value];
    $('#'+this.id).css('background', color);
  }

  this.backColor = function() {
    $('#'+this.id).css('background', 'gray');
  }

  this.pageColor = function() {
    $('#'+this.id).css('background', 'white');
  }

  var Colors = function() {
    return {
    0: 'red', 
    1: 'blue', 
    2: 'green', 
    3: 'pink', 
    4: 'orange', 
    5: 'yellow', 
    6: 'purple', 
    7: 'black'}
  }();

}

function play() {
  board = new Board(5);
  game = new Game(board);
}

function reset() {
  $('#board').empty();
  play();
}

