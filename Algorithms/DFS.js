/**
 * Simple implementatio of DFS on a 2d grid
 * @param {*} start_x 
 * @param {*} start_y 
 * @param {*} end_x 
 * @param {*} end_y 
 * @param {*} frequency_w 
 * @param {*} frequency_h 
 */
 async function DFS_Traversal(start_x, start_y, end_x, end_y, frequency_w, frequency_h){

    let curr_x = start_x, curr_y = start_y;

    /**
     * (-1,-1),(0,-1),(1,-1)
     * (-1, 0)        (1, 0)
     * (-1, 1),(0, 1),(1, 1)
     */
    let delta_x = [-1,1,1,-1,-1,1,0,-1];

    let delta_y = [-1,-1,1,1,1,0,-1,0];

    let DFS_Stack = [[curr_x, curr_y]];

    /**
     * Initialize 2d visited array to zeros 
     */

    for(var a = 0; a < frequency_h; a++){

        for(var b = 0; b < frequency_w; b++){

            let curr_tile = document.getElementById(b + ',' + a)

            curr_tile.setAttribute("visited", "false");

            if(curr_tile.getAttribute("type") == "space")

                curr_tile.style.background = "white"
        }
    }

    while(DFS_Stack.length > 0){

        let curr_path = DFS_Stack.pop()

        curr_x = curr_path[0], curr_y = curr_path[1]

        let curr_tile = document.getElementById(curr_x + ',' + curr_y)

        curr_tile.setAttribute("visited", "true")

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

                DFS_Stack.push([curr_x + delta_x[a], curr_y + delta_y[a]]);

                neighbor.setAttribute("prevx", curr_x);

                neighbor.setAttribute("prevy", curr_y);

            }

        }

    }

    let final_path = [];

    if(curr_x != end_x || curr_y != end_y)
        return;

    while(curr_x != start_x || curr_y != start_y){

        final_path.push([curr_x, curr_y]);

        let curr_tile = document.getElementById(curr_x + ',' + curr_y);

        curr_x = parseInt(curr_tile.getAttribute("prevx"));

        curr_y = parseInt(curr_tile.getAttribute("prevy"));
    }

    document.getElementById(end_x + ',' + end_y).style.background = "red"

    for(var a = final_path.length - 1; a > 0; a--){

        let curr_tile = document.getElementById(final_path[a][0] + ',' + final_path[a][1]);
        
        await wait(20);

        curr_tile.style.background = "purple"

    }

}

async function wait(ms) {

    return new Promise(resolve => {

      setTimeout(resolve, ms);

    });

  }