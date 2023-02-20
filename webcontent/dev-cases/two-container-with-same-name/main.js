async function loadData() {
    await find("d-form").first().value({
        type: "type-b",
        data : {
            value : "b"
        }
    });
}