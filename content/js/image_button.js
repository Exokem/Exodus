
function iconSrc(icon)
{
    return `icon/${icon}.png`
}

class ImageButton
{
    static default(name_base, name_hovered)
    {
        return new ImageButton(name_base, name_hovered)
    }

    src_disabled
    src_base
    src_hovered
    src_selected
    src_selected_hovered

    img_disabled
    img_base
    img_hovered

    container

    allow_select
    selected

    allow_disable
    disabled

    constructor(name_base, name_hovered)
    {
        this.src_base = iconSrc(name_base)
        this.src_hovered = iconSrc(name_hovered)

        this.img_base = document.createElement('img')
        this.img_base.src = this.src_base

        this.img_hovered = document.createElement('img')
        this.img_hovered.src = this.src_hovered
        this.img_hovered.classList.add('ib-hov')

        this.container = document.createElement('div')
        this.container.classList.add('image-button')
        this.container.appendChild(this.img_base)
        this.container.appendChild(this.img_hovered)
        this.container.style['max-width'] = this.img_base.style['width']

        this.allow_select = this.allow_disable = false
        this.selected = this.disabled = false
    }

    withSelection(name_selected, name_selected_hovered)
    {
        this.allow_select = true

        this.src_selected = iconSrc(name_selected)
        this.src_selected_hovered = iconSrc(name_selected_hovered)

        return this.withAction(this.switchSelect.bind(this))
    }

    withDisable(name_disabled)
    {
        this.allow_disable = true

        this.src_disabled = iconSrc(name_disabled)
        this.img_disabled = document.createElement('img')
        this.img_disabled.src = this.src_disabled
        this.img_disabled.style.opacity = 0

        this.container.appendChild(this.img_disabled)

        return this
    }

    withAction(action)
    {
        this.img_hovered.addEventListener('click', (event) => action(this.selected))
        
        return this
    }

    end()
    {
        return this.container
    }

    switchSelect()
    {
        if (this && this.allow_select)
        {
            this.selected = !this.selected

            this.img_base.src = this.selected ? this.src_selected : this.src_base
            this.img_hovered.src = this.selected ? this.src_selected_hovered : this.src_hovered
        }
    }

    switchDisable(value = !this.disabled)
    {
        if (this && this.allow_disable)
        {
            this.disabled = value

            this.img_disabled.style.display = this.disabled ? 'none' : 'auto';
        }
    }
}