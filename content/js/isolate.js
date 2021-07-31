
var assignButton = document.getElementById('action-ntask-assign')

var taskSections = 0

assignButton.addEventListener('click', function(event)
{
    var title = document.getElementById('ntask-title').value;
    var descr = document.getElementById('ntask-description').value;
    var category = document.getElementById('ntask-category').value;

    if (title != '') 
    {
        var task = new Task(title, description)

        var taskDisplay = document.createElement('div')

        // Task label
        var label = document.createElement('p')
        label.classList.add('hovl')
        label.innerHTML = title

        // Task description
        var description = document.createElement('textarea')
        description.rows = 2
        description.innerHTML = descr

        // Task hide button
        var hide = imageButton('close_task', 'close_task_hovered', null, action = () =>
        {
            description.style.height = 0
        })
        hide.style['grid-column'] = 2

        // Horizontal bar with title, selection, and options
        var generic = document.createElement('div')
        generic.classList.add('grid', 'label-height', 'g5')
        generic.style.position = 'relative'
        generic.appendChild(label)
        generic.appendChild(hide)

        // Task display wrapper
        var wrapper = document.createElement('div')
        wrapper.classList.add('hoverable', 'grid', 'rui1', 'p5', 'g5')
        wrapper.appendChild(generic)
        wrapper.appendChild(description)

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