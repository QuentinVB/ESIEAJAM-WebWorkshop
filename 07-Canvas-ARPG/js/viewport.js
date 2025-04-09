"use strict";

import Character from "./character.js";
import tilemap from "./tilemap.js";


export default class Viewport
{

    /**
     * 
     * @param {tilemap} map 
     * @param {Character} character 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(map,character,canvas)
    {
        this.map=map;
        this.character=character;
        this.canvas=canvas;
        this.mapOffsetX = 0;
        this.mapOffsetY = 0;

        this.onCharacterTileChange = new CustomEvent('characterTileChange',{
            detail : this.character.mapTileIdx,
            cancelable: true
        });

        /*
        this.canvas.addEventListener('characterTileChange', function (e) {
            console.log(e.detail);
        }, false);
*/
    }
    /**
     * 
     * @param {Object} mapKey 
     */
    Update(mapKey)
    {
        const footOffset=this.character.GetCharacterFootCenterOffset();
        const characterMapCoordinate = this.GetMapLocalCoordinatesFromAbsoluteCoordinates(this.character.absoluteX+footOffset.x,this.character.absoluteY+footOffset.y);
        const mapTile=this.map.GetMapTileCoordinatesFromMapLocalCoordinates(characterMapCoordinate.x,characterMapCoordinate.y);

        this.character.mapTileIdx= this.map.GetCellIdxFromMapTileCoordinates(mapTile.u,mapTile.v);
        this.character.UpdateTileAround(this.map.mapWidth,this.map.mapHeight);
        //console.log(`map tile position from character ${mapTile.u}:${mapTile.v}, idx is ${this.character.mapTileIdx}`);//good

        this.character.Update(mapKey);
        this.mapOffsetX = -this.character.localX;
        this.mapOffsetY = -this.character.localY;
        
        //this.onCharacterTileChange.detail=this.character.mapTileIdx;
        
        //this.character.mapTileIdx
        this.canvas.dispatchEvent(this.onCharacterTileChange);
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    Draw(ctx)
    {
        this.map.Draw(ctx,this.mapOffsetX,this.mapOffsetY);//todo : define range of map to draw, performances
        const footOffset=this.character.GetCharacterFootCenterOffset();
        const characterMapCoordinate = this.GetMapLocalCoordinatesFromAbsoluteCoordinates(this.character.absoluteX+footOffset.x,this.character.absoluteY+footOffset.y);
        //console.log(`character position from map upper left ${characterMapCoordinate.x}:${characterMapCoordinate.y}`);//good
        this.map.DrawCharacterCell(ctx,characterMapCoordinate,this.mapOffsetX,this.mapOffsetY);
        this.map.DrawCellAround(ctx,this.character,this.mapOffsetX,this.mapOffsetY);
        this.character.Draw(ctx);
    }
    GetMapLocalCoordinatesFromAbsoluteCoordinates(absoluteX=0,absoluteY=0)
    {
        return {
            x : -(this.mapOffsetX-absoluteX),
            y :-(this.mapOffsetY-absoluteY)
        }
    }
}