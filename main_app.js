const state = {
    DRAW_START: 1,
    DRAW_WALLS: 2,
    DRAW_WALL_BREAKS: 3,
    DRAW_END: 4,
    DONE_DRAW: 5
}
/**
 * frequency w and h control the amount of cells in the width and height direction
 * current state controls what we are updating cells to such as mutating them into walls, start, or end positions
 */
let frequency_w = 60, frequency_h = 23;

let current_state = state.DONE_DRAW;

const tile_width = innerWidth * 0.9 * 1/frequency_w;

const tile_height = innerHeight * 0.9 * 1/frequency_h

let body = document.getElementById('grid');

function initialize_grid(){

    let body = document.getElementById('grid');

    body.style.height = (tile_width+2) * frequency_h;

    body.style.width = (tile_width+2) * frequency_w;

    for(var i = 0; i < frequency_h; i++){

        for(var j = 0; j < frequency_w; j++){
        
        let tile = document.createElement("div")

        tile.style.width = tile_width;

        tile.style.height = tile_width;

        tile.style.border = "solid black 1px";

        tile.setAttribute("type", "space")

        tile.addEventListener('click', ()=>{

            if(current_state == state.DRAW_WALLS){

                current_state = state.DRAW_WALL_BREAKS
            
            }
            
            else if(current_state == state.DRAW_WALL_BREAKS){
    
                current_state = state.DRAW_WALLS
            
            }
        
            else if(current_state == state.DRAW_START){
    
                tile.style.background = "cyan"
    
                current_state = state.DRAW_WALL_BREAKS
    
            }
            else if(current_state == state.DRAW_END){

                tile.style.background = "orange"

                current_state = state.DONE_DRAW;

            }
        })

        tile.addEventListener('mouseover', ()=>{

            if(current_state == state.DRAW_WALLS){

                tile.style.background = "black"

            }

        })

        body.appendChild(tile);

        }
    }

}


initialize_grid();