import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { adminClient } from './adminTypesence';
const productSchema: CollectionCreateSchema = {
    name: 'products',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'productName', type: 'string' },
        { name: 'categoryName', type: 'string' },
        { name: 'subCategoryName', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'productDescription', type: 'string' },
        { name: 'createdAt', type: 'int64' }, // store timestamp in ms
    ],
    default_sorting_field: 'createdAt',
};
export async function createProductCollection() {
    try {
        await adminClient.collections('products').delete();
    } catch (err) {
        // Ignore error if collection doesn't exist
    }
    return await adminClient.collections().create(productSchema);
}
