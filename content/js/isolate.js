var assignButton = document.getElementById('action-ntask-assign')

var taskSections = 0

assignButton.addEventListener('click', function(event)
{
    var title = document.getElementById('ntask-title').value
    var descr = document.getElementById('ntask-description').value
    var category = document.getElementById('ntask-category').value

    if (title != '') 
    {
        var taskView = document.getElementById('task-view')
        var taskDisplay = document.createElement('div')

        var taskLabel = document.createElement('p')
        taskLabel.classList.add('hovl')
        taskLabel.innerHTML = title

        var taskDesc = document.createElement('textarea')
        taskDesc.rows = 10
        taskDesc.value = descr

        taskDisplay.classList.add('hoverable', 'grid', 'rui1', 'p5', 'g5')
        taskDisplay.appendChild(taskLabel)
        taskDisplay.appendChild(taskDesc)
        
        taskSections ++
        console.log(taskSections)
        taskView.appendChild(taskDisplay)

        var task = new Task(title, descr);
        console.log(task.exportPath());
    }
})