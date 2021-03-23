"use strict";
import Cell from "./cell.js";

export default class Engine
{
    static Map=[];
    static HTMLTargets=[];
    static MarkedMine = 0;
    static AssignedMine = 0;
    static Mines = 12;
    static GridSize = 8;

    constructor(debugStorage)
    {
        //load html elements targets
        console.log("start loading");

        const targets =
        [
            "grid",
            "mineMarked",
            "mineLeft",
            "gameover",
            "victory",
        ];
        for (const name of targets) {
            Engine.HTMLTargets[name] = document.getElementById(name);
        }

        //build grid
        for (let i = 0; i < Engine.GridSize*Engine.GridSize; i++) {
            Engine.Map[i] = new Cell(i);          
        }

        //fill grid with bomb
        do {
            let rngIdx = Math.round(Math.random() * Engine.GridSize*Engine.GridSize);
            const choosenCell = Engine.Map[rngIdx]
            if( !choosenCell.hasBomb )
            {
                choosenCell.hasBomb = true;
                Engine.AssignedMine ++;
                //Debug : choosenCell.element.classList.add("bomb");
            }
        } while (Engine.AssignedMine < Engine.Mines);

        Engine.HTMLTargets["mineMarked"].innerText = Engine.MarkedMine;
        Engine.HTMLTargets["mineLeft"].innerText = Engine.Mines;
        Engine.HTMLTargets["gameover"].style.webkitAnimationPlayState = "paused";
       
        console.log("finished loading");
    }
    /**
     * Mark a cell as a possible mine
     * @param {Number} i the cell index
     */
    static MarkMine(i)
    {
        Engine.MarkedMine+= i;
        Engine.HTMLTargets["mineMarked"].innerText = Engine.MarkedMine;

        if(Engine.MarkedMine === Engine.AssignedMine)
        {
            let mineFound = Engine.Map.filter(cell=> cell.state ==="flagged" && cell.hasBomb);
            if(mineFound.length === Engine.AssignedMine)
            {
                Engine.HTMLTargets["victory"].style.visibility="visible";
            }
        }
    }  
}
