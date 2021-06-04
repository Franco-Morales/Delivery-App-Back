import ArticuloInsumo from "../models/articuloInsumo.model";
import ArticuloManufacturadoModel from "../models/ArticuloManufacturado.model";

/**
 * Resta los articulos insumo de cada pedido, el pedido debe estar previamente validado.
 * Para validar prefiera @function preValidate()
 * @param {*} pedido 
 */
const restarStock = async (pedido) => {

    for (const detPedido of pedido.DetallePedido) {
        if (detPedido.ArtManufact) {
            await artManufactStock(detPedido.cantidad, detPedido.ArtManufact);
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
let artManufactStock = async (cantidadPedido, artManufact) => {
    // Todos los articulos insumos de un Articulo Manufactarado en específico
    let artsInsumo = [];

    artManufact.ArtManufactDet.forEach( artIns => {
        let auxArtIns = { _id:"", cantidad: 0 };
        auxArtIns.cantidad = artIns.cantidad*cantidadPedido;
        auxArtIns._id = artIns.ArtInsumo;
        artsInsumo.push(auxArtIns);
    });

    for (const el of artsInsumo) {
        let artInsumoAux = await ArticuloInsumo.findOne({ _id: el._id });
        if(artInsumoAux.stockValidation()){
            artInsumoAux.stockActual-=el.cantidad;
            await artInsumoAux.save();
        } 
    }
}

/**
 * Función propia del inventario para controlar el stock de los articulos insumo.
 * No exportable.
 * @param {number} cantidadPedido 
 * @param {*} artIns
 */
let artInsumoStock = async (cantidadPedido, artIns) => {
    if(artIns.stockValidation()) {
        let auxStockActual = artIns.stockActual-cantidadPedido;
        let articuloUpdated = await ArticuloInsumo.findOneAndUpdate({_id: artIns._id},{ $set:{stockActual: auxStockActual} },{ new:true });
        articuloUpdated.stockValidation();
    }
};

/**
 * Prevalida si el pedido puede realizarse con exito y que ningun artInsumo este por debajo del stock minimo.
 * @param {*} pedido Pedido a validar
 * @returns {object}
 */
const preValidate = async (pedido) => {
    let stock = { artInsumo:[], artManufact: [], status: true};

    for (const detPedido of pedido.DetallePedido) {
        if (detPedido.ArtManufact) {
            let artManufactStatus = await artManufactStockValidate(detPedido.cantidad, detPedido.ArtManufact);
            stock.artManufact.push(artManufactStatus);
        }

        if(detPedido.ArticuloInsumo) {
            let artInsumoStatus = await artInsumoStockValidate(detPedido.cantidad, detPedido.ArticuloInsumo);
            stock.artInsumo.push(artInsumoStatus);
        }
    }
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
let artInsumoStockValidate = async (cantidadPedido, articuloInsumo) => {
    let auxObj = { _id: articuloInsumo._id, stockStatus: true };
    try {
        let artInsumoAux = await ArticuloInsumo.findById({_id: articuloInsumo._id});

        artInsumoAux.stockActual-=cantidadPedido;

        auxObj.stockStatus = artInsumoAux.stockValidation();

        return auxObj;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Función propia del invetario, uso exclusivo de @function preValidate .
 * Retorna un objeto con el id del artManufactirado y un estado de stock, que prevalida el pedido actual.
 * Si stockStatus es true, se puede descontar del inventario, caso contrario stockActual será falso.
 * No exportable.
 * @param {number} CantidadPedido 
 * @param {any} ArticuloManufacturadoID
 * @returns 
 */
let artManufactStockValidate = async (cantidadPedido, artmanufactId) => {
    let auxObj = { _id: artmanufactId, stockStatus: true };
    // Todos los articulos insumos de un Articulo Manufactarado en específico
    let artsInsumo = [];

    let articuloManufact = await ArticuloManufacturadoModel.findOne({ _id:artmanufactId});

    articuloManufact.ArtManufactDet.forEach( artIns => {
        let auxArtIns = { _id:"", cantidad: 0 };
        auxArtIns.cantidad = artIns.cantidad*cantidadPedido;
        auxArtIns._id = artIns.ArtInsumo;
        artsInsumo.push(auxArtIns);
    });

    for (const el of artsInsumo) {
        try {
            let artInsumoAux = await ArticuloInsumo.findOne({ _id: el._id });
            artInsumoAux.stockActual-=el.cantidad;
            
            if(!artInsumoAux.stockValidation()) {
                auxObj.stockStatus = artInsumoAux.stockValidation();
                return auxObj;
            }
        } catch (error) {
            console.error(`Module : Inventario : Error : ${error}`);
        }
    }
    return auxObj;
}

/**
 * Función propia del invetario, uso exclusivo de @function preValidate .
 * Actualiza el estado del stock.
 * No exportable.
 * @param {object} stock 
 * @returns {boolean}
 */
let validateStockState = (stock) => {
    let arrayStatus = [...stock.artInsumo, ...stock.artManufact];
    let aux = arrayStatus.every( status => status.stockStatus );
    return aux;
}

let Inventario = { restarStock, preValidate };

export default Inventario;