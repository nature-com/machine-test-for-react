import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, employeeList } from "../../reducers/EmployeeSlice";
import { toast } from "react-toastify";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteEmployee = ({ openRegistrationSuccessModal, setOpenRegistrationSuccessModal, employeeId }) => {
    const dispatch = useDispatch();
    const { loadingDelete } = useSelector((state) => state?.employee);

    const handleDeleteYes = () => {
        dispatch(deleteEmployee(employeeId)).then((res) => {
            if (res?.payload?.code === 200) {
                toast.success(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(employeeList());
                setOpenRegistrationSuccessModal(false);
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

    const handleDeleteNo = () => {
        setOpenRegistrationSuccessModal(false);
    };

    return (
        <>
            <Dialog
                open={openRegistrationSuccessModal}
                onClose={() => setOpenRegistrationSuccessModal(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    "& .MuiPaper-root": {
                        borderRadius: 4,
                    },
                }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" align="center" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Delete Employee?
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenRegistrationSuccessModal(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" align="center">
                        Are you sure you want to delete this employee?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
                    <Button
                        onClick={handleDeleteYes}
                        variant="contained"
                        fullWidth
                        sx={{
                            fontWeight: "bold", fontSize: 16, borderRadius: 2,
                            backgroundColor: "#D4A017",
                            color: "black",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "#D4A017",
                            },
                        }}
                    >
                        {loadingDelete ? <CircularProgress size={24} color="inherit" /> : "Yes"}
                    </Button>
                    <Button
                        onClick={handleDeleteNo}
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        sx={{
                            fontWeight: "bold", fontSize: 16,
                            borderRadius: 2,
                            backgroundColor: "white",
                            color: "black",
                            "&:hover": {
                                backgroundColor: "black",
                                color: "#D4A017",
                            },
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteEmployee;