import { AiOutlineDelete } from "react-icons/ai";
// import { Avatar, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeList } from "../../reducers/EmployeeSlice";
import DeleteEmployee from "./DeleteEmployee";
import { ToastContainer } from "react-toastify";
// import Loader from "../../loader/Loader";
import { Profile } from "../../assets/images/images";
import { Avatar, Box, CircularProgress, Dialog, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

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

            <Box sx={{ backgroundColor: "#f1f1f1", height: "100vh", overflow: "auto", padding: 4 }}>
                <Typography variant="h5"
                    sx={{
                        mb: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            display: "block",
                            width: "50%",
                            height: "4px",
                            backgroundColor: "#F6BC56",
                            margin: "8px auto 0",
                            borderRadius: "2px",
                        },
                    }}
                >
                    Employee List
                </Typography>

                <TableContainer sx={{ borderRadius: 4, overflow: "auto", boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}> &nbsp;</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Profile Picture</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Full Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Mobile Number</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Age</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Salary</TableCell>
                                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#F6BC56" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeListing?.data && employeeListing?.data?.length > 0 ? (
                                employeeListing?.data.map((emp) => (
                                    <TableRow key={emp?._id}>
                                        <TableCell>&nbsp;</TableCell>
                                        <TableCell>
                                            <Avatar
                                                src={emp?.image ? emp?.image : Profile}
                                                alt="Profile"
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </TableCell>
                                        <TableCell>{emp?.fullName}</TableCell>
                                        <TableCell>{emp?.email}</TableCell>
                                        <TableCell>{emp?.phone}</TableCell>
                                        <TableCell>{emp?.age}</TableCell>
                                        <TableCell>{emp?.salary}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <IconButton
                                                    component={Link}
                                                    to={`/edit-employee?id=${emp?._id}`}
                                                    sx={{ color: "#1E824C" }}
                                                >
                                                    <RiEdit2Fill />
                                                </IconButton>
                                                <Box
                                                    sx={{
                                                        width: "1px",
                                                        height: "24px",
                                                        backgroundColor: "#ccc",
                                                        mx: 1,
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={() => handleDeleteEmp(emp?._id)}
                                                    sx={{ color: "#A63535" }}
                                                >
                                                    <AiOutlineDelete />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : loadingList ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <CircularProgress sx={{ color: '#BE7A3A' }} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openRegistrationSuccessModal} onClose={() => setOpenRegistrationSuccessModal(false)}>
                    <DeleteEmployee
                        openRegistrationSuccessModal={openRegistrationSuccessModal}
                        setOpenRegistrationSuccessModal={setOpenRegistrationSuccessModal}
                        employeeId={employeeId}
                    />
                </Dialog>
            </Box>

        </>
    )
}

export default EmployeeList;