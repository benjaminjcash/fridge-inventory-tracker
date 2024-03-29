import { ADDED_DATA, UPDATED_DATA, DELETED_ITEM, CLEARED_DATA, UPDATED_PRODUCT, DELETED_PRODUCT, UPDATED_PRODUCE, DELETED_PRODUCE } from '../utils/constants';

const data = (state = { success: false }, action) => {
  switch(action.type) {
    case ADDED_DATA:
      const addedData = Object.assign({
        success: true,
        action: 'insert',
        data: action.data
      });
    return addedData;
    case UPDATED_DATA:
      const updatedData = Object.assign({
        success: true,
        action: 'update'
      });
    return updatedData;
    case DELETED_ITEM:
      const deletedData = Object.assign({
        success: true,
        action: DELETED_ITEM
      });
    return deletedData;
    case CLEARED_DATA:
      const originalState = {
        success: false
      }
      return originalState;
    case UPDATED_PRODUCT:
      const updatedProduct = Object.assign({
        success: true,
        action: UPDATED_PRODUCT
      });
      return updatedProduct;
    case DELETED_PRODUCT:
      const deletedProduct = Object.assign({
        success: true,
        action: DELETED_PRODUCT
      });
      return deletedProduct;
    case UPDATED_PRODUCE:
      const updatedProduce = Object.assign({
        success: true,
        action: UPDATED_PRODUCE
      });
      return updatedProduce;
    case DELETED_PRODUCE:
      const deletedProduce = Object.assign({
        success: true,
        action: DELETED_PRODUCE
      });
      return deletedProduce;
    default:
      return state;
  }
}

export default data;