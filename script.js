
  const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let board = Array(9).fill(null);
  let isX = true;
  let scores = { X: 0, O: 0, draws: 0 };
  let gameOver = false;
  let winLine = null;
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");
  function render() {
    boardEl.innerHTML = "";
    const result = getWinner();
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (board[i]) {
        cell.classList.add("taken", board[i].toLowerCase());
        cell.innerHTML = `<span>${board[i]}</span>`;
      }
      if (gameOver) cell.classList.add("game-over");
      if (winLine && winLine.includes(i)) cell.classList.add(board[i] === "X" ? "win-x" : "win-o");
      cell.addEventListener("click", () => play(i));
      boardEl.appendChild(cell);
    }
    document.getElementById("score-x").textContent = scores.X;
    document.getElementById("score-o").textContent = scores.O;
    document.getElementById("score-draw").textContent = scores.draws;
    if (result.winner) {
      statusEl.textContent = `${result.winner} wins! 🎉`;
      statusEl.className = "status " + (result.winner === "X" ? "x-wins" : "o-wins");
    } else if (board.every(Boolean)) {
      statusEl.textContent = "It's a draw!";
      statusEl.className = "status";
    } else {
      statusEl.textContent = `${isX ? "X" : "O"}'s turn`;
      statusEl.className = "status";
    }
  }
  function getWinner() {
    for (const [a, b, c] of LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return { winner: board[a], line: [a, b, c] };
    }
    return { winner: null, line: null };
  }
  function play(i) {
    if (board[i] || gameOver) return;
    board[i] = isX ? "X" : "O";
    isX = !isX;
    const result = getWinner();
    if (result.winner) {
      gameOver = true;
      winLine = result.line;
      scores[result.winner]++;
    } else if (board.every(Boolean)) {
      gameOver = true;
      scores.draws++;
    }
    render();
  }
  function newGame() {
    board = Array(9).fill(null);
    isX = true;
    gameOver = false;
    winLine = null;
    render();
  }
  function resetAll() {
    scores = { X: 0, O: 0, draws: 0 };
    newGame();
  }
  render();