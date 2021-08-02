
// Data

const TASK_CDATA = {
    components: [],
    selected: null
}

const SELECTED_CLASS = `comp-selected`

// Component setup

const compHolder = document.getElementById(`component-view`)
const compGeneric = document.getElementById(`component-title`)

const remove = new ImageButton('subtract', 'subtract_hovered')
    .withAction(selected =>
        {
            if (TASK_CDATA.selected != null)
            {
                TASK_CDATA.components.remove(TASK_CDATA.selected)
                TASK_CDATA.selected = null
            }
        })
    .end()
const add = new ImageButton(`add`, `add_hovered`)
    .withAction(selected => 
        {
            var cdisp = TaskTemplate.next()
            TASK_CDATA.components.push(cdisp)
            
            var wrapper = cdisp.container
            wrapper.addEventListener(`click`, event =>
            {
                if (TASK_CDATA.selected != null)
                {
                    TASK_CDATA.selected.container.classList.remove(SELECTED_CLASS)
                }

                wrapper.classList.add(SELECTED_CLASS)
                TASK_CDATA.selected = cdisp
            })

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

