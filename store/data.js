
export const state = () => ({
  categories: [],
  products: [],
  brands: []
})

export const mutations = {
  setBrands(state,brands){
    state.brands = brands
  },
  setProducts(state,products){
    state.products = products
  },
  setCategories(state,categories){
    state.categories = categories
  },
}


export const getters = {
  categories: state => {
    return state.categories;
  },
  brands: state => {
    return state.brands;
  },
  products: state => {
    return state.products;
  },
}

