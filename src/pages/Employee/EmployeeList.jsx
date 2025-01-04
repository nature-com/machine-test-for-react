import { AiOutlineDelete } from "react-icons/ai";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeList } from "../../reducers/EmployeeSlice";
import DeleteEmployee from "./DeleteEmployee";
import { ToastContainer } from "react-toastify";
import Loader from "../../loader/Loader";
import { Profile } from "../../assets/images/images";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const [openRegistrationSuccessModal, setOpenRegistrationSuccessModal] = useState(false);
    const { loadingList, employeeListing } = useSelector((state) => state?.employee);
    console.log("employeeListing", employeeListing)
    const [employeeId, setEmployeeId] = useState();

    const handleDeleteEmp = (empId) => {
        console.log("empId", empId)
        setEmployeeId(empId);
        setOpenRegistrationSuccessModal(true);
    };

    useEffect(() => {
        dispatch(employeeList())
    }, [dispatch]);

    return (
        <>
            <ToastContainer />
            <div className="flex h-screen overflow-hidden">

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#f1f1f1]">

                    <main>
                        <div className="mx-auto p-4 md:p-6 2xl:p-10">
                            <div>
                                <div className="mt-8">
                                    <div className="overflow-x-auto">
                                        <Table hoverable>
                                            <Table.Head>
                                                <Table.HeadCell className="p-4 bg-[#F6BC56]">
                                                    &nbsp;
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Profile Picture
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Full Name
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Email
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Mobile Number
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Age
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56] text-[#231000] text-base font-bold capitalize">
                                                    Salary
                                                </Table.HeadCell>
                                                <Table.HeadCell className="bg-[#F6BC56]">&nbsp;</Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="divide-y">
                                                {employeeListing?.data && employeeListing?.data?.length > 0 && employeeListing?.data?.map((emp) => (
                                                    <Table.Row key={emp?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                        <Table.Cell className="p-4">
                                                            &nbsp;
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            <div className="w-[50px] h-[50px] bg-[#828aa1] rounded-full mr-2 flex justify-center items-center">
                                                                <img
                                                                    src={emp?.image ? emp?.image : Profile}
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover rounded-full"
                                                                />
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            {emp?.fullName}
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            {emp?.email}
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            {emp?.phone}
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            {emp?.age}
                                                        </Table.Cell>
                                                        <Table.Cell className="text-[#231000] text-sm font-[15px]">
                                                            {emp?.salary}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex items-center">
                                                                <Link
                                                                    to={`/edit-employee?id=${emp?._id}`}
                                                                    className="bg-[#1E824C] p-2 rounded text-base font-medium text-white hover:underline dark:text-cyan-500 mx-4"
                                                                >
                                                                    <RiEdit2Fill />
                                                                </Link>
                                                                <div className="text-[#dcd3cb]">|</div>
                                                                <button
                                                                    onClick={() => handleDeleteEmp(emp?._id)}
                                                                    className="bg-[#A63535] p-2 rounded text-base font-medium text-white hover:underline dark:text-cyan-500 mx-4"
                                                                >
                                                                    <AiOutlineDelete />
                                                                </button>
                                                            </div>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                                {loadingList &&
                                                    <Table.Row>
                                                        <Table.Cell colSpan="8" className="p-4 text-center">
                                                            <div className="flex justify-center items-center w-full h-full">
                                                                <Loader />
                                                            </div>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                }
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </div>
                                {/*  */}

                                {openRegistrationSuccessModal &&
                                    <DeleteEmployee
                                        openRegistrationSuccessModal={openRegistrationSuccessModal}
                                        setOpenRegistrationSuccessModal={setOpenRegistrationSuccessModal}
                                        employeeId={employeeId}
                                    />
                                }
                            </div>
                        </div>
                    </main>

                </div>

            </div>

        </>
    )
}

export default EmployeeList;