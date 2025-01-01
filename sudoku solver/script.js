document.addEventListener("DOMContentLoaded", () => {
    const sudokuGrid = document.getElementById("sudoku-grid");
    const solveBtn = document.getElementById("solve-btn");
    const resetBtn = document.getElementById("reset-btn");

    // Generate the dynamic grid with alternating colors
    function createGrid(size = 9) {
        sudokuGrid.innerHTML = "";
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.createElement("input");
                input.type = "number";
                input.min = 1;
                input.max = size;
                input.dataset.row = i;
                input.dataset.col = j;

                // Apply alternating colors (checkerboard pattern)
                if ((i + j) % 2 === 0) {
                    input.style.backgroundColor = "#fff"; // White
                } else {
                    input.style.backgroundColor = "#87ceeb"; // Sky Blue
                }

                // Restrict input values to valid numbers
                input.addEventListener("input", () => {
                    const value = input.value;
                    if (value < 1 || value > size) {
                        input.value = "";
                    }
                });

                sudokuGrid.appendChild(input);
            }
        }
        sudokuGrid.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        sudokuGrid.style.gridTemplateRows = `repeat(${size}, 50px)`;
    }

    // Initialize the grid to a default size of 9x9
    createGrid();

    // Get the current grid values and determine size
    function getGridValues() {
        const inputs = document.querySelectorAll("input");
        let maxSize = 9; // Default minimum size
        const grid = [];

        inputs.forEach((input) => {
            const row = parseInt(input.dataset.row);
            const col = parseInt(input.dataset.col);
            const value = input.value ? parseInt(input.value) : 0;

            // Dynamically determine the max grid size based on input
            if (value !== 0) {
                maxSize = Math.max(maxSize, row + 1, col + 1);
            }

            if (!grid[row]) {
                grid[row] = [];
            }
            grid[row][col] = value;
        });

        return { grid, maxSize };
    }

    // Highlight errors in rows and columns
    function highlightErrors(grid, size) {
        const rows = Array.from({ length: size }, () => new Map());
        const cols = Array.from({ length: size }, () => new Map());

        const highlightInvalid = (row, col) => {
            const input = document.querySelector(
                `input[data-row="${row}"][data-col="${col}"]`
            );
            input.classList.add("invalid");
        };

        document
            .querySelectorAll("input")
            .forEach((input) => input.classList.remove("invalid"));

        let isValid = true;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const value = grid[row][col];
                if (value === 0) continue;

                if (rows[row].has(value)) {
                    highlightInvalid(row, col);
                    highlightInvalid(row, rows[row].get(value));
                    isValid = false;
                } else {
                    rows[row].set(value, col);
                }

                if (cols[col].has(value)) {
                    highlightInvalid(row, col);
                    highlightInvalid(cols[col].get(value), col);
                    isValid = false;
                } else {
                    cols[col].set(value, row);
                }
            }
        }

        return isValid;
    }

    // Solve the Sudoku puzzle using backtracking
    function solveSudoku(grid, size) {
        const findEmpty = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (grid[i][j] === 0) {
                        return [i, j];
                    }
                }
            }
            return null;
        };

        const isValid = (num, pos) => {
            const [row, col] = pos;

            for (let i = 0; i < size; i++) {
                if (grid[row][i] === num && i !== col) {
                    return false;
                }
            }

            for (let i = 0; i < size; i++) {
                if (grid[i][col] === num && i !== row) {
                    return false;
                }
            }

            const boxSize = Math.sqrt(size);
            const boxRowStart = Math.floor(row / boxSize) * boxSize;
            const boxColStart = Math.floor(col / boxSize) * boxSize;

            for (let i = boxRowStart; i < boxRowStart + boxSize; i++) {
                for (let j = boxColStart; j < boxColStart + boxSize; j++) {
                    if (grid[i][j] === num && (i !== row || j !== col)) {
                        return false;
                    }
                }
            }

            return true;
        };

        const solve = () => {
            const emptyPos = findEmpty();
            if (!emptyPos) return true;

            const [row, col] = emptyPos;

            for (let num = 1; num <= size; num++) {
                if (isValid(num, [row, col])) {
                    grid[row][col] = num;

                    if (solve()) {
                        return true;
                    }

                    grid[row][col] = 0;
                }
            }

            return false;
        };

        return solve();
    }

    // Update the grid with the solved values
    function updateGrid(grid, size) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const input = document.querySelector(
                    `input[data-row="${i}"][data-col="${j}"]`
                );
                input.value = grid[i][j];
            }
        }
    }

    // Event listener for the Solve button
    solveBtn.addEventListener("click", () => {
        const { grid, maxSize } = getGridValues();

        if (!highlightErrors(grid, maxSize)) {
            alert(
                "The entered Sudoku puzzle has an invalid row or column. Please fix the highlighted cells."
            );
        } else if (solveSudoku(grid, maxSize)) {
            updateGrid(grid, maxSize);
        } else {
            alert("No solution exists!");
        }
    });

    // Event listener for the Reset button
    resetBtn.addEventListener("click", () => {
        document.querySelectorAll("input").forEach((input) => {
            input.value = "";
            input.classList.remove("invalid");
        });
    });
});

function applyCellColors() {
    const gridCells = document.querySelectorAll("#sudoku-grid input");

    // Define a color pattern for 9 rows
    const colorsPattern = [
        [
            "#8bc34a",
            "#f06292",
            "#ffb74d",
            "#fff176",
            "#ff7043",
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
        ],
        [
            "#f06292",
            "#ffb74d",
            "#fff176",
            "#ff7043",
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
        ],
        [
            "#ffb74d",
            "#fff176",
            "#ff7043",
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
        ],
        [
            "#fff176",
            "#ff7043",
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ffb74d",
        ],
        [
            "#ff7043",
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ffb74d",
            "#fff176",
        ],
        [
            "#f44336",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ffb74d",
            "#fff176",
            "#ff7043",
        ],
        [
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ff7043",
            "#fff176",
            "#ff7043",
            "#ffb74d",
        ],
        [
            "#ef5350",
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ff7043",
            "#fff176",
            "#4fc3f7",
            "#ff7043",
            "#ffb74d",
        ],
        [
            "#ffb74d",
            "#8bc34a",
            "#f06292",
            "#ff7043",
            "#fff176",
            "#4fc3f7",
            "#ef5350",
            "#ffb74d",
            "#f44336",
        ],
    ];

    // Iterate through each cell and apply colors based on the pattern
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        // Assign color based on predefined pattern
        cell.style.backgroundColor = colorsPattern[row][col];
    });
}

// Ensure this function is called on page load or when the grid is generated
document.addEventListener("DOMContentLoaded", () => {
    applyCellColors();
});
