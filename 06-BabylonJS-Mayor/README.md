# 06-BabylonJS-Mayor

This second project with Babylon starts from the tutorial on the lib website, then showcase how to implement a very minimalist game with a feedback loop.

[DEMO](https://projects.les-planetes2kentin.fr/Mayor/index.html)

## Description

The player is a mayor of a small village and has gold. He views the 3D world trough an orbiting camera (third person). The village is composed of a small hill and empty plain. The player can spend his gold and build a house on the map. Foreach houses, the player earn gold every 3 seconds.

## Implementation

This game reuse de base of the babylon js tutorial. There is an orbiting camera, a terrain with hill based on heightmap, a skybox... I've created a teeny-tiny house with blender and painted the textures directly in it. Then i've converted it into .babylon format using the exporter plugin from blender and loaded it using the LoadAssetContainer. On click, I get the coordinate of clicked face (if any) and add an instance of the house. Of course, in the meantime, the gold is subtracted from the player purse (TANSTAAFL !)

The gold and house count is displayed trough the page DOM.

## Control

Hold left click to orbit, Wheel to zoom, right click to place a house (if you have enough gold !)

## Improvements

The resource loads could be better (for instance the resolution of the Diffuse texture of the 3D house is overkill). And of course, the gameplay can be slightly improved to create a sims-city like...
