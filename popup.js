chrome.storage.local.get("overtime", function(data) {
    document.getElementById('overtime').innerHTML = data.overtime;
});