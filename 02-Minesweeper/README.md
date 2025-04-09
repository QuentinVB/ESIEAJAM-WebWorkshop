# 02-Minesweeper

A very simple minesweeper game with JS ES6 Module (IE not supported). It uses no images, only utf-8 emoji and pure css animation and style. A live Server is required to run the css/js associated with. If you don't, you'll run into a [CORS](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

[DEMO](https://projects.les-planetes2kentin.fr/Minesweeper/index.html)

## Description

The player can click on cells on a grid. If the cell has a bomb, it's gameover (shown in a nice and friendly way). Otherwise, the game check the 8 cells around.

If one or more cell hold a bomb, the number of discovered cell is marked on the clicked one. If no bomb has been discovered, the game reveal them and check cells around the 8 revealed cells.

The player can right click a cell to mark it with a flag. If he managed to deduce the position of the bomb and placed the flag accordingly, he wins.

## Control

Just simply open the index.html with a modern browser trough a live server. A recommend the LiveServer Extension from VisualStudioCode. Reload the page in case of victory or defeat.

## BUGs

There is still some bug with the recursive function.

## Tutorial

A step by step tutorial will be released soon on my website. (Statement : 03/23/21)