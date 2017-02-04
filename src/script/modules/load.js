function loadProducts(url, callback, page) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(evt) {
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData, page);
    };

    xhr.open('GET', url, true);
    xhr.send();
}