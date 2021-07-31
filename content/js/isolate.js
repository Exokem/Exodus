
var assignButton = document.getElementById('action-ntask-assign')

var taskSections = 0

assignButton.addEventListener('click', function(event)
{
    var title = document.getElementById('ntask-title').value;
    var descr = document.getElementById('ntask-description').value;
    var category = document.getElementById('ntask-category').value;

    if (title != '') 
    {
        // Task based on input
        // TODO: write to file
        var task = new Task(title, description)
        task.exportJson()

        // Horizontal bar with title, selection, and options
        var generic = document.createElement('div')
        generic.classList.add('grid', 'label-height', 'task-generic', 'g5')
        generic.style.position = 'relative'
        
        // Task display wrapper
        var wrapper = document.createElement('div')
        wrapper.classList.add('hoverable', 'animated', 'grid', 'rui1', 'p5', 'g5')
        wrapper.appendChild(generic)

        // Task completion button
        var completed_button = new ImageButton('selection', 'selection_hovered')
            .withSelection('selection_selected', 'selection_selected_hovered')
        var completed = completed_button.container

        // Task label
        var label = document.createElement('p')
        label.classList.add('hovl')
        label.innerHTML = title

        // Task description
        var description = document.createElement('textarea')
        description.rows = 2
        description.readOnly = `readonly`
        // description.classList.add('js-task-view-desc')
        description.innerHTML = descr

        // Task hide button
        var hide_button = new ImageButton('close_task', 'close_task_hovered')
        var hide = hide_button.container

        // Task information expand button
        var expand_button = new ImageButton('expand', 'expand_hovered')
            .withSelection('expand_selected', 'expand_selected_hovered')
            .withAction((selected) => 
            {
                if (wrapper.contains(description)) wrapper.removeChild(description)
                else if (selected) wrapper.appendChild(description)
            })
        var expand = expand_button.container

        generic.appendChild(completed)
        generic.appendChild(label)
        generic.appendChild(expand)
        generic.appendChild(hide)

        

        var CONTAINER = document.getElementById('task-view')
        CONTAINER.appendChild(wrapper)
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