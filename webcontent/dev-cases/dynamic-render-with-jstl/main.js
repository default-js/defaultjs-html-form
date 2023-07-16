(async () => {
    await import ("/browser-defaultjs-html-form.js");
    await import ("./browser-defaultjs-html-renderer.min.js");

    const loadData = async () => {
        await find("d-form").first().value({
            type: "type-b",
            data : {
                value : "b"
            }
        });
    };
    window.loadData = loadData;
    
})();


