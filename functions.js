//Primero line, luego categoria y parent subcategory
//videovigilancia, line
// CCTV HD, line
//Discos duro, line
//cableado, cableado
//Smart Home. line
//memorias sd(está en infraestructura), line => infraestructura, => Memorias
//Energ&iacute;a y Monitores. line
import declarations from "./declarations.js";
import axios from 'axios';
import fs from "fs";

export const sendData = async (wooObjt, items) => {
    let productsArray = {
        create: items
    }

    try {
        console.log('==== Actualizando en lote, espere por favor... ====');
        await wooObjt.post('products/batch', productsArray)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log('////ERROR////');
            console.log(error.response.data);
        });

    } catch (error) {
        console.log('No se pudo actualizar!!');
        throw error;
    }
    productsArray = {};

}

export const createArray = async (wooObjt, data, quantity) => {
    let cont = 0; 
    let items = [];
    let cont2 = 0;
    console.log('Creando array de datos');
    for (let product of data) {
        if (cont === quantity) {
            cont2++;
            console.log('Vuelta: ', cont2);
            await sendData(wooObjt, items);
            cont = 0;
            items = [];
        }

        items[cont] =
        {
            name: product.name,
            regular_price: calculatePrice(product.sale_price),
            sku: product.sku,
            description: product.description,
            manage_stock: true,
            stock_quantity: product.stock_total,
            weight: product.weight,
            dimensions: {length: product.length, width: product.width, height: product.height},
            categories: [
                {
                    id: selectCategory(product, declarations.categories) || 16,
                }
            ],
            images : [
                {
                    src: `https://sudsolutions.mx/images/img/${product.line}${product.item_id}.jpg`,
                    
                }
            ]
        }

        console.log("Producto final: ", items[cont]);
        cont++;
    }

}

const searchCategory = (data) => {
    return data.map(e => e.category);
}

export const selectCategory = (product, categories) => {
    let cont = 0;
    for (let e of categories) {
        if (e.line == product.line) {
            return e.id;
        }
        cont++;
    }
}

export const updateProduct = (wooObjt, idProduct, data) => {
    // const data = {
    //     categories: [{id: 40}]
    // };
    console.log('Actualizando producto');
    wooObjt.put(`products/${idProduct}`, data)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
}

export const getAllApiProducts = async () => {
    console.log('====Trayendo datos de la API Tecnosinergia====');
    try {

        const res = await axios.get(declarations.productsAPIurl, {
            headers: declarations.headers,
        })
        return res.data;

    } catch (error) {
        throw error;
    }

}

export const filterProducts = (data) => {
    // let cont = 0;
    return data.filter((product) => product.line === 'Videovigilancia' || product.line === 'CCTV HD' ||
        product.line === 'Discos Duros' || product.line === 'Cableado' || product.line === 'Smart Home' ||
        product.line === 'Energ&iacute;a y Monitores'
    );

}

export const createProduct = async (product) => {
    try {
        console.log('Creando producto');
        return await declarations.woocommerce.post('products', product)
        .then(res => {
            console.log(res.data);
            console.log(res.data.attributes);
        })
        .catch(err => console.log(err.response.data))

    } catch (error) {
        throw error;
    }
}

export const downloadImage = async(url, name) => {
    await axios({
        method: 'get',
        url,
        responseType: 'stream'
    })
        .then(res => {
            res.data.pipe(fs.createWriteStream(name));
        })
        .catch(error => {
            console.log(error);
        });
}

export const downloadAllImages = async(filteredArray) => {
    console.log('=========Download All Images========');
    for (let product of filteredArray) {
            const url = product.image;
            const line = product.line;
            const id = product.item_id;
            await downloadImage(url, `./img2/${line+id}.jpg`);
    }
}

export const calculatePrice = (regularPrice) => {
    return (regularPrice + (regularPrice * 0.25)).toString()
    
}