
const URL = `transponder`

function tsExport(data)
{
    fetch(URL, 
    {
        method: `POST`,
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
}