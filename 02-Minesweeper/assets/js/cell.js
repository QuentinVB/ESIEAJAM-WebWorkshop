"use strict";
import Engine from "./engine.js";

export default class Cell
{
    constructor(idx)
    {
        //generate cell div
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        this.element = cellElement;

        //coordinate
        this.y= Math.floor(idx / Engine.GridSize);
        this.x= (idx  % Engine.GridSize);

        //set state
        this.state = "hidden";
        cellElement.classList.add("hidden");

        //on click
        this.element.onmousedown = (e)=>
        {
            e.preventDefault();
            console.log(`Clicked at cell n°${idx} (${this.x}:${this.y}), there is ${this.hasBomb?'a':'no'} bomb on this cell. State is ${this.state}`);
            if(e.button === 0)
            {
                let bomb = this.LocateAround(idx);
                //IF bomb found on the cell itself, then you are dead
                if(bomb>0)
                {
                    Engine.HTMLTargets["gameover"].style.visibility="visible";
                    Engine.HTMLTargets["gameover"].style.webkitAnimationPlayState = "running";
                    throw "game over";
                }
            }
            else if(e.button === 2)
            {
                if(this.state ==="flagged")
                {
                    cellElement.classList.remove("flag");
                    this.state ="hidden";
                    Engine.MarkMine(-1);
                }
                else
                {
                    cellElement.classList.add("flag");
                    this.state ="flagged";
                    Engine.MarkMine(1);
                }
            }
        };
        
        //append to grid
        Engine.HTMLTargets["grid"].appendChild(cellElement);
    }
    /**
     * Locate the bomb around a cell
     * @param {Number} i index of cell
     * @returns number of bomb around, return 1 if it was a bomb !
     */
    LocateAround(i)
    {
        const currentCell = Engine.Map[i];
        //allow to avoid the "out of range" tests : if the index is out of range : currentCell is undefined, so its falsy
        if(currentCell)
        {
            //Bomb found, return the count
            if(currentCell.state == "hidden" && currentCell.hasBomb)
            {
                return 1;
            }
            //no bomb so we check around
            if(currentCell.state == "hidden")
            {
                //the cell is now revealed
                currentCell.element.classList.remove("hidden");
                currentCell.state="revealed";
                currentCell.element.classList.add("revealed");
    
                //First phase : we check around for bomb:
                let totalBomb =0;
                //top : i = if i >= Engine.GridSize : i-gridSize
                let topIdx = i-Engine.GridSize;
                totalBomb+= Engine.Map[topIdx]?.hasBomb?1:0;

                //bottom : i = if i+Engine.GridSize < Engine.GridSize*Engine.GridSize : i + gridSize
                let bottomIdx = i+Engine.GridSize;
                totalBomb+= Engine.Map[bottomIdx]?.hasBomb?1:0;

                //left : if i%Engine.GridSize > 0  : i = i-1
                let leftIdx ;
                let topLeftIdx;
                let bottomLeftIdx ;
                //if we are on the first column, no need to check left
                if(currentCell.x > 0)
                {
                    leftIdx = i-1;
                    totalBomb+= Engine.Map[leftIdx]?.hasBomb?1:0;
    
                    topLeftIdx = i-Engine.GridSize-1;
                    totalBomb+= Engine.Map[topLeftIdx]?.hasBomb?1:0;
    
                    bottomLeftIdx = i+Engine.GridSize-1;
                    totalBomb+= Engine.Map[bottomLeftIdx]?.hasBomb?1:0;
                }
                
                //right if i%Engine.GridSize < Engine.GridSize :i = i+1
                let rightIdx ;
                let topRightIdx ;
                let bottomRightIdx;
                //if we are on the last column, no need to check right
                if(currentCell.x < Engine.GridSize-1)
                {
                    rightIdx = i+1;
                    totalBomb+= Engine.Map[rightIdx]?.hasBomb?1:0;
    
                    topRightIdx = i-Engine.GridSize+1;
                    totalBomb+= Engine.Map[topRightIdx]?.hasBomb?1:0;
    
    
                bottomRightIdx = i+Engine.GridSize+1;
                    totalBomb+= Engine.Map[bottomRightIdx]?.hasBomb?1:0;
                }

                //second phase : outcome
                //if bomb, we mark the count in the cell
                if(totalBomb>0)
                {
                    currentCell.element.innerText=totalBomb;
                }
                //else, we recursively search around the 8 cell around this one
                else
                {
                    this.LocateAround(topIdx);
                    this.LocateAround(bottomIdx);
                    if(currentCell.x>0)
                    {
                        this.LocateAround(leftIdx);
                        this.LocateAround(topLeftIdx);
                        this.LocateAround(bottomLeftIdx);
                    }
                    if(currentCell.x < Engine.GridSize-1)
                    {
                        this.LocateAround(rightIdx);
                        this.LocateAround(topRightIdx);
                        this.LocateAround(bottomRightIdx);
                    }
                }
            }  
        }
    }
}
