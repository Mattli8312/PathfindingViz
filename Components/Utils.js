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

/**Used for seeing if we can travel a certain direction */
function CanPass(xi,yi,xf,yf){
    if($('#'+yf+'a'+xf).attr('type') == 'passed') 
        return false;
    else if($('#'+yf+'a'+xf).attr('type') == 'wall')
        return false;
    return true;
}

/**Used for Backtracking */
async function Backtrack(cx,cy){
    let curr_node = $('#'+cy+'a'+cx)
    let path = [];
    while(curr_node.attr('prev') != 'start'){
        path.push(curr_node);
        curr_node = $('#'+curr_node.attr('prev'));
    }
    path.push(curr_node);
    path.reverse();
    for(const p of path){
        p.attr('type','solved');
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

/**Used by all pathfinding algorithms to reset the previous path (if any) */
function ResetPath(){
    $('[type=solved]').attr('type','tile');
    $('[type=passed]').attr('type','tile');
    console.log($('[type=solved]').length);
    console.log("reached")
}


/**Used for AStar heuristic */
function RoundedDistance(xi,yi,xf,yf){
    return Math.round(Math.sqrt(Math.pow(xi-xf,2)+Math.pow(yi-yf,2)));
}

/**Used for Greedy Best First Search */
function EuclideanDistance(xi,yi,xf,yf){
    return Math.sqrt(Math.pow(xi-xf,2)+Math.pow(yi-yf,2)).toFixed(1);
}

/**Auxillary Data structure used for Best first search and A* Pathfinding */
class PriorityQueue{
    constructor(heap = true){
        this.PQ = [];
        this.minheap = heap;
    }
    push(coords){
        this.PQ.push(coords);
        if(this.minheap) this.PQ.sort(function(a,b){return a.val - b.val});
        else this.PQ.sort(function(a,b){return b.val - a.val});
    }
    pop(){
        return this.PQ.length ? this.PQ.splice(0,1)[0] : {val:-1};
    }
    empty(){
        return !this.PQ.length;
    }
}

const test = new PriorityQueue(false);
test.push({val:20});
console.log(test.PQ);

//For testing purposes;
module.exports = PriorityQueue;