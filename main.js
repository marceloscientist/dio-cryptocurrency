var apiKey = {
    key: 'b3fd809b-e797-4705-b5c0-5fdbbd97c515'
}

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' +
    apiKey.key)
    .then((response) => {
        if (!response.ok) throw new Error('Erro ao executar a requisão, status ' + response.status);
        return response.json()
    })
    .then((api) => {

        var text = "";
        for(let i = 0; i < 10; i++) {
            var date = getHumanReadableDate(Date.parse(api.data[i].first_historical_data))
            text += text + `
            <div class="media">
                <img src="coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60"> 
                <div class="media-body">
                    <h5 class="mt-2">${api.data[i].name}</h5>
                    <p>${api.data[i].symbol}</p>
                    <p>First Appeared: ${date}</p>
                    
                </div>
            </div>           
            `
        }
        document.getElementById("coins").innerHTML = text
    })
    .catch((error) => {
        console.error(error.message)
    })


    var getHumanReadableDate = function(date) {
        if (date instanceof Date) {
             return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        } else if (isFinite(date)) {//timestamp
            var d = new Date();
            d.setTime(date);
            return this.getHumanReadableDate(d);
        }
    }