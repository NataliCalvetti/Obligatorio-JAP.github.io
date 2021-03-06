let article = {};
let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPremium = 0.15;
let shippingExpress = 0.07;
let shippingStandard = 0.05;
const shippingType = {
    premium: "Premium (2-5 días) - Costo del 15% sobre el subtotal.",
    express: "Express (5-8 días) - Costo del 7% sobre el subtotal.",
    standard:"Standard (12 a 15 días) - Costo del 5% sobre el subtotal."   
}
let total = 0;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let totalCost = 0;
let cantidadAComprar = 0;
let costoDeEnvio = 0;
let closeX = document.getElementById('closeX');





//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(value, tipo){
    if(tipo === 'cantidad') {
        totalCost = article.unitCost * parseInt(value, 10);
        cantidadAComprar = value;
    } 
    if(tipo === 'envio'){
        if(value === shippingType.premium){
            costoDeEnvio = totalCost * shippingPremium;
        }
        if(value === shippingType.express){
            costoDeEnvio = totalCost * shippingExpress;
        }
        if(value === shippingType.standard){
            costoDeEnvio = totalCost * shippingStandard;
        }    
        updateSubtotal();
        paymentInformation();
    }
}

function updateSubtotal(){
    subtotal = totalCost;
}

function showPaymentTab(){
    document.querySelector('.zIndex').style.display = 'block';
}

function hidePaymentTab(){
        document.querySelector('.zIndex').style.display = 'none';   
}

function showArticles(articles){
    const htmlContentToAppend = `
    <div class="container mt-5">
        <div class="text-center p-4">
            <h2>Mi carrito</h2>
            <p class="lead">Información del artículo</p>
        </div>
        <h3>${articles.name}</h3>
        <hr class="my-3">
        <dl>
            <dt>Cantidad disponible</dt>
            <dd><p>${articles.count}</p></dd>

            <dt>Costo unitario</dt>
            <dd><p class="inline">${articles.currency} $ ${articles.unitCost}</p></dd>
            <div>
            <img class="img-fluid img-thumbnail pt-2 col-lg-3 col-md-3" src="${articles.src}">
            </dl>
            </div>   
    </div>
    <div>
            <dt>Cantidad a comprar</dt>
            <dd><input class="form-control myBlock" type="number" min="0" max="${articles.count}"placeholder="Cantidad" onchange="updateTotalCosts(this.value, 'cantidad')"></dd>
          </div>
        ` ;
        document.getElementById("showCartArticles").innerHTML = htmlContentToAppend;
    
}

function paymentInformation(){
    const htmlContentToAppend = `
    <div>
    <dl>
    <dt>Cantidad a comprar</dt>
            <dd><p>${cantidadAComprar}</p></dd>
    <dt>Subtotal</dt>
            <dd><p>${subtotal}</p></dd>
    <dt>Costo de envio</dt>
            <dd><p>${costoDeEnvio}</p></dd>
    <dt>Total a pagar</dt>
            <dd><p>${totalCost + costoDeEnvio}</p></dd>
    </dl>
    </div>
    `;
    document.getElementById("paymentInfo").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            article = resultObj.data.data.articles[0];
            showArticles(article);
        }
        console.log(resultObj);
    });
});