import axios from 'axios';
import { BASE_URL } from '../settings';
import { CreateProduct } from '../interfaces/createProduct';
import { UpdateProduct } from '../interfaces/updateProduct';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
  }
};

export const createProduct = async (createProductDTO: CreateProduct) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create-product`,
      createProductDTO
    );
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getProductById:', error);
  }
};

export const updateProduct = async (
  id: number,
  updateProductDTO: UpdateProduct
) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, updateProductDTO);
    return response.data;
  } catch (error) {
    console.error('Error in updateProduct:', error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteProduct:', error);
  }
};

export const getPermissions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/permissions`);
    return response.data;
  } catch (error) {
    console.error('Error in getPermissions:', error);
  }
};
