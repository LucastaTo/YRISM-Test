import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Input, Label, Select, Textarea } from "../../../components/form-elements";
import { hasKey } from "../../../utils/helper";
import { getEmployeeByIdAsync, positionResourcesAsync } from "../../../redux/slices/employeeSlice";
import { IPosition } from "../../../@types/position";
import { getYearsArray } from "../../../contants";
import { useParams } from 'react-router-dom';

type FormValues = {
  name: string;
  positions: {
    positionResourceId: number;
      displayOrder: number;
      toolLanguages: {
      displayOrder: number;
      toolLanguageResourceId: number;
      from: number;
      to: number;
      desc: string;
      images: {
        displayOrder: number;
        data: string;
      }[];
    }[];
  }[];
};

const schema = yup.object().shape({
  name: yup.string().required().trim().label("Name"),
  positions: yup.array().of(
    yup.object().shape({
      positionResourceId: yup.number().required().label("Position"),
      displayOrder: yup.number().required(),
      toolLanguages: yup.array().of(
        yup.object().shape({
          toolLanguageResourceId: yup
            .number()
            .required()
            .label("Tool/Language"),
          displayOrder: yup.number().required(),
          from: yup
            .number()
            .required()
            .integer()
            .min(getYearsArray()?.[0], "From year must be valid")
            .label("From"),
          to: yup
            .number()
            .required()
            .integer()
            .min(
              yup.ref("from"),
              "To year must be greater than or equal to From year"
            )
            .label("To"),
          desc: yup.string().required().label("Description"),
          images: yup.array().of(
            yup.object().shape({
              displayOrder: yup.number().required(),
              data: yup.string().required(),
            })
          ),
        })
      ),
    })
  ),
});

const defaultToolLanguage = {
  toolLanguageResourceId: 0,
  displayOrder: 0,
  from: 0,
  to: 0,
  desc: "",
  images: [],
};

const MainCreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const { positionResources: positionResourcesStore, employee } = useAppSelector(
    (store) => store.employee
  );
  const [positionResources, setPositionResources] = useState<IPosition[]>([]);
  const [positions, setPositions] = useState<FormValues["positions"]>([]);

  useEffect(() => {
    dispatch(positionResourcesAsync());
  }, [dispatch]);

  useEffect(() => {
    setPositionResources(positionResourcesStore);
  }, [positionResourcesStore]);
  let { id } = useParams();

  useEffect(()=> {
    if(id) {
      dispatch(getEmployeeByIdAsync(Number(id)))
    }
  },[])
  useEffect(() => {
    
  }, [employee]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      positions: [{ displayOrder: 0, positionResourceId: 0, toolLanguages: [defaultToolLanguage] }],
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // Implement your save logic here
  };

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectedPositionId = parseInt(event.target.value);
    const selectedPosition = positionResources.find(
      (item) => item.positionResourceId === selectedPositionId
    );
    setValue("positions", [{ displayOrder: positions.length + 1, positionResourceId: selectedPositionId, toolLanguages: [defaultToolLanguage] }]);
  };

  const handleAddToolLanguage = (positionIndex: number) => {
    const newToolLanguage = {
      ...defaultToolLanguage,
      displayOrder: positions[positionIndex].toolLanguages.length + 1,
    };
    const updatedPositions = [...positions];
    updatedPositions[positionIndex].toolLanguages.push(newToolLanguage);
    setPositions(updatedPositions);
  };

  const handleDeleteToolLanguage = (positionIndex: number, languageIndex: number) => {
    const updatedPositions = [...positions];
    updatedPositions[positionIndex].toolLanguages.splice(languageIndex, 1);
    setPositions(updatedPositions);
  };

  const handleDeletePosition = (index: number) => {
    const updatedPositions = [...positions];
    updatedPositions.splice(index, 1);
    setPositions(updatedPositions);
  };

  const addPosition = () => {
    const newPosition = {
      positionResourceId: 0,
      displayOrder: positions.length + 1,
      toolLanguages: [defaultToolLanguage],
    };
    setPositions([...positions, newPosition]);
  };

  console.log(positions)

  return (
    <div className="container mt-4">
      <div className="list-employees-headers mb-[80px]">
        <h4 className="text-2xl dark:text-white">Create employees profile</h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
          <Label
            htmlFor="name"
            className="w-[100px] after:content-['*'] after:text-red-500 after:ml-2"
          >
            Name
          </Label>
          <div>
            <Input
              id="name"
              state={errors.name ? "error" : "success"}
              showState={!!hasKey(errors, "name")}
              feedbackText={errors?.name?.message}
              className="name"
              {...register("name")}
            />
          </div>
        </div>

        {positions.map((position, positionIndex) => (
          <div key={positionIndex}>
            <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-4">
              <Label
                htmlFor={`positions[${positionIndex}].positionResourceId`}
                className="w-[100px] after:content-['*'] after:text-red-500 after:ml-2"
              >
                Position
              </Label>
              <Select
                id={`positions[${positionIndex}].positionResourceId`}
                feedbackText={errors?.positions?.[positionIndex]?.positionResourceId?.message}
                state={hasKey(errors, `positions.${positionIndex}.positionResourceId`) ? "error" : "success"}
                showState={!!hasKey(errors, `positions.${positionIndex}.positionResourceId`)}
                {...register(`positions[${positionIndex}].positionResourceId` as `positions.${number}.positionResourceId`)}
                onChange={(e) => {
                  handlePositionChange(e);
                }}
                placeholder="Select position"
                className="w-full"
              >
                <option value={0} disabled hidden>
                  Select position
                </option>
                {positionResources.map((item) => (
                  <option
                    key={item.positionResourceId}
                    value={item.positionResourceId}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
              <button
                    type="button"
                    onClick={() => handleDeletePosition(positionIndex)}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Delete Position
                  </button>
            </div>
            
            {position.toolLanguages.map((toolLanguage, languageIndex) => (
              <div key={languageIndex}>
                {languageIndex > 0 && <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
                  <span />
                  <span className="border border-dashed border-gray-400" />
                </div>  
                }
                <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-4">
                  <Label
                    htmlFor={`positions[${positionIndex}].toolLanguages[${languageIndex}].toolLanguageResourceId`}
                    className="w-[100px] after:content-['*'] after:text-red-500 after:ml-2"
                  >
                    Tool/Language
                  </Label>
                  <div className="flex gap-[20px]">
                    <Select
                      id={`positions[${positionIndex}].toolLanguages[${languageIndex}].toolLanguageResourceId`}
                      feedbackText={
                        errors?.positions?.[positionIndex]?.toolLanguages?.[languageIndex]?.toolLanguageResourceId?.message
                      }
                      state={
                        hasKey(
                          errors,
                          `positions.${positionIndex}.toolLanguages.${languageIndex}.toolLanguageResourceId`
                        )
                          ? "error"
                          : "success"
                      }
                      showState={
                        !!hasKey(
                          errors,
                          `positions.${positionIndex}.toolLanguages.${languageIndex}.toolLanguageResourceId`
                        )
                      }
                      {...register(`positions[${positionIndex}].toolLanguages[${languageIndex}].toolLanguageResourceId` as `positions.${number}.toolLanguages.${number}.toolLanguageResourceId`)}
                      placeholder="Select Tool/Language"
                      className="w-full"
                    >
                      <option value={0} disabled hidden>
                        Select Tool/Language
                      </option>
                      {positionResources
                        .find((item) => item.positionResourceId === position.positionResourceId)
                        ?.toolLanguageResources.map((option) => (
                          <option
                            key={option.toolLanguageResourceId}
                            value={option.toolLanguageResourceId}
                          >
                            {option.name}
                          </option>
                        ))}
                    </Select>
                    <div className="flex gap-3">
                      <Select
                        id={`positions[${positionIndex}].toolLanguages[${languageIndex}].from`}
                        {...register(`positions[${positionIndex}].toolLanguages[${languageIndex}].from` as `positions.${number}.toolLanguages.${number}.from`)}
                        placeholder="From"
                        feedbackText={
                          errors?.positions?.[positionIndex]?.toolLanguages?.[languageIndex]?.from?.message
                        }
                        state={
                          hasKey(errors, `positions.${positionIndex}.toolLanguages.${languageIndex}.from`)
                            ? "error"
                            : "success"
                        }
                        showState={
                          !!hasKey(errors, `positions.${positionIndex}.toolLanguages.${languageIndex}.from`)
                        }
                      >
                        <option value={0} disabled hidden>
                          From
                        </option>
                        {getYearsArray()?.map((y: number) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </Select>
                      -
                      <Select
                        id={`positions[${positionIndex}].toolLanguages[${languageIndex}].to`}
                        {...register(`positions[${positionIndex}].toolLanguages[${languageIndex}].to` as `positions.${number}.toolLanguages.${number}.to`)}
                        placeholder="To"
                        feedbackText={
                          errors?.positions?.[positionIndex]?.toolLanguages?.[languageIndex]?.to?.message
                        }
                        state={
                          hasKey(errors, `positions.${positionIndex}.toolLanguages.${languageIndex}.to`)
                            ? "error"
                            : "success"
                        }
                        showState={
                          !!hasKey(errors, `positions.${positionIndex}.toolLanguages.${languageIndex}.to`)
                        }
                      >
                        <option value={0} disabled hidden>
                          To
                        </option>
                        {getYearsArray()?.map((y: number) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteToolLanguage(positionIndex, languageIndex)}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Delete Tool/Language
                  </button>
                </div>

                <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
                  <span className="w-[100px]" />
                  <div>
                    <Textarea
                      id={`positions[${positionIndex}].toolLanguages[${languageIndex}].desc`}
                      state={
                        errors?.positions?.[positionIndex]?.toolLanguages?.[languageIndex]?.desc
                          ? "error"
                          : "success"
                      }
                      showState={
                        !!hasKey(errors, `positions.${positionIndex}.toolLanguages.${languageIndex}.desc`)
                      }
                      feedbackText={
                        errors?.positions?.[positionIndex]?.toolLanguages?.[languageIndex]?.desc?.message
                      }
                      className="desc"
                      placeholder="Description ..."
                      {...register(`positions[${positionIndex}].toolLanguages[${languageIndex}].desc` as `positions.${number}.toolLanguages.${number}.desc`)}
                    />
                  </div>
                </div>

                <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
                  <span />
                  <label className="flex flex-col justify-center border-2 w-[100px] h-[100px] border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Update
                      </p>
                    </div>
                    <input
                      id={`positions[${positionIndex}].toolLanguages[${languageIndex}].images`}
                      type="file"
                      className="hidden"
                      {...register(`positions[${positionIndex}].toolLanguages[${languageIndex}].images` as `positions.${number}.toolLanguages.${number}.images`)}
                    />
                  </label>
                </div>
              </div>
            ))}

            <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
              <span />
              <button
                type="button"
                onClick={() => handleAddToolLanguage(positionIndex)}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Add Tool/Language
              </button>
            </div>
            <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
           <span />
           <span className="border-t-2 border-gray-300" />
         </div>
          </div>
        ))}

        <div className="mb-[10px] grid grid-cols-10-30-60 gap-5 items-center mb-[2rem]">
          <span />
          <button
            type="button"
            onClick={addPosition}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Add Position
          </button>
        </div>

        <div className="flex justify-between">
          <span />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[120px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainCreateEmployee;
