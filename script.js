let carrito = [];

function calcularCotizacion() {
    const form = document.getElementById("cotizacion-form");
    const color = form.elements.color.value;
    const papel = form.elements.papel.value;
    const medida = form.elements.medida.value;
    const cantidad = form.elements.cantidad.value;
    const corte = form.elements.corte.value;

    let valorImpresion = 0;
    let valorPapel = 0;

    if (medida === "A4") {
        valorImpresion = 50;
    } else if (medida === "A3") {
        valorImpresion = 100;
    } else if (medida === "SuperA3") {
        valorImpresion = 110;
    }

    if (color === "Doble Faz") {
        valorImpresion *= 2;
    }

    if (medida === "A4") {
        valorPapel = calcularValorPapel(papel) / 2;
    } else if (medida === "SuperA3") {
        valorPapel = calcularValorPapel(papel) + 20;
    } else {
        valorPapel = calcularValorPapel(papel);
    }

    let costoTotal = (valorImpresion + valorPapel) * cantidad;


    const cotizacion = {
        color,
        papel,
        medida,
        cantidad: parseInt(cantidad),
        corte,
        costo: costoTotal
    };

    carrito.push(cotizacion);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    form.reset();

    actualizarCarrito();
}

function calcularValorPapel(papel) {
    switch (papel) {
        case "Obra":
            return 50;
        case "115g":
            return 60;
        case "150g":
            return 70;
        case "200g":
            return 80;
        case "300g":
            return 90;
        default:
            return 0;
    }
}

function actualizarCarrito() {
    const carritoList = document.getElementById("carrito-list");
    carritoList.innerHTML = '';

    let totalPedidos = 0;

    carrito.forEach((cotizacion, index) => {
        const cotizacionElement = document.createElement("div");
        cotizacionElement.innerHTML = `<p><strong>Cotización ${index + 1}:</strong> Color = ${cotizacion.color}, Papel = ${cotizacion.papel}, Medida = ${cotizacion.medida}, Cantidad = ${cotizacion.cantidad}, Corte - ${cotizacion.corte}, Costo = $${cotizacion.costo.toFixed(2)}</p>`;

        const eliminarButton = document.createElement("button");
        eliminarButton.innerText = "Eliminar";
        eliminarButton.addEventListener("click", function () {
            eliminarCotizacion(index);
        });

        cotizacionElement.appendChild(eliminarButton);

        carritoList.appendChild(cotizacionElement);

        totalPedidos += cotizacion.costo;
    });

    const totalAmountElement = document.getElementById("total-amount");
    totalAmountElement.innerText = totalAmount.toFixed(2);
}

function eliminarCotizacion(index) {
    if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function realizarPedido() {
    document.getElementById("pedido").innerHTML = `<p><strong> Pedido realizado. Gracias por su compra.</p>`;
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

window.addEventListener('load', function () {
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage) {
        carrito = JSON.parse(carritoStorage);
        actualizarCarrito();
    } else {
        carrito = []; 
    }
});
