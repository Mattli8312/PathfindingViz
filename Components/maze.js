/**
 * This file contains all functions for rendering the maze using different approaches
 */


/** Maze Generation using Depth-First Search (iterative approach) */
async function GenerateMaze_DFS(){
    //InitializeAllWalls();
    ClearBoard();
    let x = Math.floor(Math.random() * width)*2+1;
    let y = Math.floor(Math.random() * height)*2+1;
    let stack = [];
    
    stack.push([y,x,-3]);
    while(stack.length > 0){
        /**Initialize current div to be visited and initialize all eight walls*/
        let curr = stack[stack.length-1];
        if($('#'+(curr[0])+'a'+(curr[1])).attr('type') != 'visited'){
            RenderEightWalls(curr[0],curr[1]);
        }
        $('#'+(curr[0])+'a'+(curr[1])).attr('type','visited');
        /**We need to carve out the walls */
        Excavate(curr[2],curr[1],curr[0]);
        let options = [];
        for(let i = 0; i < 4; i++){
            let curr_div = $('#'+(curr[0]+dy[i])+'a'+(curr[1]+dx[i]))
            if(validDivIndx(curr[0]+dy[i],curr[1]+dx[i]) && curr_div.attr('type') != 'visited'){
                options.push([curr[0]+dy[i],curr[1]+dx[i],i])
            }
        }
        if(!options.length) stack.pop();
        else{
            let indx = Math.floor(Math.random()*options.length);
            let next = options[indx];
            
            stack.push(next); 
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    $('[type=visited]').attr('type','tile');
}

/** Maze Generation using Prims minimum spanning tree algorithm */
async function GenerateMaze_Prims(){
    ClearBoard();
    let x = Math.floor(Math.random() * width)*2+1;
    let y = Math.floor(Math.random() * height)*2+1;
    let set = [[y,x]];
    while(set.length > 0){
        let indx = Math.floor(Math.random()*set.length)
        let curr = set[indx]; //pick random element in the set
        set.splice(indx,1);
        if($('#'+curr[0]+'a'+curr[1]).attr('type')!='visited'){
            RenderEightWalls(curr[0],curr[1]);
        }
        else{
            continue;
        }
        $('#'+curr[0]+'a'+curr[1]).attr('type','visited');
        //Carve out the walls
        switch(curr[2]){
            case 0: $('#'+(curr[0])+'a'+(curr[1]+1)).attr('type','visited'); break;
            case 2: $('#'+(curr[0])+'a'+(curr[1]-1)).attr('type','visited'); break;
            case 1: $('#'+(curr[0]-1)+'a'+(curr[1])).attr('type','visited'); break;
            default: $('#'+(curr[0]+1)+'a'+(curr[1])).attr('type','visited');break;
        }
        //analyze options
        for(let i = 0; i < 4; i++){
            let curr_div = $('#'+(curr[0]+dy[i])+'a'+(curr[1]+dx[i]))
            if(validDivIndx(curr[0]+dy[i],curr[1]+dx[i]) && curr_div.attr('type') != 'visited'){
                set.push([curr[0]+dy[i],curr[1]+dx[i],i]);
            }
        }
        //await new Promise(resolve => setTimeout(resolve, 10));
    }
    $('[type=visited]').attr('type','tile');
}

/** Maze Generation using Kruskals randomized tree algorithm */
async function GenerateMaze_Kruskals(){
    ClearBoard();
    let edges = GetEdges();
    while(edges.length > 0){
        let curr = edges.splice(Math.floor(Math.random()*edges.length), 1)[0];
        let div_1 = $('#'+curr[0][0]+'a'+curr[0][1]);
        let div_2 = $('#'+curr[1][0]+'a'+curr[1][1]);
        if(div_1.attr('type') != 'visited' || div_2.attr('type') != 'visited'){
            //Render the wall
            if(div_1.attr('type') != 'visited'){
                RenderEightWalls(curr[0][0],curr[0][1]);
                div_1.attr('set',div_1.attr('id'));
            } 
            if(div_2.attr('type') != 'visited'){
                RenderEightWalls(curr[1][0],curr[1][1]);
                div_2.attr('set',div_2.attr('id'));
            } 
            //Combine in same set
            $('[set=' + div_2.attr('set') + ']').attr('set', div_1.attr('set'));
            //Excavate the barrier between the two
            $('#'+((curr[0][0] + curr[1][0])/2) + 'a' + (curr[0][1] + curr[1][1])/2).attr('type','visited');
            div_1.attr('type','visited');
            div_2.attr('type','visited');
        }
        else if(div_1.attr('set') != div_2.attr('set')){
            //Combine the sets;
            $('[set =' + div_2.attr('set') + ']').attr('set', div_1.attr('set'));
            //Excavate the barrier between the two
            $('#'+((curr[0][0] + curr[1][0])/2) + 'a' + (curr[0][1] + curr[1][1])/2).attr('type','visited');
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    $('[set]').removeAttr('set');
}

/** Maze Generation using the Hunt and Kill Method (enhanced DFS) */
async function GenerateMaze_HAK(){
    ClearBoard();
    while(true){
        let start = HAK_helper();

        if(start[0] == -1) return;
        else if(start[1] == 1) start.push(1); 
        else start.push(2);
        
        let stack = [start];
        while(stack.length > 0){
            let curr = stack[stack.length-1];
            let options = [];
            RenderEightWalls(curr[0],curr[1]);
            Excavate(curr[2],curr[1],curr[0]);
            $('#'+curr[0]+'a'+curr[1]).attr('type','visited');
            stack.pop();
            for(let i = 0; i < 4; i++){
                let curr_div = $('#'+(curr[0]+dy[i])+'a'+(curr[1]+dx[i]));
                if(validDivIndx(curr[0]+dy[i],curr[1]+dx[i]) && curr_div.attr('type') != "visited"){
                    options.push([curr[0]+dy[i],curr[1]+dx[i],i]);
                }
            }
            if(!options.length) break;
            else{
                let indx = Math.floor(Math.random()*options.length);
                stack.push(options[indx]);
            }
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
    
}

/** Maze Generation using Eller's Algorithm */
async function GenerateMaze_Eller(){
    ClearBoard();
    //Analyze by row
    for(let i = 1; i < 2*height+1; i+=2){
        //Rule: every node must connect to another node, unless it cannot
        //Excavation: excavate the left wall if binding
        //Edge case: when we are at the bottom row
        let edge_case = i == 2 * height - 1;
        for(let j = 1; j < 2 * width + 1; j+= 2){
            let curr_node = $('#'+i+'a'+j);
            let prev_node = $('#'+i+'a'+(j-2));
            if(curr_node.attr('type') != 'visited'){
                RenderEightWalls(i,j);
                curr_node.attr('type', 'visited');
                curr_node.attr('set',curr_node.attr('id'));
            }
            let clear = prev_node.attr('set') != curr_node.attr('set');
            if(j != 1 && (Math.floor(Math.random()*3) && clear || edge_case)){
                Excavate(2, j, i);
                //Combine the sets
                $('[set=' + curr_node.attr('set') + ']').attr('set',prev_node.attr('set'));
            }            
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        //If we meet the edge case, break out of the loop
        if(edge_case) return;

        //Excavation: for each set, excavate a single verticle wall and render the new vertical components
        let curr_set = $('#'+i+'a'+1).attr('set');
        let options = [];

        for(let j = 1; j < 2 * width + 3; j+= 2){ //+3 is an edge case
            let curr_node = $('#'+i+'a'+j);
            if(curr_node.attr('set') == curr_set){
                options.push([i,j]);
            }
            else{
                let indx = Math.floor(Math.random()*options.length);
                let curr = options[indx];
                let lower_node = $('#'+(curr[0]+2)+'a'+curr[1]);
                RenderEightWalls(curr[0]+2,curr[1]);
                Excavate(3,curr[1],curr[0]);
                lower_node.attr('type','visited');
                lower_node.attr('set',curr_set);
                curr_set = curr_node.attr('set');
                options = [[i,j]];
            }
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
}

//await new Promise(resolve => setTimeout(resolve, 50));