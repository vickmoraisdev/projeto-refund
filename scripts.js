// Seleciona todos os elementos do formulário.
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

// Seleciona os elementos da lista.
const expenseList = document.querySelector('ul')
const expenseQuantity = document.querySelector('aside header p span')
const expenseTotal = document.querySelector('aside header h2')

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

        // Variável para incrementar o total
        let total = 0

        // Percorre cada item da lista.
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector('.expense-amount')
            
            // Remove caracteres não numéricos e troca vírgula por ponto.
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(',', '.')
            console.log(itemAmount)

            // Converte o valor para float.
            value = parseFloat(value)

            // Verifica se é um número válido.
            if(isNaN(value)){
                return alert('Não foi possível calcular o total das despesas. O valor não parece ser um número.')
            }

            // Incrementa o valor total
            total += Number(value)
        }
        
        // Cria a small para adicionar o R$ formatado.
        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        // Formata o valor e remove o R$ que será exibido pela small com estilo customizado.
        total = formatCurrencyBRL(total).toUpperCase().replace('R$', "")

        // Limpa o conteúdo do elemento.
        expenseTotal.innerHTML = ""

        expenseTotal.append(symbolBRL, total)
    } catch (error) {
        alert("Não foi possível atualizar os totais de solicitações! Tente novemente mais tarde.")
        console.log(error)
    }
}

// Evento que captura os cliques na lista.
expenseList.addEventListener('click', function(event){
    // Verifica se o elemento clicado é o ícone de remover.
    if(event.target.classList.contains('remove-icon')){
        // Obtém a li pai do elemento de remover clicado.
        const item = event.target.closest('.expense')
        // Remove o item clicado
        item.remove()
        
        // Atualiza os totais.
        upadateTotals()
    }
})