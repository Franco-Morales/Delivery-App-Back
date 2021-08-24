import ArticuloInsumo from "../models/articuloInsumo.model";
import ArticuloManufacturado from "../models/ArticuloManufacturado.model";

/**
 * Resta los articulos insumo de cada pedido, el pedido debe estar previamente validado.
 * Para validar prefiera @function preValidate()
 * @param {*} pedido 
 */
const restarStock = async (pedido) => {
    // console.log('Restando Stock');
    for (const detPedido of pedido.DetallePedido) {
        if (detPedido.ArtManufact) {
            await artManufactStock(detPedido.cantidad, detPedido.ArtManufact._id);
        }
        if(detPedido.ArticuloInsumo) {
            await artInsumoStock(detPedido.cantidad, detPedido.ArticuloInsumo);
        }
    }
}

/**
 * Función propia del inventario para controlar el stock de los articulos manufactuardos.
 * No exportable.
 * @param {number} cantidadPedido Cantidad a descontar del insumo
 * @param {*} artManufact 
 */
let artManufactStock = async (cantidadPedido, artManufactId) => {
    // Todos los articulos insumos de un Articulo Manufactarado en específico
    let artInsumoArray = [];

    try {
        let artManufactAux = await ArticuloManufacturado.findById(artManufactId);

        artManufactAux.ArtManufactDet.forEach( artIns => {
            let auxArtIns = { _id:"", cantidad: 0 };
            auxArtIns.cantidad = artIns.cantidad*cantidadPedido;
            auxArtIns._id = artIns.ArtInsumo;
            artInsumoArray.push(auxArtIns);
        });

        for (const el of artInsumoArray) {
            let artInsumoAux = await ArticuloInsumo.findOne({ _id: el._id });

            artInsumoAux.stockActual = artInsumoAux.stockActual-el.cantidad;
            artInsumoAux.updateStock();
            await artInsumoAux.save();
        }

        ArticuloManufacturado.stockValidation(artManufactId);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función propia del inventario para controlar el stock de los articulos insumo.
 * No exportable.
 * @param {number} cantidadPedido 
 * @param {*} artIns
 */
let artInsumoStock = async (cantidadPedido, artIns) => {
    let artInsumoAux = await ArticuloInsumo.findById(artIns);

    artInsumoAux.stockActual = artInsumoAux.stockActual-cantidadPedido
    artInsumoAux.stockValidation();
    artInsumoAux.save();
};

/**
 * Prevalida si el pedido puede realizarse con exito y que ningun artInsumo este por debajo del stock minimo.
 * @param {*} pedido Pedido a validar
 * @returns object
 */
const preValidate = async (pedido) => {
    // console.log("prevalidando")
    //Art Insumos, Art Manufacturados, status general del pedido
    let stock = { artInsumos:[], artManufacts: [], status: true};
    //Arreglo auxliar de Art. Manufacturados
    let auxArrayArtManufact = [];
    //Arreglo auxliar de Art. Insumo.esInsumo == false
    let auxArrayArtInsumo = [];

    for (const detPedido of pedido.DetallePedido) {
        if (detPedido.ArtManufact) {
            let aux = { cant: detPedido.cantidad, id: detPedido.ArtManufact._id };
            auxArrayArtManufact.push(aux);
        }

        if(detPedido.ArticuloInsumo) {
            let aux = { cant: detPedido.cantidad, id: detPedido.ArticuloInsumo };
            auxArrayArtInsumo.push(aux);
        }
    }
    let artManuStatus = await artManufactStockValidate(auxArrayArtManufact);
    let artInsumoStatus = await artInsumoStockValidate(auxArrayArtInsumo);

    stock.artManufacts = [...artManuStatus];
    stock.artInsumos = [...artInsumoStatus];
    stock.status = validateStockState(stock);

    return stock;
}

/**
 * Función propia del invetario, uso exclusivo de @function preValidate .
 * Retorna un objeto con el id del artInsumo y un estado de stock, que prevalida el pedido actual.
 * Si stockStatus es true, se puede descontar del inventario, caso contrario stockActual será falso.
 * No exportable.
 * @param {number} cantidadPedido 
 * @param {*} articuloInsumo 
 * @returns
 */
let artInsumoStockValidate = async (artInsumos) => {
    let stockStatusArray = [];

    try {
        for (const element of artInsumos) {
            let aux = { _id: element._id, stockStatus: true };

            let artInsumoAux = await ArticuloInsumo.findById(element.id);
            artInsumoAux.stockActual = artInsumoAux.stockActual - element.cantidad;
            
            if (!artInsumoAux.stockValidation()) {
                aux.stockStatus = false;
                stockStatusArray.push(aux);
                continue;
            } 
            stockStatusArray.push(aux);
        }

        return stockStatusArray;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función propia del invetario, uso exclusivo de @function preValidate .
 * Retorna un objeto con el id del artManufactirado y un estado de stock, que prevalida el pedido actual.
 * Si stockStatus es true, se puede descontar del inventario, caso contrario stockActual será falso.
 * No exportable.
 * @param {any} artManufacts 
 * @returns Array
 */
let artManufactStockValidate = async (artManufacts) => {
    let stockStatusArray = [];
    //Referencia para restar y comprobar valores 
    let refArtInsumos = [];

    let artManufactArray = [];

    try {
        for (const elem of artManufacts) {
            let obj = { cant: elem.cant, artManu: {} };
            obj.artManu = await ArticuloManufacturado.findById(elem.id);

            artManufactArray.push(obj);
        }
    } catch (error) {
        console.error(`Module : Inventario : preValidate -> artManufactStockValidate -> findbyId : Error : ${error}`);
    }
    /*          */
    try {
        for (let objPedido of artManufactArray) {
            let artManufactStatus = { _id: objPedido.artManu._id, stockStatus: true };

            for (let artInsumo of objPedido.artManu.ArtManufactDet) {

                let ref = refArtInsumos.find( element => element._id.toString() == artInsumo.ArtInsumo.toString() );
                if( ref ) {
                    if(ref.stockActual > ref.stockMinimo) {
                        ref.stockActual = ref.stockActual - (objPedido.cant*artInsumo.cantidad);

                        if((ref.stockActual > ref.stockMinimo)){
                            let index = refArtInsumos.findIndex( element => element._id.toString() == artInsumo.ArtInsumo.toString() );
                            refArtInsumos[index] = ref;
                        } else {
                            break;
                        }

                    } else {
                        artManufactStatus.stockStatus = false;
                        break;
                    }
                } else {
                    let artInsumoAux = await ArticuloInsumo.findById(artInsumo.ArtInsumo);

                    artInsumoAux.stockActual = artInsumoAux.stockActual - ( objPedido.cant*artInsumo.cantidad );
                    if (artInsumoAux.stockValidation()) {
                        refArtInsumos.push(artInsumoAux);
                    } else {
                        artManufactStatus.stockStatus = false;
                        break;
                    }
                }
            }
            stockStatusArray.push(artManufactStatus);
        }
    } catch (error) {
        console.error(`Module : Inventario : preValidate() -> artManufactStockValidate() : Error : ${error}`);
    }

    return stockStatusArray;
}

/**
 * Función propia del invetario, uso exclusivo de @function preValidate .
 * Actualiza el estado del stock.
 * No exportable.
 * @param {object} stock 
 * @returns boolean
 */
let validateStockState = (stock) => {
    let arrayStatus = [];

    if(stock.artInsumos) arrayStatus = [...stock.artInsumos];
    if(stock.artManufacts) arrayStatus = [...stock.artManufacts];

    let aux = arrayStatus.every( status => status.stockStatus );
    return aux;
}


const calcularCostos = async (DetallePedido) => {
    let totalCosto = 0;
    let totalVenta = 0;

    try {
        for (const detPedido of DetallePedido) {
            if(detPedido.ArtManufact) {
                let artManuAux = await ArticuloManufacturado.findById(detPedido.ArtManufact);

                for (const artIns of artManuAux.ArtManufactDet) {
                    let artInsumoAux = await ArticuloInsumo.findById(artIns.ArtInsumo);
                    totalCosto = totalCosto + (artInsumoAux.precioCompra*detPedido.cantidad);
                    totalVenta = totalVenta + (artInsumoAux.precioVenta*detPedido.cantidad);
                }
            }
            if(detPedido.ArticuloInsumo) {
                let artInsumoAux = await ArticuloInsumo.findById(detPedido.ArticuloInsumo);
                totalCosto = totalCosto + (artInsumoAux.precioCompra*detPedido.cantidad);
                totalVenta = totalVenta + (artInsumoAux.precioVenta*detPedido.cantidad);
            }
        }

        return { totalCosto, totalVenta };
    } catch (error) {
        console.error(`Module : Inventario : calcularCostos() : Error : ${error}`);
    }
}

/**
 * Módulo Inventario
 */
const Inventario = { restarStock, preValidate, calcularCostos };

export default Inventario;