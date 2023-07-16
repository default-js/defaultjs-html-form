async function loadData(){
    await find("d-form").first().value({
        test: {
            field:"value"
        }
    });

    console.log("data loaded");
};