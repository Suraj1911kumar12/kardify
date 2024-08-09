// import { baseUrl } from "../api/api";

export const apis = {
  // -----------------------auth api's----------------------
  // baseUrl:"http://api.kardify.in/api",
  baseUrl: process.env.API_URL,
  register: '/register-customer-dealer?type=CUSTOMER',
  regiterOtp: '/verify-otp-customer-dealer?type=CUSTOMER',
  login: '/login-user-dealer?type=CUSTOMER',
  forgotpassword: '/send-otp-forgot-password?type=CUSTOMER',
  //-----------------------base url for images-----------------
  baseImgUrl: 'http://api.kardify.in',
  // -----------------------Dash Home -----------------
  brands: '/fetch-car-brands-customers',
  testimonials: '/fetch-all-testimonials-customers',
  category: '/fetch-categories-customer',
  topProduct: '/fetch-top-selling-products',
  productById: '/get-products-customer',

  // --------------------------carts --------------------
  addCart: '/add-to-cart',
  getCart: '/get-carts',

  // ------------------------Offers------------------
  offers: '/get-all-discounts-like-offer',

  // ------------------------Get Orders------------------
  getOrder: '/fetch-orders',
};
