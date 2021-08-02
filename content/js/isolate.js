
// Data

const TASK_CDATA = {
    components: [],
    selected: null
}

const SELECTED_CLASS = `comp-selected`

function select(component)
{
    if (TASK_CDATA.selected != null)
    {
        TASK_CDATA.selected.container.classList.remove(SELECTED_CLASS)
    }

    if (component == null) return

    component.container.classList.add(SELECTED_CLASS)
    TASK_CDATA.selected = component
}

function removeSelected()
{
    if (TASK_CDATA.selected != null)
    {
        TASK_CDATA.components = TASK_CDATA.components.filter((value, index, array) =>
            {
                return value != TASK_CDATA.selected
            })

        compHolder.removeChild(TASK_CDATA.selected.container)
        select(TASK_CDATA.components.length != 0 ? TASK_CDATA.components[0] : null)
    }
}

// Component setup

const compHolder = document.getElementById(`component-view`)
const compGeneric = document.getElementById(`component-title`)

const remove = new ImageButton('subtract', 'subtract_hovered')
    .withAction(selected => removeSelected())
    .end()
const add = new ImageButton(`add`, `add_hovered`)
    .withAction(selected => 
        {
            var cdisp = TaskTemplate.next()
            TASK_CDATA.components.push(cdisp)
            
            var wrapper = cdisp.container
            wrapper.addEventListener(`click`, event => select(cdisp))
            compHolder.appendChild(wrapper)
        })
    .end()

compGeneric.appendChild(remove)
compGeneric.appendChild(add)

// Assignment logic

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

