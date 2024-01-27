import Repository from "./Repository";
const CHECKOUT ="/payment";
export default {
    addCheckout(detail) {
      return Repository.post(`${CHECKOUT}` ,detail);
    }, 
  };