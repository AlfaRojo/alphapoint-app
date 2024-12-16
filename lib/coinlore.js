export async function getTopCryptos() {
    const TOP_CRYPTOS = "https://api.coinlore.net/api/tickers/?limit=50"

    const rawData = await fetch(TOP_CRYPTOS);
    const json = await rawData.json();

    const { data: items } = json;

    return items.map((item) => {
        const { id, symbol, name, rank, price_usd, percent_change_24h } = item;

        const graph = `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${rank}.svg`

        return {
            id, symbol,
            name,
            rank,
            price_usd,
            percent_change_24h,
            graph
        };

    })
};