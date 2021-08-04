
const CONTAINER = document.getElementById(`task-view`)

// Data

const TASK_CDATA = {
    components: [],
    selected: null
}

const SELECTED_CLASS = `comp-selected`
const UNSELECTED_CLASS = `comp-unselected`

function select(component)
{
    if (TASK_CDATA.selected != null)
    {
        TASK_CDATA.selected.container.classList.remove(SELECTED_CLASS)
        TASK_CDATA.selected.container.classList.add(UNSELECTED_CLASS)
    }

    TASK_CDATA.selected = component

    if (component == null) return

    component.container.classList.remove(UNSELECTED_CLASS)
    component.container.classList.add(SELECTED_CLASS)
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
        select(TASK_CDATA.components.length != 0 ? TASK_CDATA.components[TASK_CDATA.components.length - 1] : null)
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

            wrapper.style[`max-height`] = `134.613px`

            while (compHolder.firstChild) compHolder.removeChild(compHolder.firstChild)

            for (var ix = TASK_CDATA.components.length - 1; 0 <= ix; ix --)
            {
                compHolder.appendChild(TASK_CDATA.components[ix].container)
            }

            select(cdisp)
        })
    .end()

compGeneric.appendChild(remove)
compGeneric.appendChild(add)

// Assignment logic

const assignButton = document.getElementById('action-ntask-assign')


var taskSections = 0

assignButton.addEventListener('click', function(event)
{
    var title = document.getElementById('ntask-title').value;
    var description = document.getElementById('ntask-description').value;
    var category = document.getElementById('ntask-category').value;

    if (title != '') 
    {
        var task = Task.next(title, description).withConsumer(deleteTask)

        while(0 < TASK_CDATA.components.length)
        {
            var comp = TASK_CDATA.components.pop()
            compHolder.removeChild(comp.container)

            if (comp.title.value.length != 0) task.addComponent(comp.asTask())
        }

        task.exportJson()

        CONTAINER.appendChild(task.displayMargin())
    }
})

function deleteTask(task)
{
    if (!confirm(`Confirm task deletion (this cannot be undone)`)) return

    tsErase(task)

    CONTAINER.removeChild(task.displayMargin())
}
