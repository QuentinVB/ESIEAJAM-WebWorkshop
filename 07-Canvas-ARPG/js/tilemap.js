"use strict";

import Character from "./character.js";
import Tileset from "./tileset.js";

export default class tilemap
{

    /**
     * 
     * @param {Tileset} tileset 
     * @param {*} mapData 
     */
    constructor(tileset,mapFileName)
    {
        this.tileset=tileset;
        fetch('http://localhost:5500/data/'+mapFileName+'.txt')
            .then(response => response.text())
            .then((data) => {
                this.map = this.ParseData(data);
                //console.log(this.map);  
            })
    }
    
    Draw(ctx,xOffset,yOffset)
    {
        if(this.map && this.tileset)
        {
            //console.log(`draw`)
            for (let i = 0; i < this.map.length; i++) {
                const cell = this.map[i];
                //console.log(`draw ${cell.tileIdx}`);
                this.tileset.drawAt(
                    ctx,cell.tileIdx,
                    cell.u*this.tileset.cellWidth + xOffset,
                    cell.v*this.tileset.cellHeight + yOffset,
                    1);
            }
        }
        
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {{Number,Number}} charaMapCoordinates 
     * @param {Number} offsetX 
     * @param {Number} offsetY 
     */
    DrawCharacterCell(ctx,charaMapCoordinates,offsetX,offsetY)
    {
        
        const coordinates =this.GetMapTileCoordinatesFromMapLocalCoordinates(charaMapCoordinates.x,charaMapCoordinates.y);
        //console.log(`map tile position from character ${coordinates.u}:${coordinates.v}`);//good

        let x = coordinates.u;
        let y= coordinates.v;
        //console.log(`${coordinates.u}:${coordinates.v}`);

        ctx.fillStyle = "#FF000080";
        ctx.fillRect(
            offsetX + this.tileset.cellWidth * x, 
            offsetY + this.tileset.cellHeight *y , 
            this.tileset.cellWidth, 
            this.tileset.cellHeight 
            );
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Character} character 
     * @param {Number} offsetX 
     * @param {Number} offsetY 
     */
    DrawCellAround (ctx,character,offsetX,offsetY)
    {
        ctx.fillStyle = "#00909080";
        for (const tileidx of Object.values(character.mapTileAround)) {
            if(!isNaN(tileidx))
            {
                const isTilePassable = !this.tileset.collision.includes(this.map[tileidx]?.tileIdx);
                if(isTilePassable)
                {
                    const coordinate = this.GetTileMapCoordinateFromTileIdx(tileidx);
                    ctx.fillRect(
                        offsetX + coordinate.x, 
                        offsetY + coordinate.y , 
                        this.tileset.cellWidth, 
                        this.tileset.cellHeight 
                        );
                }
            }
            
        }
        
       
    }
    GetMapTileCoordinatesFromMapLocalCoordinates(x,y)
    {
        return {
            u: Math.floor(x / this.tileset.cellWidth),
            v: Math.floor(y / this.tileset.cellHeight)
        }
    }
    GetTileMapCoordinateFromTileIdx(idx)
    {
        return{
            x:this.tileset.cellWidth * this.uFromIdx(idx),
            y:this.tileset.cellHeight *this.vFromIdx(idx)
        }   
    }
    uFromIdx(idx) {
        return idx%this.mapWidth;
    }
    vFromIdx(idx) {
        return Math.floor(idx/this.mapWidth);
    }
    GetCellIdxFromMapTileCoordinates(u,v)
    {
        return u + this.mapWidth*v;
    }
    ParseData(mapData)
    {
        const array=[];
        const lines= mapData.split("\n");
        this.mapHeight = lines.length;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].split(",");
            this.mapWidth = line.length;
            for (let j = 0; j < line.length; j++) {
                const tileId=parseInt(line[j],10);
                array.push({
                    tileIdx:tileId,
                    u:j,
                    v:i,
                    isWalkable:()=>this.tileset.collision.includes(tileId)
                });
            }
        }
        //console.log(array);
        return array;
    }
}