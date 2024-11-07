// Saldo inicial do jogador
let balance = 100000;

function spin() {
    const betInput = document.getElementById("bet");
    const bet = parseInt(betInput.value);

    // Verifica se o jogador tem saldo suficiente para apostar
    if (bet > balance) {
        document.getElementById("result").textContent = "Saldo insuficiente para essa aposta!";
        return;
    }

    // Deduz a aposta do saldo
    balance -= bet;
    updateBalance();

    const symbols = ["🐅", "💰", "🔔", "🍀", "🎲", "🍒", "🍇", "⭐", "🍋"];
    const cells = Array.from({ length: 9 }, (_, i) => document.getElementById(`cell${i + 1}`));

    // Adiciona animação de giro
    cells.forEach(cell => cell.classList.add("spin-animation"));

    // Reseta o resultado para "Girando..."
    const result = document.getElementById("result");
    result.textContent = "Girando...";

    // Após 2 segundos, para a animação e exibe o resultado
    setTimeout(() => {
        // Remove a animação de giro
        cells.forEach(cell => cell.classList.remove("spin-animation"));

        // Define símbolo aleatório para cada célula
        cells.forEach(cell => {
            cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        });

        // Verifica combinações vencedoras
        if (checkWin(cells)) {
            const winnings = bet * 5; // Ganho é 5 vezes o valor da aposta
            balance += winnings;
            result.textContent = `Parabéns! Você ganhou ${winnings} créditos!`;
        } else {
            result.textContent = "Tente novamente!";
        }

        // Atualiza o saldo
        updateBalance();
    }, 2000);
}

// Atualiza o saldo exibido
function updateBalance() {
    document.getElementById("balance").textContent = balance;
}

// Função para verificar combinações vencedoras
function checkWin(cells) {
    const winningCombinations = [
        // Linhas horizontais
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Colunas verticais
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
}