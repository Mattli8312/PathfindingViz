/**
 * This file contains all the utility functions used by maze.js and Algorithms.js
 */
const dx = [-2,0,2,0];
const dy = [0,2,0,-2];

/**Used to generate all edges for Kruskal's algorithm */
function GetEdges(){
   let result = [];
   for(let i = 1; i < 2 * height + 1; i+=2){
       for(let j = 1; j < 2 * width + 1; j+=2){
           if(i != 2 * height - 1)
               result.push([[i,j],[i+2,j]]);
           if(j != 2 * width - 1)
               result.push([[i,j],[i,j+2]]);
       }
   }
   return result;
}

/**Maze generator utility functions */

function validDivIndx(i,j){
   return i > -1 && j > -1 && i < 2*height+1 && j < 2*width+1;
}

function RenderEightWalls(i,j){
   let dx = [-1,0,1,1,1,0,-1,-1];
   let dy = [-1,-1,-1,0,1,1,1,0];
   for(let a = 0; a < 8; a++){
       $('#'+(i+dy[a])+'a'+(j+dx[a])).attr('type','wall');
   }
}

/**Used for finding the next adjacent element */
function HAK_helper(){
    for(let i = 1; i < 2*height+1; i+=2){
        for(let j = 1; j < 2*width+1; j+=2){
            if($('#'+i+'a'+j).attr('type') == 'tile'){
                return [i,j];
            }
        }
    }
    return [-1,-1];
}

/**Used for carving out the walls */
function Excavate(val,cx,cy){
    switch(val){
        case 0: $('#'+(cy)+'a'+(cx+1)).attr('type','visited'); break;
        case 2: $('#'+(cy)+'a'+(cx-1)).attr('type','visited'); break;
        case 1: $('#'+(cy-1)+'a'+(cx)).attr('type','visited'); break;
        case 3: $('#'+(cy+1)+'a'+(cx)).attr('type','visited'); break;
        default: break;
    }
}