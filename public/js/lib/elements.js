function bindElement(selector) {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`No match for selector: ${selector}`);

    let binding = setget.bind({element: element});
    binding.attribute = setgetAttributes.bind({element: element});
    binding.element = element;

    return binding;
}
/**
 * Always returns the contents of the bound element.
 * Sets the elements content to value, if given.
 *
 * @param {string} value
 * @returns Element content
 */
function setget(value) {
    if (!!value) {
        this.element.textContent = value;
    }

    return this.element.textContent;
}
/**
 * Always returns the value of the attribute with the given name.
 * Removes the attribute when value is set to null
 *
 * @param {*} name The attribute name
 * @param {*} value The value to be set or null
 * @returns The attributes value
 */
function setgetAttributes(name, value) {
    if (value === null) {
        this.element.removeAttribute(name);
        return;
    }

    if (!!value) {
        this.element.setAttribute(name, value);
    }

    return this.element.getAttribute(name);
}

export {bindElement}