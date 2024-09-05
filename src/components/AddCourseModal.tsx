import { useCallback, useState } from "react";
import { X } from "lucide-react";
import * as Yup from "yup";

import axiosClient from "../config/axiosClient";

import { Button } from "./Button";
import { AddCourseInput } from "./AddCourseInput";

interface IAddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateData: () => void;
}

export const AddCourseModal = ({
  isOpen,
  onClose,
  onUpdateData,
}: IAddCourseModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subjectInfo, setSubjectInfo] = useState("");
  const [courseNumberInfo, setCourseNumberInfo] = useState("");
  const [descriptionInfo, setDescriptionInfo] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const payload = {
        subject: subjectInfo,
        courseNumber: courseNumberInfo,
        description: descriptionInfo,
      };

      const schema = Yup.object().shape({
        subject: Yup.string().required("Subject is required"),
        courseNumber: Yup.string().required("Course Number is required"),
        description: Yup.string().required("Description is required"),
      });

      await schema.validate(payload, {
        abortEarly: false,
      });

      await axiosClient.post("/courses", payload);

      alert("Course record added successfully");

      onUpdateData();
      onClose();

      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);

      if (error instanceof Yup.ValidationError) {
        alert("Verify the form and try again");

        return;
      }

      alert("Unable to create course");
    }
  }, [onClose, subjectInfo, courseNumberInfo, descriptionInfo, onUpdateData]);

  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen fixed flex items-center justify-center z-50 bg-slate-700/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6px]">
          <div className="shadow-custom-shadow rounded-xl p-6 bg-white flex items-center justify-center flex-col w-96 gap-4">
            <div className="w-full mb-5 shadow-custom-shadow rounded-xl p-6 bg-white flex items-center justify-between flex-row">
              <h1 className="text-slate-400 text-lg">
                Create a course records
              </h1>

              <button onClick={onClose}>
                <X
                  size={20}
                  className="text-red-500 hover:text-red-600 transition-all"
                />
              </button>
            </div>

            <AddCourseInput
              title="Subject"
              placeHolder="Enter the subject"
              onTyping={(e) => setSubjectInfo(e)}
            />

            <AddCourseInput
              title="Course Number"
              placeHolder="Enter the course number. eg: 033"
              onTyping={(e) => setCourseNumberInfo(e)}
              type="courseNumber"
            />

            <AddCourseInput
              title="Description"
              placeHolder="Enter the description"
              onTyping={(e) => setDescriptionInfo(e)}
            />

            <div className="w-full mt-6 flex flex-row items-center justify-end gap-4">
              <Button text="Cancel" style="outlined-red" onClick={onClose} />

              <Button
                text={isLoading ? "Loading..." : "Create"}
                onClick={isLoading ? () => {} : handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
