import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listEmployeesAsync } from "../../../redux/slices/employeeSlice";
import SkeletonLoading from "../../../components/skeleton-loading";
import { useNavigate } from "react-router-dom";

const MainListEmployees: React.FC = () => {
  const dispatch = useAppDispatch();
  const { listEmployees, loading } = useAppSelector((store) => store.employee);
const navigate = useNavigate()
  useEffect(() => {
    dispatch(listEmployeesAsync());
  }, [dispatch]);

  const [hoveredEmployee, setHoveredEmployee] = useState<string | null>(null);

  return (
    <div className="container mt-4">
      <div className="list-employees-headers">
        <h4 className="text-2xl dark:text-white"> List employees</h4>
        <div className="list-employees-sub-headers flex justify-between mt-5 items-center mb-[60px]">
          <div className="list-employees-search flex gap-3">
            <p className="flex items-center w-3/5">Search Name</p>
            <input
              type="text"
              id="default-input"
              className=" "
            />
            <button className="text-white bg-blue-500 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Search
            </button>
          </div>
          <button type="button" onClick={()=>navigate("/create")} className="text-white bg-green-500 dark:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add Employee
          </button>
        </div>
      </div>
      {loading ? (
        <SkeletonLoading
          count={25}
          height="35px"
          style={{ marginBottom: "5px" }}
        />
      ) : (
        <div className="grid grid-cols-3 gap-[60px]">
          {listEmployees.pageItems.map((employee) => (
            <div
              key={employee.id}
              className={`employee-${employee.name} relative`}
              onMouseEnter={() => setHoveredEmployee(employee.name)}
              onMouseLeave={() => setHoveredEmployee(null)}
            >
              {employee.positions.map((position) => (
                <>
                  {position.toolLanguages
                    .sort((c) => c.to - c.from)
                    .map((toolLang) => {
                      const totalYear = `${toolLang.to - toolLang.from} year${
                        toolLang.to - toolLang.from > 1 ? "s" : ""
                      }`;
                      return (
                        <div
                          key={position.id}
                          id="default-carousel"
                          className="relative w-full"
                          data-carousel="slide"
                        >
                          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                            {toolLang.images.map((image) => (
                              <div
                                className="hidden duration-200 ease-linear"
                                data-carousel-item
                              >
                                <img
                                  src={image.cdnUrl}
                                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                  alt="..."
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col mt-3">
                            <p className="flex justify-between">
                              <span>{employee.name}</span> {totalYear}
                            </p>
                            <p>{position.positionResourceName} Developer</p>
                            <span className="mt-4">{toolLang.description}</span>
                            {hoveredEmployee === employee.name && (
                              <button
                                className="mt-3 mx-2 h-[25px] bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() =>
                                  console.log(`Deleting ${employee.name}`)
                                }
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainListEmployees;
