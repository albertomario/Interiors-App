//depreciated


// import Product from "../models/productModel";
// import Range from "../models/rangeModel";
// import Promotion from "../models/promotionModel";
// import { API_BASE_URL, apiRequest, API_ROUTES } from "./api";
// import CartItem from "../models/cartItemModel";
// //********************** firebase ****************************//

// // import * as firebase from 'firebase';
// // import 'firebase/firestore';

// // const firebaseConfig = {
// //     apiKey: "AIzaSyDruYB-2SPSCvQ_OzRbPYLOd5EDqKiy674",
// //     authDomain: "hill-interiors-app.firebaseapp.com",
// //     databaseURL: "https://hill-interiors-app.firebaseio.com",
// //     projectId: "hill-interiors-app",
// //     storageBucket: "hill-interiors-app.appspot.com",
// //     messagingSenderId: "949832383871",
// //     appId: "1:949832383871:web:c4ac9b36fdcd5b7708ee4a",
// //     measurementId: "G-Y0W42R3R97"
// //   };

// // let app;
// // if (firebase.apps.length === 0) {
// //     app = firebase.initializeApp(firebaseConfig);
// // }

// // const db = firebase.firestore(app);

// // export const getAllProducts = async () => {
// //     const snapshot = await firebase.firestore().collection('products').get();
// //     return snapshot.docs.map(doc => {
// //         const data = doc.data();
// //         return new product(
// //             doc.id,
// //             data.code,
// //             data.name,
// //             data.description,
// //             data.imageURLs,
// //             data.stock,
// //             data.height,
// //             data.width,
// //             data.depth,
// //             data.weight,
// //             data.color,
// //             data.material,
// //             data.price
// //             );
// //     });
// // }

// //todo handle bad request 500

// //
// export const getAllProducts = async () => {
//     // const apiUrl = API_BASE_URL+"/products"
//     // const res = await fetch(apiUrl);
//     const res = await apiRequest(API_ROUTES.PRODUCTS.ROOT);
//     const resData = await res.json();

//     return resData.map(product => {
//         return new Product(
//             product._id,
//             product.code,
//             product.name,
//             product.description,
//             product.imageURLs,
//             product.stock,
//             product.height,
//             product.width,
//             product.depth,
//             product.weight,
//             product.color,
//             product.material,
//             product.price
//         );
//     });
// };

// export const getAllRanges = async () => {
//     // const apiUrl = API_BASE_URL+"/ranges"
//     // const res = await fetch(apiUrl);
//     const res = await apiRequest(API_ROUTES.RANGES.ROOT);
//     const resData = await res.json();
//     if (!resData) return [];

//     return resData.map(range => {
//         return new Range(
//             range._id,
//             range.name,
//             range.description,
//             range.imageURL,
//             range.productIds
//         );
//     });
// };

// export const getAllPromotions = async () => {
//     // const apiUrl = API_BASE_URL+"/promotions"
//     // const res = await fetch(apiUrl);
//     const res = await apiRequest(API_ROUTES.PROMOTIONS.ROOT);
//     const resData = await res.json();
//     if (!resData) return [];

//     return resData.map(promotion => {
//         return new Promotion(
//             promotion._id,
//             promotion.title,
//             promotion.imageURL
//         );
//     });
// };

// export const getCart = async () => {
//     const apiUrl = API_BASE_URL+"/cart"
//     const res = await fetch(apiUrl);
//     if (!res.ok) return;
//     const resData = await res.json();
//     return resData.map(cartItem => {
//         return new CartItem(
//             cartItem.productId,
//             cartItem.quantity
//         );
//     });
// };
// //todo
// export const setCart = async cartItems => {
//     const apiUrl = API_BASE_URL+"/cart"
//     const res = await fetch(apiUrl,{
//         method: 'POST',
//         body: JSON.stringify({
//             cart: cartItems
//         })
//     });
//     if (!res.ok) return;
//     const resData = await res.json();
//     return resData.map(cartItem => {
//         return new CartItem(
//             cartItem.productId,
//             cartItem.quantity
//         );
//     });
// };

