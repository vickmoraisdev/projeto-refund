// Seleciona todos os elementos do formulário.
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// Captura o evento input e permite escrever apenas números.
amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, "")

    // Transforma o valor em centavos (ex: 150/100 = 1.5 que é equivalente a R$1,50).
    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
}

// Formata a moeda pro formato padrão brasileiro.
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    // Retorna o valor formatado.
    return value
}


// Captura o evento do formulário para obter os valores.
form.onsubmit = (event) =>{
    // Não deixa a página recarregar sozinha.
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // Chama a função para adicionar o novo item na lista.
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        // Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')


    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas! Tente novemente mais tarde.")
        console.log(error)
    }
}