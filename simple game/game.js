 let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    function createBoard() {
      const boardContainer = document.getElementById('board');
      boardContainer.innerHTML = '';
      board.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.innerText = value;
        cell.onclick = () => makeMove(index);
        boardContainer.appendChild(cell);
      });
    }

    function makeMove(index) {
      if (board[index] || checkWinner()) return;
      board[index] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      createBoard();
      updateStatus();
    }

    function checkWinner() {
      const winCombinations = [
        [0,1,2],[3,4,5],[6,7,8],  // rows
        [0,3,6],[1,4,7],[2,5,8],  // columns
        [0,4,8],[2,4,6]           // diagonals
      ];
      for (const [a, b, c] of winCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }

    function updateStatus() {
      const winner = checkWinner();
      const status = document.getElementById('status');
      if (winner) {
        status.innerText = `${winner} wins!`;
      } else if (!board.includes('')) {
        status.innerText = "It's a draw!";
      } else {
        status.innerText = `${currentPlayer}'s Turn`;
      }
    }

    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      createBoard();
      document.getElementById('status').innerText = `${currentPlayer}'s Turn`;
    }

    // Initialize game
    createBoard();