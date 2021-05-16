/**
 * Simple implementatio of BFS on a 2d grid
 * @param {*} start_x 
 * @param {*} start_y 
 * @param {*} end_x 
 * @param {*} end_y 
 * @param {*} frequency_w 
 * @param {*} frequency_h 
 */
 async function BFS_Traversal(start_x, start_y, end_x, end_y, frequency_w, frequency_h){

    let curr_x = start_x, curr_y = start_y;

    /**
     * (-1,-1),(0,-1),(1,-1)
     * (-1, 0)        (1, 0)
     * (-1, 1),(0, 1),(1, 1)
     */
    let delta_x = [-1,0,1,-1,1,-1,0,1];

    let delta_y = [-1,-1,-1,0,0,1,1,1];

    let BFS_queue = [[curr_x, curr_y]];

    /**
     * Initialize 2d visited array to zeros 
     */

    for(var a = 0; a < frequency_h; a++){
        for(var b = 0; b < frequency_w; b++){
            document.getElementById(b + ',' + a).setAttribute("visited", "false");
        }
    }

    while(BFS_queue.length > 0){

        let curr_path = BFS_queue.splice(0, 1);

        curr_x = curr_path[0][0], curr_y = curr_path[0][1]

        console.log("Implementing")
        console.log("yes")

        let curr_tile = document.getElementById(curr_x + ',' + curr_y)

        if(curr_x != start_x || curr_y != start_y){
        
            curr_tile.style.background = "cyan"

        }

        if(curr_x == end_x && curr_y == end_y){

            break;

        }

        for(var a = 0; a < 8; a++){

            if(curr_x + delta_x[a] < 0 || curr_x + delta_x[a] >= frequency_w){
                continue;
            }

            else if(curr_y + delta_y[a] < 0 || curr_y + delta_y[a] >= frequency_h){
                continue;
            }

            /**
             * (-1,-1),(0,-1),(1,-1)
             * (-1, 0)        (1, 0)
             * (-1, 1),(0, 1),(1, 1)
             */

            let neighbor = document.getElementById((curr_x + delta_x[a]) + ',' + (curr_y + delta_y[a]))

            if(neighbor.getAttribute("visited") == "false" && neighbor.getAttribute("type") != "wall"){

                await wait(10);

                BFS_queue.push([curr_x + delta_x[a], curr_y + delta_y[a]]);

                neighbor.setAttribute("visited", "true");

                neighbor.setAttribute("prevx", curr_x);

                neighbor.setAttribute("prevy", curr_y);

            }

        }

    }

    while(curr_x != start_x || curr_y != start_y){

        let curr_tile = document.getElementById(curr_x + ',' + curr_y);
        
        if(curr_x != end_x || curr_y != end_y){
            curr_tile.style.background = "yellow"
        }
        curr_x = parseInt(curr_tile.getAttribute("prevx")), curr_y = parseInt(curr_tile.getAttribute("prevy"));

    }

}

async function wait(ms) {

    return new Promise(resolve => {

      setTimeout(resolve, ms);

    });

  }