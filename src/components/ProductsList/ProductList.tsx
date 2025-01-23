import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './productList.module.css';
import { Product } from '../../interfaces/product';
import {
  deleteProduct,
  getAllProducts,
  getPermissions,
  updateProduct,
} from '../../services/productService';
import { CreateProductModal } from '../CreateProductModal/CreateProductModal';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchPermissions = async () => {
      const userPermissions = await getPermissions();
      setPermissions(userPermissions);
    };

    fetchPermissions();
    fetchProducts();
  }, [products]);

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  const handleUpdateProduct = async (id: number, updatedProduct: Product) => {
    await updateProduct(id, updatedProduct);
    setOpenModal(false);
  };

  return (
    <div className={styles.cardWide}>
      <h1 className={styles.mainTitle}>Products</h1>

      {permissions.includes('CREATE') && (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={styles.createButton}
            onClick={() => handleOpenModal()}
          >
            Create Product
          </Button>
        </div>
      )}

      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeader}>Name</TableCell>
              <TableCell className={styles.tableHeader}>Price</TableCell>
              <TableCell className={styles.tableHeader}>Currency</TableCell>
              <TableCell className={styles.tableHeader}></TableCell>
              <TableCell className={styles.tableHeader}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 && permissions.includes('READ') ? (
              products.map((product: Product) => (
                <TableRow key={product.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>
                    {product.name}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {product.price}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {product.currency}
                  </TableCell>
                  {permissions.includes('UPDATE') && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        className={styles.editButton}
                        onClick={() => handleOpenModal(product)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  )}
                  {permissions.includes('DELETE') && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        className={styles.deleteButton}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  className={styles.noProducts}
                >
                  No products available or no permissions!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateProductModal
        open={openModal}
        handleClose={handleCloseModal}
        product={selectedProduct}
        handleUpdate={handleUpdateProduct}
      />
    </div>
  );
};
