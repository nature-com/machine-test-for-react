import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, employeeList } from "../../reducers/EmployeeSlice";
import { toast } from "react-toastify";

const DeleteEmployee = ({ openRegistrationSuccessModal, setOpenRegistrationSuccessModal, employeeId }) => {
    console.log("employeeId", employeeId);
    const dispatch = useDispatch();
    const { loadingDelete } = useSelector((state) => state?.employee);

    const handleDeleteYes = () => {
        dispatch(deleteEmployee(employeeId)).then((res) => {
            console.log("Delete Res", res);
            if (res?.payload?.code === 200) {
                toast.success(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            dispatch(employeeList());
            setOpenRegistrationSuccessModal(false);
        })
    };

    const handleDeleteNo = () => {
        setOpenRegistrationSuccessModal(false);
    };

    return (
        <>
            <Modal
                show={openRegistrationSuccessModal}
                onClose={() => setOpenRegistrationSuccessModal(false)}
                size="xl"
            >
                <Modal.Header className="border-none absolute right-0">
                    &nbsp;
                </Modal.Header>
                <Modal.Body>
                    <div className="py-6">
                        <p className="text-[#030229] text-xl font-bold text-center px-16 mb-4">
                            Delete employee?
                        </p>
                        <div className="text-center mb-2">
                            Are you sure you want to delete this employee?
                        </div>
                        <button onClick={() => handleDeleteYes()} className="bg-[#f6bc56] w-full text-[#231000] hover:bg-[#231000] hover:text-[#f6bc56] text-[18px] font-bold rounded-lg py-3 mt-6">
                            {loadingDelete ? "Deleting..." : "Yes"}
                        </button>
                        <button onClick={() => handleDeleteNo()} className="bg-white border border-[#f6bc56] w-full text-[#231000] hover:bg-[#231000] hover:text-[#f6bc56] block text-center text-[18px] font-bold rounded-lg py-3 mt-4">
                            No
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteEmployee;