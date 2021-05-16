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

const tile_height = innerHeight * 0.8 * 1/frequency_h

/**
 * body stores reference to grid element
 * start positions and end positions
 */

let body = document.getElementById('grid');

let start_x = start_y = end_x = end_y = -1;

function initialize_grid(){

    let body = document.getElementById('grid');

    body.style.height = (tile_width+2) * frequency_h;

    body.style.width = (tile_width+2) * frequency_w;

    for(var i = 0; i < frequency_h; i++){

        for(var j = 0; j < frequency_w; j++){
        
        let tile = document.createElement("div")

        tile.style.width = tile_width;

        tile.style.height = tile_height;

        tile.style.border = "solid black 1px";

        tile.setAttribute("type", "space")

        tile.setAttribute("id", j + ',' + i);

        tile.setAttribute("x", j); tile.setAttribute("y", i);

        tile.addEventListener('click', ()=>{

            if(current_state == state.DRAW_WALLS){

                current_state = state.DRAW_WALL_BREAKS

                tile.setAttribute("type", "wall")
            
            }
            
            else if(current_state == state.DRAW_WALL_BREAKS){
    
                current_state = state.DRAW_WALLS
            
            }
        
            else if(current_state == state.DRAW_START){

                if(start_x != -1 && start_y != -1){

                    let prev_end = document.getElementById(start_x + ',' + start_y);

                    prev_end.style.background = "white";

                    prev_end.setAttribute("type", "space");
                }
    
                tile.style.background = "rgb(0,255,127)"

                tile.setAttribute("type", "start")

                start_x = parseInt(tile.getAttribute("x")); start_y = parseInt(tile.getAttribute("y"));
    
                current_state = state.DRAW_WALL_BREAKS
    
            }
            else if(current_state == state.DRAW_END){

                if(end_x != -1 && end_y != -1){

                    let prev_end = document.getElementById(end_x + ',' + end_y);

                    prev_end.style.background = "white";

                    prev_end.setAttribute("type", "space");
                }

                tile.style.background = "red"
                
                end_x = parseInt(tile.getAttribute("x")); end_y = parseInt(tile.getAttribute("y"));

                tile.setAttribute("type", "end")

                current_state = state.DONE_DRAW;

            }
        })

        tile.addEventListener('mouseover', ()=>{

            if(current_state == state.DRAW_WALLS){

                tile.style.background = "black"

                tile.setAttribute("type", "wall")

            }

        })

        body.appendChild(tile);

        }
    }

}


initialize_grid();