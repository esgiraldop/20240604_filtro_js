export async function fetchApi(url, options, negMsg, posMsg){
    const response = await fetch(url, options)
    if(!response.ok){
        negMsg ? alert(negMsg):""
        return ""
    }
    const data = await response.json()
    posMsg ? alert(posMsg):""
    return data
}