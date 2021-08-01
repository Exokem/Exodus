
class Architect
{
    static div()
    {
        return new Architect('div')
    }

    static start(type)
    {
        return new Architect(type)
    }

    constructor(type)
    {
        this.element = document.createElement(type)
    }

    element

    withClasses(selectors)
    {
        var set = selectors.split(' ')
        set.forEach(selector => this.element.classList.add(selector))

        return this
    }

    withChildren(...children)
    {
        children.forEach(child => this.element.appendChild(child))

        return this
    }

    withHTML(html)
    {
        this.element.innerHTML = html

        return this
    }

    end()
    {
        return this.element
    }
}