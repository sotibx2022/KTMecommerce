import React, { useState } from 'react';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import ReadOnlyUserProfile from '../singleProductReviews/ReadOnlyUserProfile';
import { useForm } from 'react-hook-form';
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions';
import { Send } from "lucide-react";
import RecommendationTrigger from './RecommendationTrigger';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { IProductDisplay } from '@/app/types/products';
import RecommendedProductLoading from './RecommendedProductLoading';
import RecommendedProduct from './RecommendedProduct';
import RecommendedProductInfo from './RecommendProductInfo';
import SubmitError from '../submit/SubmitError';
import NoRecommendedProduct from './NoRecommendedProduct';
interface IproductRecommendationInput {
    productRecommendationText: string;
}
const ProductRecommendation = () => {
    const context = useUserDetails();
    const { userDetails } = context;
    const { register, formState: { errors }, handleSubmit, reset } = useForm<IproductRecommendationInput>({ mode: 'onBlur' });
    const [recommendedProduct, setRecommendedProduct] = useState<IProductDisplay | null|undefined>(undefined);
    const userQueryMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IproductRecommendationInput>({
        mutationFn: async (data) => {
            const response = await axios.post('/api/productRecommendation', data);
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
                setRecommendedProduct(response.data);
            } else {
                toast.error(response.message);
                setRecommendedProduct(null);
            }
        },
        onError: (error) => {
            toast.error(error.message);
            setRecommendedProduct(null);
        }
    });
    const onSubmit = (data: IproductRecommendationInput) => {
        setRecommendedProduct(null); // reset previous product on new submit
        userQueryMutation.mutate(data);
    };
    // Determine what to show
    let content = <RecommendedProductInfo />;
    if (userQueryMutation.isPending) {
        content = <RecommendedProductLoading />;
    } else {
        if (recommendedProduct!==undefined) {
            content = <RecommendedProduct recommendedProduct={recommendedProduct} />;
        } else if(recommendedProduct === null) {
            content = <NoRecommendedProduct />
        }
    }
    return (
        <AbsoluteComponent>
            <div className='recommendationHeader my-4 flex gap-4 items-center'>
                <RecommendationTrigger />
                <h2 className='secondaryHeading'>Smart selections powered by AI</h2>
            </div>
            <div className="chattingArea">
                <div className="userProfile">
                    <ReadOnlyUserProfile />
                </div>
                <div className="mt-6">
                    {content}
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-3"
                >
                    <textarea
                        {...register('productRecommendationText', {
                            validate: (value) => validateSentence("Recommendation Text", value, 4, 100)
                        })}
                        placeholder="eg. samsung mobile max price $ 500"
                        className="formItem mt-2 flex-grow resize-none rounded-[var(--radius)] border border-[var(--primaryLight)] p-2"
                        disabled={userQueryMutation.isPending}
                    />
                    <button
                        type="submit"
                        className={`bg-[var(--helper)] hover:bg-yellow-500 text-[var(--primaryDark)] p-2 rounded-[var(--radius)] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                        aria-label="Send"
                        disabled={userQueryMutation.isPending || Boolean(errors.productRecommendationText?.message)}
                    >
                        <Send size={20} />
                    </button>
                </form>
                {errors?.productRecommendationText?.message && <SubmitError message={errors.productRecommendationText?.message} />}
            </div>
        </AbsoluteComponent>
    );
};
export default ProductRecommendation;
