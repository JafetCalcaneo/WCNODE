import wooPkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceAPI = wooPkg.default;

//====== Categories ========
const categories = [
    {
        id: 41,
        line: 'Videovigilancia',
    },
    {
        id: 42,
        line: 'CCTV HD',
    },
    {
        id: 43,
        line: 'Discos Duros',
    },
    {
        id: 44,
        line: 'Cableado',
    },
    {
        id: 45,
        line: 'Smart Home',
    },
    {
        id: 40,
        line: 'Infraestructura',
        category: 'Memorias',

    },
    {
        id: 46,
        line: 'Energ&iacute;a y Monitores',
    }

]

//======= Woocomerce ========
const wooUrl = 'http://sudsolutions.ddns.net/';
const ck_API_woo = 'ck_32074b6694aea0def3d2b2cf142db74c6a78cfa5';
const cs_API_woo = 'cs_497c36571a3e4a91f17852080a937fec25ce704b';
const imgUrl = `${wooUrl}home/desarollo/wordpress/wp-admin/img/`;

//====== Products API ========
const productsAPIurl = 'https://api.tecnosinergia.info/v3/item/list';
const token = '$2y$10$Eao9Ddy0oKh0MkWy//qB3eurlhOUhY6tr5KmU9.dW6MHkooEcaTtS';

const headers = {
    'api-token': token, 
    'Content-Type': 'application/json',
}

const woocommerce = new WooCommerceAPI({
    url: wooUrl,
    consumerKey: ck_API_woo,
    consumerSecret: cs_API_woo,
    version: 'wc/v3',
});

export default {
    woocommerce,
    headers,
    productsAPIurl,
    categories,
    imgUrl,
}