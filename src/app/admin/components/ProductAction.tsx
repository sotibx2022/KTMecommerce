import Link from 'next/link';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
interface ProductActionProps {
  product: {
    _id: string;
    productName: string;
  };
  actions: ('view' | 'edit' | 'delete')[];
  onDelete?: () => void; // Optional delete handler
}
const ProductAction = ({ product, actions, onDelete }: ProductActionProps) => {
  return (
    <div className="flex items-center flex-wrap justify-center gap-2">
      {actions.includes('view') && (
        <Link href={`/admin/displayProduct/productIdentifier?productId=${product._id}&productName=${product.productName}`}>
          <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors">
            <FaEye size={18} className="text-blue-200" />
          </button>
        </Link>
      )}
      {actions.includes('edit') && (
        <Link href={`/admin/editProduct/productIdentifier?productId=${product._id}&productName=${product.productName}`}>
          <button className="p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors">
            <FaEdit size={18} className="text-green-200" />
          </button>
        </Link>
      )}
      {actions.includes('delete') && (
        <button 
          onClick={onDelete} 
          className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
        >
          <FaTrash size={18} className="text-red-200" />
        </button>
      )}
    </div>
  );
};
export default ProductAction;