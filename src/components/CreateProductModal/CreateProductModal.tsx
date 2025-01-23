import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Product } from '../../interfaces/product';
import { CreateProduct } from '../../interfaces/createProduct';
import { createProduct } from '../../services/productService';
import styles from './CreateProductModal.module.css';

const validationSchema = yup.object({
  name: yup.string().required('Product name is required'),
  price: yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  currency: yup.string().required('Currency is required'),
});

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
  handleUpdate: (id: number, updatedProduct: Product) => void;
}

export const CreateProductModal = ({
  open,
  handleClose,
  product,
  handleUpdate,
}: CreateProductModalProps) => {
  const initialValues: CreateProduct = {
    name: product?.name || '',
    price: product?.price || 0,
    currency: product?.currency || '',
  };

  const handleSubmit = async (values: CreateProduct) => {
    if (product) {
      handleUpdate(product.id, values as Product);
    } else {
      await createProduct(values);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalBox}>
        <Typography variant="h6" gutterBottom>
          {product ? 'Edit Product' : 'Create New Product'}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, handleChange, handleBlur, values }) => (
            <Form>
              <div className={styles.formContainer}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                  className={styles.inputField}
                />

                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  variant="outlined"
                  type="number"
                  className={styles.inputField}
                />

                <TextField
                  fullWidth
                  label="Currency"
                  name="currency"
                  value={values.currency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.currency && !!errors.currency}
                  helperText={touched.currency && errors.currency}
                  variant="outlined"
                  className={styles.inputField}
                />

                <div className={styles.buttonsContainer}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={styles.submitButton}
                  >
                    {product ? 'Update Product' : 'Create Product'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
