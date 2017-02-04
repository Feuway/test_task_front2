function renderLinks(links) {
    var containerLinks = productElement.querySelector('.item__tags');

    var arr = links.split(';\n');
    if (arr[arr.length - 1].slice(-1) == ';') arr[arr.length - 1] = arr[arr.length - 1].slice(0, -1);
    if (arr.length == 1) arr = arr[0].split('; ');

    arr = arr.filter(function(elem) {
        return elem.length > 0;
    });

    arr.forEach(function(elem, i, arr) {
        elem += arr[i] === arr[arr.length - 1] ? '.' : ', ';

        var link = document.createElement('a');
        link.href = '#';
        link.classList.add('item__tags-links');
        link.textContent = elem;

        containerLinks.appendChild(link);
    });
}