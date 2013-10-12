Memory Card Game
================

Demo <a href='http://bebebebebe.herokuapp.com/memory'>here</a>.

JavaScript implementation of the classic memory card game.

You can choose how many cards to use, and the cards are dynamically resized to fit in the 350 by 350 pixel board. You can shuffle the cards and reset the board.

The cards are made with HTML5 Canvas.

In progress: currently card types are represented as colors, and only 9 colors are available. (So you can see the cards resize if you choose more than 9 card types, but you can't really play!)

TO DO:

* Increase possible number of card types.
  
  Instead of associating each card type with one color, associate it with two colors, and draw a circle of the second color in the center of each card.

* Generalize game by allowing n-tuples rather than pairs of each card type.
  
  For example, if you choose triples, when playing you select three cards each turn rather than two.