const grid = document.getElementById("grid");
const cellSize = 20;
const width = 36, height = 15;
function InitializeGrid(){
    for(var a = 0; a < height*2 + 1; a++){
        for(var b = 0; b < width*2 + 1; b++){
            var tile = document.createElement("div");
            tile.setAttribute("type", "tile");
            tile.setAttribute("id", a + ',' + b);
            tile.style.width = cellSize;
            tile.style.height = cellSize;
            grid.style.width = width*2*cellSize + cellSize;
            grid.style.height = height*2*cellSize + cellSize;
            grid.appendChild(tile);
        }
    }
}

var maze_ = new Maze(width, height);
maze_.Initialize(); maze_.GenerateMazeRandom();
function main(){
    InitializeGrid();
}
main();
