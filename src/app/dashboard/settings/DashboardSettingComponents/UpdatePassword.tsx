import CurrentPasswordCheck from "./CurrentPasswordCheck";
import NewPasswordEnter from "./NewPasswordEnter";
const UpdatePassword = () => {
    return (
        <>
            <div className="p-6 rounded-lg shadow-lg relative">
                <h2 className="subHeading mb-4">Update Password</h2>
                <CurrentPasswordCheck />
                <NewPasswordEnter />
            </div>
        </>
    );
}
export default UpdatePassword