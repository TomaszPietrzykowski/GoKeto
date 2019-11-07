// Check storage and define variables:
let memory;
let defaultProducts = [];
let defaultMeals = [];
const memoryLs = JSON.parse(localStorage.getItem('goketo'));
if(memoryLs === null){
    memory = [defaultProducts, defaultMeals];
}else{memory = memoryLs};
let products = memory[0];
let meals = memory[1];

let userKcal = 2000;
let userProtein = 120;
let userCarbs = 50;
let userUnit = "pln";


// Define UI variables -- Add Product

const productNameInput = document.querySelector('.product-name-input');
const productCatInput = document.querySelector('.categories-input');
const productKcalInput = document.querySelector('.kcal-input');
const productProteinInput = document.querySelector('.protein-input');
const productFatInput = document.querySelector('.fat-input');
const productCarbsInput = document.querySelector('.carbs-input');
const productPriceInput = document.querySelector('.price-input');
const productList = document.querySelector('.product-list');
const addProductsBtn = document.querySelector('.add-product');
const errMsg = document.querySelector('.errormsg');
const cancelAddProductBtn = document.querySelector('.cancel-add-prod');
const cancelAddProductBtn2 = document.querySelector('.cancel-add-prod2');
const loadDefaultProduct = document.querySelector('.load-default-products');
const loadDefaultProduct2 = document.querySelector('.load-default-products2');

// Define UI variables -- List of Products
const addProductTabBtn = document.querySelector('.open-add-tab');
const clearProductsBtn = document.querySelector('.product-list-clear');
const filterProduct = document.querySelector('.filter-input');
const clearFilter = document.querySelector('.clear-filter');

// Define UI variables -- Show Product

const productNameInfo = document.querySelector('.dproduct-name');
const productWeightInput = document.querySelector('.pcalc-input');
const weightInfo = document.querySelector('.weight-info');
const kcalInfo = document.querySelector('.kcal-info');
const proteinInfo = document.querySelector('.protein-info');
const fatInfo = document.querySelector('.fat-info');
const carbsInfo = document.querySelector('.carbs-info');
const priceInfo = document.querySelector('.price-info');
const kcalPercentInfo = document.querySelector('.kcal-percent-info');
const proteinPercentInfo = document.querySelector('.protein-percent-info');
const fatPercentInfo = document.querySelector('.fat-percent-info');
const carbsPercentInfo = document.querySelector('.carbs-percent-info');
const priceUnit = document.querySelector('.price-unit');
let displayedProduct;

// Render List of Products

renderProductsList();


// Listen for events:

addProductsBtn.addEventListener('submit', addNewProduct);
clearProductsBtn.addEventListener('mousedown', clearProductsList);
filterProduct.addEventListener('keyup', filterProducts);
clearFilter.addEventListener('mousedown', clearFilters);
productList.addEventListener('mousedown', sendProductToDisplay);
productWeightInput.addEventListener('keyup', calcProduct);
addProductTabBtn.addEventListener('click', showAddProductTab);
cancelAddProductBtn.addEventListener('click', hideAddProductTab);
cancelAddProductBtn2.addEventListener('click', hideAddProductTab);
loadDefaultProduct.addEventListener('click', loadProducts);
loadDefaultProduct2.addEventListener('click', loadProducts);
document.querySelector('.product-list-close').addEventListener('click', hideCalcProductTab);

// new Product constructor function:

function Product(name, cat, kcal, protein, fat, carbs, price){
    this.name = name;
    this.cat = cat;
    this.kcal = kcal;
    this.protein = protein;
    this.fat = fat;
    this.carbs = carbs;
    this.price = price;
    products.push(this);
    const memoryUpdate = [products, meals];
    localStorage.setItem('goketo', JSON.stringify(memoryUpdate));
}

// Add New Product function - form validation, error handling, constructor call

function addNewProduct(e){
    if(productNameInput.value === ''){
    showError('name your product...', 'red'); 
    }else{
    if(productCatInput.value === 'nochoice'){
    showError('select category...', 'red'); 
    }else{ 
    if(productKcalInput.value === ''){
    showError('enter kcal per 100g', 'red');
    }else{
    if(productProteinInput.value === ''){
        showError('enter protein per 100g...', 'red');
    }else{
    if(productFatInput.value === ''){
        showError('enter fat per 100g...', 'red');
    }else{
    if(productCarbsInput.value === ''){
        showError('enter carbs per 100g...', 'red');
    }else{
    if(productPriceInput.value === ''){
        showError('enter price per 1kg...', 'red');
    }else{
    new Product(productNameInput.value, productCatInput.value, productKcalInput.value, productProteinInput.value, productFatInput.value, productCarbsInput.value, productPriceInput.value);
    productNameInput.value = '';
    productCatInput.value = 'nochoice';
    productKcalInput.value = '';
    productProteinInput.value = '';
    productFatInput.value = '';
    productCarbsInput.value = '';
    productPriceInput.value = '';
    renderProductsList();
    hideAddProductTab();
}}}}}}}
e.preventDefault();
}

