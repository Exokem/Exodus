
var assignButton = document.getElementById('action-ntask-assign')

var taskSections = 0

assignButton.addEventListener('click', function(event)
{
    var title = document.getElementById('ntask-title').value;
    var description = document.getElementById('ntask-description').value;
    var category = document.getElementById('ntask-category').value;

    if (title != '') 
    {
        // Task based on input
        // TODO: write to file
        var task = new Task(title, description)
        task.exportJson()

        var CONTAINER = document.getElementById('task-view')
        CONTAINER.appendChild(task.displayMargin())
    }
})

function imageButton(base, hovered, disabled = null, action = null)
{
    var container = document.createElement('div')
    container.classList.add('image-button')
    
    if (disabled != null)
    {
        var disImg = document.createElement('img')
        disImg.src = iconSrc(disabled)
        container.appendChild(disImg)
    }

    var baseImg = document.createElement('img')
    baseImg.src = iconSrc(base)
    container.appendChild(baseImg)
    
    var hovImg = document.createElement('img')
    hovImg.classList.add('ib-hov')
    hovImg.src = iconSrc(hovered)
    container.appendChild(hovImg)

    if (action != null)
    {
        hovImg.addEventListener('click', (event) =>
        {
            action()
        })
    }

    return container
}

function iconSrc(icon)
{
    return `icon/${icon}.png`
}