//import { getRandomInt } from "./sudoku.js";

window.addEventListener("DOMContentLoaded", addLevelEvents);

const levels = {
    easy: 55,
    medium: 47,
    hard: 35,
    expert: 30,
    insane: 19,
}

var mistakes = 0; //Number of incorrect inputs by user
var mistakeLimit = 5; //Limit of incorrect inputs by user
var levelSelected = levels.easy;

//Used for Comparing Solved Cells
let solvedSudokuArray = []; //Completed Solved Board
let displayedSudokuArray = []; //Board with missing cells

function addLevelEvents(){ //Adding Event Listeneres to Menu Options
    for(var i = 1; i < 6; i++){
        const levelSelector = document.getElementById("slide-item-" + i); //Get Menu Items By ID
        levelSelector.addEventListener("click", () => {
            var lab  = document.querySelector(`label.${levelSelector.id} span`).innerHTML; //Get Level
            switch(lab){ //Set Level
                case("Easy"):
                levelSelected = levels.easy;
                break;
                case("Medium"):
                levelSelected = levels.medium;
                break;
                case("Hard"):
                levelSelected = levels.hard;
                break;
                case("Expert"):
                levelSelected = levels.expert;
                break;
                case("Insane"):
                levelSelected = levels.insane;
                break;
                default:
                levelSelected = levels.easy;
            }
            refreshTable(); //Clear and Reset Sudoku Table
        });
    }
    refreshTable(); //Readd Sudoku Puzzle
}
function addSudoku() {
    generateGrid(); //Create 9x9 Sudoku Grid
    hideCells(); //Hide cells based on level
    addElements(); //Add DOM Elements to Page
}
function refreshTable(){ //Reset Sudoku Table
    const sudoku = document.getElementById("Sudoku"); //Get Sudoku Container
    while (sudoku.firstChild) sudoku.removeChild(sudoku.firstChild); //Remove Every Child Element
    displayedSudokuArray = []; 
    solvedSudokuArray = []; //Clear Solved
    mistakes = 0; //Set Mistakes to 0

    const m = document.querySelector(".mistakes"); 
    m.innerHTML = `<p id="errors">Mistakes: ${mistakes}/${mistakeLimit}</p>`;
    m.innerHTML += `<p id="numsleft">1 2 3 4 5 6 7 8 9</p>`;

    sudoku.style.removeProperty('background');
    sudoku.style.removeProperty('background-size');

    addSudoku(); //Re-add the Table
}
function generateGrid(){ //BAS PAS and ABS Algorithm Created by Mark Fredrick Graves Jr.
    var arr = new Array(9).fill(0);
    var grid = new Array(81).fill(0);
    for(var i = 1; i <= 9; i++) arr[i-1] = i;
    for(var i = 0; i < 81; i++){
        if(i%9 ==0) arr = shuffle(arr); 
        var perBox = (parseInt(i / 3) % 3) * 9 + parseInt((i % 27) / 9) * 3 + parseInt(i / 27) * 27 + (i %3);
        grid[perBox] = arr[i % 9];
    }
    var sorted = new Array(81).fill(false);
    for(var i = 0; i < 9; i++){
        backtrack = false;
        for(var a = 0; a < 2; a++){
            var registered = new Array(81).fill(false);
            var rowOrigin = i * 9;
            var colOrigin = i;
            
            ROW_COL:
            for(var j = 0; j < 9; j++){
                var step = (a%2==0? rowOrigin + j: colOrigin + j*9);
                var num = grid[step];
                
                if(!registered[num]) registered[num] = true;
                else{
                    for(var y = j; y >=0; y--){
                        var scan = (a%2==0? i * 9 + y: i + 9 * y);
                        if(grid[scan] == num){
                            for(var z = (a%2==0? (i%3 + 1) * 3: 0); z < 9; z++){
                                if(a%2 == 1 && z%3 <= i%3) continue;
                                var boxOrigin = parseInt((scan % 9) / 3) * 3 + parseInt(scan / 27) * 27;
                                var boxStep = boxOrigin + parseInt(z / 3) * 9 + (z % 3);
                                var boxNum = grid[boxStep];
                                if((!sorted[scan] && !sorted[boxStep] && !registered[boxNum])|| (sorted[scan] && !registered[boxNum] && (a%2==0? boxStep%9==scan%9: parseInt(boxStep/9)==parseInt(scan/9)))){
                                    grid[scan] = boxNum;
                                    grid[boxStep] = num;
                                    registered[boxNum] = true;
                                    continue ROW_COL;
                                }
                                else if(z == 8){
                                    var searchingNo = num;
                                    //Booleans
                                    var blindSwapIndex = new Array(81).fill(false);
                                    
                                    for(var q = 0; q < 18; q++){
                                        SWAP:
                                        for(var b = 0; b <= j; b++){
                                            var pacing = (a%2==0? rowOrigin+b: colOrigin+b*9);
                                            if(grid[pacing] == searchingNo){
                                                var adjacentCell = -1;
                                                var adjacentNo = -1;
                                                var decrement = (a%2==0? 9: 1);
                                                
                                                for(var c = 1; c < 3 - (i % 3); c++){
                                                    adjacentCell = pacing + (a%2==0? (c + 1)*9: c + 1);
                                                    if((a%2==0 && adjacentCell >= 81) || (a%2==1 && adjacentCell % 9 == 0)) adjacentCell -= decrement;
                                                    else{
                                                        adjacentNo = grid[adjacentCell];
                                                        if(i%3!=0 || c!=1 || blindSwapIndex[adjacentCell] || registered[adjacentNo]) adjacentCell -= decrement;
                                                    }
                                                    adjacentNo = grid[adjacentCell];
                                                    if(!blindSwapIndex[adjacentCell]){
                                                        blindSwapIndex[adjacentCell] = true;
                                                        grid[pacing] = adjacentNo;
                                                        grid[adjacentCell] = searchingNo;
                                                        searchingNo = adjacentNo;
                                                        
                                                        if(!registered[adjacentNo]){
                                                            registered[adjacentNo] = true;
                                                            continue ROW_COL;
                                                        }
                                                        break SWAP;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    backtrack = true;
                                    break ROW_COL;
                                }
                            }
                        }
                    }
                }
            }
            if(a%2 == 0) for(var j = 0; j < 9; j++) sorted[i*9+j] = true;
            else if(!backtrack) for(var j = 0; j < 9; j++) sorted[i+j*9] = true;
            else{
                backtrack = false;
                for(var j = 0; j < 9; j++) sorted[i*9+j] = false;
                for(var j = 0; j < 9; j++) sorted[(i-1)*9+j] = false;
                for(var j = 0; j < 9; j++) sorted[i-1+j*9] = false;
                i -= 2;
            }
        }
    }
    function shuffle(array){
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {  // While there remain elements to shuffle...
            randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element...
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]; // And swap it with the current element.
        }
        return array;
    }

    updateSolvedGrid(grid);
}
function updateSolvedGrid(grid){
    if(grid.length != 81) console.log("Invalid");//Invalid Grid 
    var row = [];
    var solved = [];
    for(var i = 0; i < 81; i++){
        row.push(parseInt(grid[i]));
        if(i % 9 == 8){
            //console.log(row);
            solved.push(row);
            row = [];
        }
    }
    solvedSudokuArray = [...solved];
}
function getRandom(min, max){ //Random int from min - max;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function hideCells(){
    displayedSudokuArray = JSON.parse(JSON.stringify(solvedSudokuArray)); //Duplicate of SolvedSudokuArray to Edit
    for(var i = 0; i < 81 - levelSelected; i++){ //9x9 is 81 then hide by the number of the level
        var x = getRandom(0,8); //Getting Random Row
        var y = getRandom(0,8); //Getting Random Cell
        
        if(displayedSudokuArray[x][y] != 0) displayedSudokuArray[x][y] = 0; //Only hiding non hidden cells
        else i--; //Trying Again If Already Hidden
    }
}
function addElements(){
    //Adding 9x9 Sudoku
    const sudoku = document.getElementById("Sudoku");
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var ID = "cell-" + i + "-" + j; // Creating Cell ID
            var value = displayedSudokuArray[i][j]; //Getting Value For Display
            if(value != 0) sudoku.innerHTML = sudoku.innerHTML +  `<input type="text" class="cell displayed" id=${ID} value=${value} disabled>`; //If it has a value don't allow editing
            else sudoku.innerHTML = sudoku.innerHTML +  `<input type="text" value='' class="cell" id=${ID}>`; //If cell doesn't have value allow editing
            
        }
    }

    // get all children
    const childern = sudoku.childNodes;
    // iterate over all child nodes
    Array.from(childern).forEach(input => {
        input.addEventListener('input', (e) => {checkInput(parseInt(e.target.value), input.id.split('-')[1], input.id.split('-')[2])}); //Add Function To Check Update
    });
}
function checkInput(input, x, y){ //Checks if input is valid and correct
    var id = "cell-" + x + "-" + y; //Grab Cell ID
    const cell = document.getElementById(id);
    input = input % 10;
    cell.value = input;

    if(isNaN(input)) { //Check if input is not a number
        cell.value = ''; //If so then remove the value
        if(cell.classList.contains("wrong")) cell.classList.remove("wrong"); //If previously marked wrong remove the wrong class
    }
    else if(solvedSudokuArray[x][y] != input){ //If input is not the correct answer mark wrong
        cell.classList.add("wrong");
        mistakes++;

        if(mistakes == mistakeLimit){
            const sudoku = document.getElementById("Sudoku"); //Get Sudoku Element
            sudoku.style.background = "url('images/GameOverSmall.gif')" //Put Game-Over Animation Backgound
            sudoku.style.backgroundSize = "100%" //So it doesn't repeat
            gameOver(); //Clear The Board
        }
    } 
    else{ 
        if(cell.classList.contains("wrong")) cell.classList.remove("wrong") //If valid and if marked wrong previously remove the wrong class
        displayedSudokuArray[x][y] = input;
        checkGame();
    } 
    const m = document.querySelector(".mistakes"); 
    m.innerHTML = `<p id="errors">Mistakes: ${mistakes}/${mistakeLimit}</p>`;
    m.innerHTML += `<p id="numsleft">${checkNumsLeft()}</p>`;
}
function checkGame(){ //Checks if sudoku is fully solved
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(solvedSudokuArray[i][j] != displayedSudokuArray[i][j]){
                return false;
            }
        }
    }
    //The Game Has Been Won!
    const sudoku = document.getElementById("Sudoku"); //Get Sudoku Element
    sudoku.style.background = "url('images/CongratsSmall.gif')" //Put Congrats Animation Backgound
    sudoku.style.backgroundSize = "100%" //So it doesn't repeat
    gameOver(); //Clear The Board
}
function checkNumsLeft(){
    var nums = "";
    for(var i = 0; i < 9; i++){
        var count = 0;
        for(var j = 0; j < 9; j++){
            count += displayedSudokuArray[j].filter(x => x == (i + 1)).length;
        }
        if(count != 9) nums += (i + 1) + " ";
    }
    return nums;
}
function gameOver(){ //If Mistake Limit Reached Game Over
    const sudoku = document.getElementById("Sudoku"); //Get Sudoku Container
    while (sudoku.firstChild) sudoku.removeChild(sudoku.firstChild); //Remove Every Child Element
    displayedSudokuArray = []; 
    solvedSudokuArray = []; //Clear Solved
}
