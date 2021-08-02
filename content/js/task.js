

const TASK_DIR = '../data/task/'

class Category 
{
    title
    description
}

class Task 
{
    static importJson(json)
    {
        return new Task(json.title, json.description)
    }

    constructor(title, description)
    {
        this.identifier = Task.NEXT_INDEX ++
        this.title = title
        this.description = description
    }

    static NEXT_INDEX = 0

    title
    description
    identifier
    category

    displayMargin()
    {
        // Horizontal bar with title, selection, and options
        var generic = Architect.div()
            .withClasses(`label-height task-generic grid g5`)
            .end()
        
        // Task display wrapper
        var wrapper = Architect.div()
            .withClasses(`hoverable grid rui1 p5 g5`)
            .withChildren(generic)
            .end()

        // Task completion button
        var completed = new ImageButton('selection', 'selection_hovered')
            .withSelection('selection_selected', 'selection_selected_hovered')
            .end()

        // Task label
        var label = Architect.start('p')
            .withClasses(`hovl`)
            .withHTML(this.title)
            .end()

        // Task description
        var descArea = Architect.start('textarea')
            .withHTML(this.description)
            .end()

            descArea.rows = 2
            descArea.readOnly = `readonly`

        // Task hide button
        var hide = new ImageButton('close_task', 'close_task_hovered')
            .end()

        // Task information expand button
        var expand = new ImageButton('expand', 'expand_hovered')
            .withSelection('expand_selected', 'expand_selected_hovered')
            .withAction((selected) => 
            {
                if (wrapper.contains(descArea)) wrapper.removeChild(descArea)
                else if (selected) wrapper.appendChild(descArea)
            })
            .end()

        generic.appendChild(completed)
        generic.appendChild(label)
        generic.appendChild(expand)
        generic.appendChild(hide)

        return wrapper
    }

    exportJson()
    {
        var jsonData = {
            "identifier": this.identifier,
            "title": this.title,
            "description": this.description
        }

        console.log(`Exporting task json 'ID=${this.identifier}'`)

        tsExport(jsonData)
    }
}

class TaskTemplate 
{
    static next()
    {
        var next = new TaskTemplate()

        next._ltitle = Architect.start(`p`)
            .withClasses(`lhov`)
            .withHTML(`Component Title`)
            .end()
        next._ldescription = Architect.start(`p`)
            .withClasses(`lhov`)
            .withHTML(`Component Description`)
            .end()

        next.title = document.createElement(`input`)
        next.description = document.createElement(`textarea`)
        next.description.rows = 2

        next.container = Architect.div()
            .withClasses(`hoverable grid rui1 p5 g5`)
            .withChildren(next._ltitle, next.title, next._ldescription, next.description)
            .end()

        return next
    }

    container

    _ltitle
    _ldescription

    title
    description
}