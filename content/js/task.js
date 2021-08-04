

const TASK_DIR = '../data/task/'

function checkedRemove(container, element)
{
    if (container.contains(element)) container.removeChild(element)
}

class Category 
{
    constructor(title, description)
    {
        this.title = title
        this.description = description
    }

    title
    description
}

const ROOT_CATEGORY = new Category(`Root Category`, `Uncategorized tasks`)

class Task 
{
    static importJson(json, consumer = null)
    {
        var task = new Task(json.title, json.description, json.identifier).withConsumer(consumer)

        json.components.forEach(component => task.addComponent(Task.importJson(component, task.removeComponent)))

        return task
    }

    static next(title, description, category = ROOT_CATEGORY)
    {
        return new Task(title, description, Task.NEXT_INDEX ++)
    }

    constructor(title, description, identifier, category = ROOT_CATEGORY)
    {
        this.identifier = identifier
        this.title = title
        this.description = description
        this.category = category
        this.tasks = []

        this.componentHolder = Architect.div()
            .withClasses(`grid rui0 p5 g5`)
            .end()

        Task.NEXT_INDEX = Task.NEXT_INDEX <= identifier ? identifier + 1 : Task.NEXT_INDEX
    }

    // constructor(title, description, category = ROOT_CATEGORY)
    // {
    //     this.identifier = Task.NEXT_INDEX ++
    //     this.title = title
    //     this.description = description
    //     this.category = category
    //     this.tasks = []

    //     this.componentHolder = Architect.div()
    //         .withClasses(`grid rui0 p5 g5`)
    //         .end()
    // }

    withConsumer(consumer)
    {
        this.taskConsumer = consumer
        return this
    }

    static NEXT_INDEX = 0

    title
    description
    identifier
    category

    wrapper
    componentHolder
    tasks

    taskConsumer

    addComponent(component)
    {
        this.tasks.push(component.withConsumer(this.removeComponent))
    }

    removeComponent(component)
    {
        this.tasks = this.tasks.filter(value => 
            {
                return value != component
            })

        checkedRemove(this.componentHolder, component.displayMargin())
    }

    displayMargin()
    {
        if (this.wrapper) return this.wrapper

        // Horizontal bar with title, selection, and options
        var generic = Architect.div()
            .withClasses(`label-height task-generic grid g5`)
            .end()
        
        // Task display wrapper
        this.wrapper = Architect.div()
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

        this.tasks.forEach(task => this.componentHolder.appendChild(task.displayMargin()))

        // Task hide button
        var hide = new ImageButton('close_task', 'close_task_hovered')
            .withAction(selected => 
            {
                if (this.taskConsumer != null) this.taskConsumer(this)
            })
            .end()

        // Task information expand button
        var expand = new ImageButton('expand', 'expand_hovered')
            .withSelection('expand_selected', 'expand_selected_hovered')
            .withAction((selected) => 
                {
                    if (selected)
                    {
                        this.wrapper.appendChild(descArea)
                        if (0 < this.tasks.length) this.wrapper.appendChild(this.componentHolder)
                    }

                    else
                    {
                        checkedRemove(this.wrapper, this.componentHolder)
                        checkedRemove(this.wrapper, descArea)
                    }
                })
            .end()

        generic.appendChild(completed)
        generic.appendChild(label)
        generic.appendChild(expand)
        generic.appendChild(hide)

        return this.wrapper
    }

    exportJson()
    {
        console.log(`Exporting task json 'ID=${this.identifier}'`)

        tsExport(this.asJson())
    }

    asJson()
    {
        var jsonData = {
            "identifier": this.identifier,
            "title": this.title,
            "description": this.description,
            "components": []
        }

        this.tasks.forEach(task => jsonData.components.push(task.asJson()))

        return jsonData
    }

    asSimpleJson()
    {
        return {
            'identifier': this.identifier,
            'title': this.title
        }
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
            .withClasses(`hoverable grid rui1 p5 g5 posrel`)
            .withChildren(next._ltitle, next.title, next._ldescription, next.description)
            .end()

        return next
    }

    container

    _ltitle
    _ldescription

    title
    description

    asTask()
    {
        var task = new Task(this.title.value, this.description.value)
        return task
    }
}