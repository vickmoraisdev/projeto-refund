// Seleciona todos os elementos do formulário.
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// Seleciona os elementos da lista.
const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')

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

// Adiciona um novo item na lista.
function expenseAdd(newExpense){
    try {
        // Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        // Cria o ícone da categoria.
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        // Cria a info da despesa.
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')
        // Cria o nome da despesa.
        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense
        // Cria a categoria da despesa.
        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        // Adiciona o nome e a categoria na div da info da despesa.
        expenseInfo.append(expenseName, expenseCategory) 

        // Adiciona o valor que o usuário digitou na despesa.
        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace('R$', "")}`

        // Cria o botão de excluir alguma despesa.
        const expenseTrash = document.createElement('img')
        expenseTrash.setAttribute('src', './img/remove.svg')
        expenseTrash.setAttribute('alt', 'remover')
        expenseTrash.classList.add('remove-icon')


        // Adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseTrash)
        // Adicona o item na lista.
        expenseList.append(expenseItem)

        // Atualiza os totais.
        upadateTotals()
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas! Tente novemente mais tarde.")
        console.log(error)
    }
}

// Atualiza os totais de despesa e valor.
function upadateTotals() {
    try {
        const items = expenseList.children

        // Atualiza a quantidade de itens na lista.
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas." : "despesa."}`
    } catch (error) {
        alert("Não foi possível atualizar os totais de solicitações! Tente novemente mais tarde.")
        console.log(error)
    }
}