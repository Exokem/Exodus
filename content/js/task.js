

const TASK_DIR = '../data/task/'

class Category 
{
    title
    description
}

class Task 
{
    static NEXT_INDEX = 0

    title
    description
    identifier
    category

    constructor(title, description)
    {
        this.identifier = Task.NEXT_INDEX ++
        this.title = title
        this.description = description
    }

    exportJson()
    {
        var jsonData = {
            "identifier": this.identifier,
            "title": this.title,
            "description": this.description
        }

        tsExport(jsonData)
    }
}