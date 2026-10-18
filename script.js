async function getRate(from, to) {
    let promise = await fetch("https://open.er-api.com/v6/latest/" + from);
    let data = await promise.json();
    return data.rates[to];
}

async function rateLogic() {
    let toCountry = document.getElementById("to-currency").value;
    let fromCountry = document.getElementById("from-currency").value;
    
    let rate = await getRate(fromCountry, toCountry);
    let amount = document.getElementById("amount").value;
    
    let finalAmount = (amount * rate).toFixed(2);
    
    let convertedAmount = document.getElementById("converted-amount");
    convertedAmount.innerText = `${finalAmount} ${toCountry}`;
    
    let exchangeRate = document.getElementById("exchange-rate-text");
    exchangeRate.innerText = `1 ${fromCountry} = ${rate.toFixed(2)} ${toCountry}`;
}

const swapBtn = document.getElementById("swap-btn");

swapBtn.addEventListener("click", () => {
    let fromSelect = document.getElementById("from-currency");
    let toSelect = document.getElementById("to-currency");
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    rateLogic();

    let fromImg = document.getElementById("from-flag");
    let toImg = document.getElementById("to-flag");

    temp = fromImg.src;
    fromImg.src = toImg.src;
    toImg.src = temp;

});

let btn = document.getElementById("convert-btn");
btn.addEventListener('click', rateLogic);