export const fetchAddGood = (id) => {
    fetch(`${URL}/${id}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        }
    })
}

export const fetchAddBasketGoods = () => {
    return fetch(`${URL}/basketgoods`).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })
}

export const service = function (url, postfix, method = "GET") {
    return new Promise((resolve, reject) => {
        fetch(`${url}${postfix}`, {
            method
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data)
        })
    })
}