const wall_color = "black";

class Maze{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.grid = [];
    }
    /**Maze Initializer */
    Initialize(){
        for(var i = 0; i < this.height; i++){
            this.grid.push([]);
            for(var j = 0; j < this.width; j++){
                this.grid[i].push([0,0]);
            }
        }
    }
    GenerateMazeRandom(){
        /**@todo */
        for(var i = 0; i < this.height; i++){
            for(var j = 0; j < this.width; j++){
                var rand = Math.floor(Math.random() * 2);
                if(rand) this.grid[i][j][0] = 1;
                else this.grid[i][j][1] = 1;
            }
        }
    }
}

async function RenderMaze(maze_object){
    var wall = document.getElementById("0,0");
    wall.style.background = wall_color;
    for(var i = 1; i < maze_object.height * 2 + 1; i+=2){
        for(var j = 1; j < maze_object.width * 2 + 1; j+=2){
            if(maze_object.grid[Math.floor(i/2)][Math.floor(j/2)][0]){
                wall = document.getElementById(i + ',' + (j+1));
                wall.style.background = wall_color;
            }
            if(maze_object.grid[Math.floor(i/2)][Math.floor(j/2)][1]){
                wall = document.getElementById((i+1) + ',' + j);
                wall.style.background = wall_color;
            }
            if(i == 1){
                wall = document.getElementById((i-1) + ',' + (j)); wall.style.background = wall_color;
                wall = document.getElementById((i-1) + ',' + (j+1)); wall.style.background = wall_color;
            }
            if(j == 1){
                wall = document.getElementById((i) + ',' + (j-1)); wall.style.background = wall_color;
                wall = document.getElementById((i+1) + ',' + (j-1)); wall.style.background = wall_color;
            }
            wall = document.getElementById((i+1)+','+(j+1));
            wall.style.background = wall_color;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}