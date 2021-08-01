
const URL = `transponder`

const GET_JSON = { method: `GET`, headers: { 'Content-type': 'application/json'} }

const TASK_DATA = fetch(`/data/task`, GET_JSON)
    .then(function(response) { return response.json() })
    .then((data) => 
    {
        data.files.forEach(file =>
        {
            console.log(`Emitting request for file '${file}'`)

            fetch(file, GET_JSON)
            .then(function(response) { return response.json() })  
            .then(data => 
            {
                var task = Task.importJson(data)
                document.getElementById('task-view').appendChild(task.displayMargin())
            })    
            .catch((err) => 
            { 
                console.log(`Request failed for '${file}'`); console.log(err) 
            }) 
        })    
    })

function tsExport(data)
{
    fetch(URL, 
    {
        method: `POST`,
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
}