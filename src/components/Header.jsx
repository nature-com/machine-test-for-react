import { FaArrowRightLong } from "react-icons/fa6";
import { Profile } from "../assets/images/images";

const Header = ({ employeeDetails }) => {

    return (
        <>
            <div className="bg-white shadow-md py-2 px-4 flex items-center justify-between mb-4">

                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-800">Employee</div>
                    <div>
                        <span className="text-[#BE7A3A] text-2xl font-bold mr-4 flex items-center ml-2">
                            <FaArrowRightLong className="text-base mr-3" />
                            {employeeDetails?.data?.fullName}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={employeeDetails?.data?.image ? employeeDetails?.data?.image : Profile}
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header;