const ownerKey = "kfdduhdrmcjvfjkfud"
const url = "https://thread-apricot-index.glitch.me/cards/"



document.querySelector("#new").addEventListener("click", () => {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"ownerKey": ownerKey})
    }).then(async function (response) {
        getData();
    })
})
getData();
function getData() {
    fetch(url + ownerKey).then(async function (response) {
        let data = await response.json();
        render(data);
    })
}

function render(cards) {
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = null;
    for (const card of cards) { 
        let formattedNumber = card.cardNumber.match(/.{1,4}/g).join(" ");
        tbody.innerHTML += `
            <tr>
                <td>${card.id}</td>
                <td>${formattedNumber}</td>
                <td>${card.expireDate}</td>
                <td>${card.balance}₴</td>
                <td><input type="password" value="${card.cvv}" readonly></td>
                <td>
                    <button class="btn btn-warning">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
    }
}