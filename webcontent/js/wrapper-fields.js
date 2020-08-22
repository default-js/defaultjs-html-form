function loadData(){

    const form = document.querySelector("d-form");
    form.data = {
        textinput: "textinput",
        textarea: "textarea",
        singleCheckbox: true,
        multiCheckbox : ["value-2", "value-3"],
        radioinput: "value-2"
    };
}