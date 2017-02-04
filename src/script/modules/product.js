
function getProducts(product) {
    var productElement = templateContainer.querySelector('.item').cloneNode(true);
    var codeProduct = productElement.querySelector('#code');
    codeProduct.textContent = product.code.slice(5);

    productElement.querySelector('.item__title').textContent = product.title;

    var IMAGE_SIZE = 220;
    var pictureProduct = new Image(IMAGE_SIZE, IMAGE_SIZE);

    var TIMEOUT;
    var IMAGE_LOAD_TIMEOUT = 10;

    var itemImgWrap = productElement.querySelector('.item__img-link');

    pictureProduct.onload = function() {
        itemImgWrap.replaceChild(pictureProduct, itemImgWrap.querySelector('img'));
        clearTimeout(TIMEOUT);
    };

    pictureProduct.onerror = function() {
        productElement.classList.add('load-failure');
    };

    TIMEOUT = setTimeout(function() {
        productElement.classList.add('load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    pictureProduct.src = product.primaryImageUrl;


    //= links.js
    renderLinks(product.assocProducts);

    var buttonProduct = productElement.querySelector('.item__price-btn');
    buttonProduct.setAttribute('data-product-id', product.productId);

    var productUnit = productElement.querySelector('.item__price-info-item');
    productUnit.textContent = product.unitRatio + ' ' + product.unit + ' = ' + '??? ' + product.unitAlt;


    return productElement;
};

function Product(data) {
    var self = this;

    this.data = data;
    this.element = getProducts(data);

    this.labelSqrMeter = this.element.querySelector('.item__price-select-label--sqr-meter');
    this.labelPackage = this.element.querySelector('.item__price-select-label--package');

    this.labelSqrMeter.addEventListener('click', this.onLabelClick.bind(this));
    this.labelPackage.addEventListener('click', this.onLabelClick.bind(this));

    this.productPriceClub = this.element.querySelector('.item__price-number--club');
    this.productPriceDefault = this.element.querySelector('.item__price-number--default');
    
    this.pricePoints = this.element.querySelector('#price-points');
    
    this.stepperInput = this.element.querySelector('.stepper__input');
    this.btnUp = this.element.querySelector('.stepper__btn--up');
    this.btnDown = this.element.querySelector('.stepper__btn--down');

    this.btnUp.addEventListener('click', this.onClickArrowUp.bind(this));
    this.btnDown.addEventListener('click', this.onClickArrowDown.bind(this));
    this.stepperInput.addEventListener('input', this.onChangeInput.bind(this));


    this.changePrice(this.stepperInput.value);
}

Product.prototype.onLabelClick = function() {
    this.labelSqrMeter.classList.toggle('item__price-select-label--active');
    this.labelPackage.classList.toggle('item__price-select-label--active');
    this.changePrice(this.stepperInput.value);
};

Product.prototype.changePrice = function(value) {
    if (this.labelSqrMeter.classList.contains('item__price-select-label--active')) {
        this.productPriceClub.textContent = (value * this.data.priceGoldAlt).toFixed(2);
        this.productPriceDefault.textContent = (value * this.data.priceRetailAlt).toFixed(2);
    }

    if (this.labelPackage.classList.contains('item__price-select-label--active')) {
        this.productPriceClub.textContent = (value * this.data.priceGold).toFixed(2);
        this.productPriceDefault.textContent = (value * this.data.priceRetail).toFixed(2);
    }

    this.pricePoints.textContent = (this.productPriceClub.textContent * .5).toFixed(2);
};

Product.prototype.onClickArrowUp = function() {
    this.stepperInput.value++;
    this.changePrice(this.stepperInput.value);
};

Product.prototype.onClickArrowDown = function() {
    this.stepperInput.value--;
    if (this.stepperInput.value < 1) this.stepperInput.value = 1;
    this.changePrice(this.stepperInput.value);
};

Product.prototype.onChangeInput = function() {
    this.valueInput = this.stepperInput.value;
    this.changePrice(this.valueInput);
};