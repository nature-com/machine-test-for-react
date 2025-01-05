import { Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { employeeView, updateEmployee } from "../../reducers/EmployeeSlice";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import Loader from "../../loader/Loader";

const EditEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    console.log('employee id:', id);
    const { employeeDetails, loadingUpdate } = useSelector((state) => state?.employee);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(employeeView(id)).then((res) => {
            console.log("Res", res);
            if (res?.payload?.code === 200) {
                setValue("fullName", res?.payload?.data?.fullName)
                setValue("email", res?.payload?.data?.email)
                setValue("phone", res?.payload?.data?.phone)
                setValue("image", res?.payload?.data?.image)
                setValue("age", res?.payload?.data?.age)
                setValue("salary", res?.payload?.data?.salary)
            }
        })
    }, [dispatch, id, setValue]);

    const onSubmit = (data) => {
        console.log("Data", data);
        dispatch(updateEmployee({ id, data })).then((res) => {
            console.log("update res", res);
            if (res?.payload?.code === 200) {
                toast.success(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(employeeView(id));
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
        })
    };

    return (
        <>
            <ToastContainer />

            <Header employeeDetails={employeeDetails} />

            {loadingUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <Loader />
                </div>
            )}

            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col">
                    <main>
                        <div className="mx-auto p-4 md:p-6 2xl:p-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div className="mb-8">
                                        <div className="flex justify-between">
                                            <div>
                                                <span className="text-[#BE7A3A] text-2xl font-bold mr-4 flex items-center ml-2">
                                                    Edit Employee
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    type="submit"
                                                    className="bg-[#1E824C] hover:bg-black text-white text-base px-5 py-1.5 rounded-lg mr-4 flex items-center"
                                                >
                                                    {loadingUpdate ? "Saving..." : "Save"} <CiSaveDown2 className="text-xl ml-1" />
                                                </button>
                                                <button type="button" onClick={() => { navigate("/") }} className="bg-[#A63535] hover:bg-black text-white text-base px-5 py-1.5 rounded-lg mr-0 flex items-center">
                                                    Cancel <MdOutlineCancel className="text-xl ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-8 mb-8">
                                        <div className="w-full field_area">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Full Name:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="text"
                                                        sizing="md"
                                                        placeholder="Full name"
                                                        {...register("fullName", { required: "Full name is required" })}
                                                    />
                                                    {errors?.fullName && (
                                                        <span className="text-red-500 text-sm">{errors?.fullName?.message}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Email:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="text"
                                                        sizing="md"
                                                        placeholder="Email"
                                                        {...register("email", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                                message: "Invalid email format",
                                                            },
                                                        })}
                                                    />
                                                    {errors?.email && (
                                                        <span className="text-red-500 text-sm">{errors?.email?.message}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Mobile number:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="text"
                                                        sizing="md"
                                                        placeholder="Mobile number"
                                                        {...register("phone", {
                                                            pattern: {
                                                                value: /^[0-9]{10}$/,
                                                                message: "Mobile number must be 10 digits",
                                                            },
                                                        })}
                                                    />
                                                    {errors?.phone && (
                                                        <span className="text-red-500 text-sm">{errors?.phone?.message}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Profile Picture:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="text"
                                                        sizing="md"
                                                        placeholder="Image URL"
                                                        {...register("image", {
                                                            pattern: {
                                                                value: /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i,
                                                                message: "Please enter a valid URL"
                                                            }
                                                        })}
                                                    />
                                                    {errors?.image && (
                                                        <span className="text-red-500 text-sm">{errors?.image?.message}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Age:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="text"
                                                        sizing="md"
                                                        placeholder="Age"
                                                        {...register("age", {
                                                            pattern: {
                                                                value: /^\d+$/,
                                                                message: "Only numbers are allowed"
                                                            },
                                                            maxLength: {
                                                                value: 3,
                                                                message: "Age cannot exceed 3 digits"
                                                            }
                                                        })}
                                                    />
                                                    {errors?.age && (
                                                        <span className="text-red-500 text-sm">{errors?.age?.message}</span>
                                                    )}
                                                </div>

                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="base" value="Salary:" />
                                                    </div>
                                                    <TextInput
                                                        id="base"
                                                        type="number"
                                                        sizing="md"
                                                        placeholder="Salary"
                                                        {...register("salary")}
                                                    />
                                                    {errors?.salary && (
                                                        <span className="text-red-500 text-sm">{errors?.salary?.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default EditEmployee;