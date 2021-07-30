
// const fs = require('fs')

const TASK_DIR = '../data/task/'

class Task 
{
    static NEXT_INDEX = 0;

    title;
    description;
    identifier;

    constructor(title, description)
    {
        this.title = title;
        this.description = description;
        this.identifier = Task.NEXT_INDEX ++;
    }

    exportPath()
    {
        return `task-${this.identifier}-${this.title}.extsk`
    }

    exportJson()
    {
        return {
            "identifier": this.identifier,
            "title": this.title,
            "description": this.description
        }
    }
}