// Render / refresh product list function
function renderProductsList(){
    while(productList.firstChild){
        productList.firstChild.remove();
    }
    let newProducts;
    JSON.parse(localStorage.getItem('goketo')) === null ? newProducts = [] : newProducts = JSON.parse(localStorage.getItem('goketo'))[0];
    newProducts.forEach(function(product){
        let item = document.createElement('li');
        item.className = "list-group-item list-group-item-action";
        item.setAttribute('id', `${product.name}`);
        item.innerHTML = `<strong class="product-name">${product.name}</strong><span class="float-right d-none d-lg-block">kcal: ${product.kcal} |  B: ${product.protein} |  T: ${product.fat} |  W: ${product.carbs}</span>`;
        productList.appendChild(item);
    });
}

function clearProductsList(e){
    if(confirm('Usunac wszystkie produkty z lisy?')){
    products = [];
    const clearProducts = [products, meals];
    localStorage.setItem('goketo', JSON.stringify(clearProducts));
    renderProductsList();
}
e.preventDefault();
}

// Error function

function showError(text, color){
    errMsg.style.color =color;
    errMsg.style.diplay = 'block';
    errMsg.innerHTML = `<strong>${text}</strong>`;
    setTimeout(hideError, 3000);
}

function hideError(){
    errMsg.innerHTML = '';
}

//  Filter Products

function filterProducts(e){
    // first take over the insertet value
    // have to pass event so that it executes on each key up
    //toLowerCase for comparison
    const text = e.target.value.toLowerCase();

    // grabbing all tasks
    document.querySelectorAll('.list-group-item-action').forEach(function(product){
        const item = product.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            product.style.display = 'block';
        }else{
            product.style.display = 'none';
        }
    });
}

// Function Clear filter input

function clearFilters(){
    filterProduct.value = '';
    renderProductsList();
}

// sending product token from product list to display function 

function sendProductToDisplay(e){
    let searchName;
    e.target.id === '' ? searchName = e.target.parentElement.id : searchName = e.target.id
    displayedProduct = products.filter(prod => prod.name === searchName)[0];
    productWeightInput.value = "";
    displayProduct(displayedProduct, 100);
}

function displayProduct(displayedProduct, weight){
    hideAddProductTab();
    showCalcProductTab();
    productNameInfo.innerText = `${displayedProduct.name.toUpperCase()}`; 
    weightInfo.innerText = `${weight}g`;
    kcalInfo.innerText = `${displayedProduct.kcal*weight/100}kcal`;
    proteinInfo.innerText = `${displayedProduct.protein*weight/100}g`;
    fatInfo.innerText = `${displayedProduct.fat*weight/100}g`;
    carbsInfo.innerText = `${displayedProduct.carbs*weight/100}g`;
    kcalPercentInfo.innerText = `${parseInt(displayedProduct.kcal*weight/userKcal)}%`;
    proteinPercentInfo.innerText = `${parseInt(displayedProduct.protein*weight/userProtein)}%`;
    fatPercentInfo.innerText = `n/a`;
    carbsPercentInfo.innerText = `${parseInt(displayedProduct.carbs/userCarbs*100)}%`;
    let value = displayedProduct.price*weight/100;
    priceInfo.innerText = `${value}`;
    priceUnit.innerText = `${userUnit}`;

}

function calcProduct(){
    let calcWeight;
    productWeightInput.value === "" ? calcWeight = 100 : calcWeight = parseInt(productWeightInput.value);
    displayProduct(displayedProduct, calcWeight);
}


function loadProducts(e){
    if(confirm('Load basic products from internet?')){
        window.alert('...soon...')
    }
    e.preventDefault();
}


function showAddProductTab(){
    document.querySelector('.prod-add-tab').className = "col-lg-6 mx-auto prod-add-tab d-block";
    hideCalcProductTab();
    window.scrollTo(0, 0);
}

function hideAddProductTab(){
    document.querySelector('.prod-add-tab').className = "col-lg-6 mx-auto prod-add-tab d-none";
}

function showCalcProductTab(){
    document.querySelector('.prod-calc-tab').className = "col-lg-6 mx-auto prod-calc-tab d-block";
    window.scrollTo(0, 0);
}

function hideCalcProductTab(){
    document.querySelector('.prod-calc-tab').className = "col-lg-6 mx-auto prod-calc-tab d-none";
}
