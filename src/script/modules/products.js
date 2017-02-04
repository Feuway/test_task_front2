var URL = 'bin/products.json';
var container = document.querySelector('.catalog');

var template = document.querySelector('#template-product');
var templateContainer = 'content' in template ? template.content : template;

var PAGE_SIZE = 5;
var pageNumber = 0;

function renderProduct(products, page) {
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    products.slice(from, to).forEach(function(product) {
        container.appendChild(new Product(product).element);
    });
}

var isBottomReached = function() {
    var footerElement = document.querySelector('footer');
    var footerPosition = footerElement.getBoundingClientRect();

    return footerPosition.top - window.innerHeight - 100 <= 0;
};

window.addEventListener('scroll', function() {
    if (isBottomReached()) {
        pageNumber++;
        loadProducts(URL, renderProduct, pageNumber);
    }
});

loadProducts(URL, renderProduct, pageNumber);