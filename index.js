import declarations from "./declarations.js";
import { createProduct, getAllApiProducts, filterProducts, createArray, calculatePrice, downloadAllImages} from "./functions.js";
const main = async () => {
    
    const {data} = await getAllApiProducts();
    console.log('Datos sin filtrar:', data.length); //2300 productos sin filtrar

    const filtered = filterProducts(data);
    console.log('Datos filtrados', filtered.length);//909 productos filtrados

    // downloadAllImages(filtered);
    await createArray(declarations.woocommerce, filtered, 2);
    
    //Cableado: 434
    //CCTV HD: 211
    //Discos Duros: 26
    //Energ&iacute;a y Monitores: 97
    //Smart Home: 1
    //Videovigilancia: 140
}

main();
// llamo datos de api
// filtro datos de api --> descargo y guardo imagenes
// creo array y mando endpoint del id de la imagen x cada producto
// mando array a wordpress
