
const URL = `transponder`

const GET_JSON = { method: `GET`, headers: { 'Content-type': 'application/json'} }

const TASK_DATA = fetch(`/data/task`, GET_JSON)
    .then(function(response) { return response.json() })
    .then((data) => 
    {
        data.files.forEach(file =>
        {
            fetch(file, GET_JSON)
            .then(function(response) { return response.json() })  
            .then(data => 
            {
                var task = Task.importJson(data, deleteTask)
                document.getElementById('task-view').appendChild(task.displayMargin())
            })    
            .catch((err) => 
            { 
                console.log(`Emitted request failed for file '${file}'`); console.log(err) 
            }) 
        })   
        
        console.log(`Emission retrieved ${data.files.length} files`)
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

function tsErase(task)
{
    fetch(`transponder/erase`,
    {
        method: `POST`,
        body: JSON.stringify(task.asSimpleJson()),
        headers: { 'Content-type': 'application/json; charset=UTF-8'}
    })
    .catch(err =>
        {
            console.log(`Emitted deletion request failed: ${err}`)
        })
}