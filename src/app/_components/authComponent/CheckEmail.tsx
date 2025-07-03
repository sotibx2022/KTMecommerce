import { validateEmail } from '@/app/services/helperFunctions/validatorFunctions';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResetresetPasswordData } from './ResetPasswordComponent';
import { useFormContext } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import PrimaryButton from '../primaryButton/PrimaryButton';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import LoadingButton from '../primaryButton/LoadingButton';
import LoadingComponent from '../loadingComponent/LoadingComponent';
const CheckEmail = () => {
    type EmailRequest = { email: string };
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useFormContext<ResetresetPasswordData>();
    const emailValue = watch("resetEmail");
    const isEmailError = !!errors.resetEmail;
    const isButtonDisabled = !emailValue || isEmailError;
    const { mutate: checkEmail, isPending } = useMutation<
        APIResponseSuccess | APIResponseError,
        Error,
        EmailRequest
    >({
        mutationFn: async ({ email }) => {
            const response = await axios.post('/api/auth/checkEmail', { email }, {
                validateStatus: (status) => status < 500
            });
            return response.data;
        },
        onMutate: () => {
        },
        onSuccess: (response) => {
            console.log(response);
            if (response.success) {
                toast.success(response.message);
                setValue('checkResetEmail', true);
                if (response.data.userPassword) {
                    setValue('passwordExist', true)
                }
            } else {
                toast.error(response.message);
                setValue('checkResetEmail', false);
            }
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to check email');
        },
    });
    const handleEmailCheck = async () => {
        // Validate the field before submitting
        const isValid = await trigger("resetEmail");
        if (!isValid) return;
        checkEmail({ email: emailValue });
    };
    return (
        <>
            <div>
                <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primaryDark mr-2" />
                    <label htmlFor="resetEmail" className="text-primaryParagraph">
                        Email <span className="text-red-500">*</span>
                    </label>
                </div>
                <input
                    type="text"
                    disabled={isPending}
                    placeholder="your@resetemail.com"
                    className="formItem w-full mb-2"
                    id="resetEmail"
                    {...register("resetEmail", {
                        required: "Email is required",
                        validate: (value) => validateEmail("resetEmail", value),
                    })}
                />
                {isPending ? <LoadingButton /> : <PrimaryButton
                    searchText={"check"}
                    onClick={handleEmailCheck}
                    disabled={isButtonDisabled}
                />}
                {errors.resetEmail?.message && (
                    <SubmitError message={errors.resetEmail.message} />
                )}
            </div>
            {isPending && <LoadingComponent />}
        </>
    );
};
export default CheckEmail;