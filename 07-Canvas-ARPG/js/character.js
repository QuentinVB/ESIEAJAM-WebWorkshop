"use strict";

import Tileset from "./tileset.js";

export default class Character
{
    
    /**
     * 
     * @param {Tileset} tileset 
     */
    constructor(tileset,name)
    {
        this.tileset=tileset;
        this.animations = this.ParseAnimations(tileset);
        this.name=name;
        //movement
        this.localX = 0;
        this.localY = 0;
        this.SPEED= 4;
        //animation
        this.animationIdx = 0;
        this.frame= 0;
        this.isPlayingAnimation = false;
        //collision & actions
        this.mapTileIdx = 0;
        this.mapTileAround={top:0,right:0,bottom:0,left:0};
    }
    PlayAnimation(animationIdx)
    {
        //animationIdx should be lower than animations
        this.animationIdx = animationIdx * this.tileset.uCount;
        this.isPlayingAnimation = true;
    }
    StopAnimation()
    {
        this.isPlayingAnimation=false;
        this.frame=0;
        //this.animationIdx = 0;
    }    
    Update(mapKey)
    {
        //TODO move cooldown/animation framerate
        //ArrowUp
        if (mapKey[38]) {
            this.localY-=1*this.SPEED;
            this.PlayAnimation(3);
        }
        //ArrowDown
        if (mapKey[40]) {
            this.localY+=1*this.SPEED;
            this.PlayAnimation(0);
        }
        //ArrowLeft
        if (mapKey[37]) {
            this.localX-=1*this.SPEED;
            this.PlayAnimation(2);
        }
        //ArrowRight
        if (mapKey[39]) {
            this.localX+=1*this.SPEED;
            this.PlayAnimation(1);
        }
        if(Object.values(mapKey).every(v => v === false))
        {
            this.StopAnimation();
        }
        //console.log(`character position from character start ${this.localX}:${this.localY}`);//good
    }
    GetCharacterFootCenterOffset()
    {
        return{
            x: this.tileset.cellWidth/2,
            y: this.tileset.cellHeight*(2/3)
        }
    }
    UpdateTileAround(mapWidth,mapHeight)
    {  
        this.mapTileAround.top=this.mapTileIdx-mapWidth,
        this.mapTileAround.right=this.mapTileIdx+1,//todo solve loop
        this.mapTileAround.bottom=this.mapTileIdx+mapWidth,
        this.mapTileAround.left=this.mapTileIdx-1//todo solve loop
        //console.log(this.mapTileAround);
    }
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    Draw(ctx)
    {
        if(this.isPlayingAnimation)this.frame++;
        if(this.frame >= this.tileset.uCount) this.frame =0;

        if(this.animations && this.tileset)
        {
            this.absoluteX = (ctx.canvas.width/2)-(this.tileset.cellWidth/2);
            this.absoluteY = (ctx.canvas.height/2)-(this.tileset.cellHeight/2);
            this.tileset.drawAt(
                ctx,
                this.animationIdx + this.frame,
                this.absoluteX,
                this.absoluteY 
            );
        }
    }
    get width()
    {
        return this.tileset.cellWidth;
    }
    get height()
    {
        return this.tileset.cellHeight;
    }
    /**
     * 
     * @param {Tileset} tileset 
     */
    ParseAnimations(tileset)
    {
        return tileset.vCount;
    }
    //play animation : convert idx to row/column according to the requested animation
}