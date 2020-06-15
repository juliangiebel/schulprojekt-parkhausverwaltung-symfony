function bindElement(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`No match for selector: ${selector}`);

    let binding = setget.bind({element: element});
    binding.element = element;

    return binding;
}

function setget(value) {
    if(!!value) {
        this.element.textContent = value;
    }

    return this.element.textContent;
}

export {bindElement}