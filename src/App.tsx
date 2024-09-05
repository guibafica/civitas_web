import { useCallback, useEffect, useState } from "react";

import axiosClient from "./config/axiosClient";

import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Loading } from "./components/Loading";
import { AddCourseModal } from "./components/AddCourseModal";

export interface ICoursesProps {
  id: number;
  courseNumber: string;
  created_at: string;
  description: string;
  subject: string;
}

interface IPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface IResponseProps {
  data: {
    courses: ICoursesProps[];
    pagination: IPaginationProps;
  };
}

interface ILoadDataProps {
  description?: string;
  page?: number;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<ICoursesProps[]>([]);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [paginationData, setPaginationData] = useState<IPaginationProps>(
    {} as IPaginationProps
  );
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);

  const handleAddCourse = useCallback(() => {
    setIsAddCourseModalOpen(true);
  }, []);

  const handleCloseCourseModal = useCallback(() => {
    setIsAddCourseModalOpen(false);
  }, []);

  const loadData = useCallback(
    async ({ page, description }: ILoadDataProps) => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (description) params.append("description", description);

        const courses: IResponseProps = await axiosClient.get(
          `/courses?${params.toString()}`
        );

        setCourses(courses.data.courses);
        setPaginationData(courses.data.pagination);
        setPage(courses.data.pagination.currentPage);

        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);

        console.log("Unable to load data: ", error);
      }
    },
    []
  );

  const handleSearch = useCallback((text: string) => {
    setDescription(text);
    setPage(1);
  }, []);

  const handleDeleteCourse = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);

        const confirmDeleteCourse = confirm(
          "Are you sure you want to delete the course record?"
        );

        if (confirmDeleteCourse) {
          await axiosClient.delete(`/courses/${id}`);

          alert("Course record deleted successfully");

          loadData({
            description,
            page,
          });
        }

        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);

        alert("Unable to delete course");
      }
    },
    [loadData, description, page]
  );

  useEffect(() => {
    loadData({
      description,
      page,
    });
  }, [loadData, description, page]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Header onTextSearch={(text) => handleSearch(text)} />
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={handleCloseCourseModal}
        onUpdateData={() => loadData({ description, page })}
      />

      <div className="w-screen h-screen bg-slate-100 flex items-start justify-center px-10 pt-32">
        {courses.length > 0 ? (
          <Table
            data={courses}
            onAddCourseButtonClick={handleAddCourse}
            onDelete={(id) => handleDeleteCourse(id)}
            currentPage={paginationData?.currentPage}
            hasNextPage={paginationData?.hasNextPage}
            totalItems={paginationData?.totalItems}
            totalPages={paginationData?.totalPages}
            onChangePage={(page) => loadData({ page, description })}
          />
        ) : (
          <div className="shadow-custom-shadow rounded-xl p-6 bg-white flex items-center justify-center">
            <h1 className="text-slate-600">No items found :(</h1>
          </div>
        )}
      </div>

      <div className="w-full h-40" />
    </>
  );
}

export default App;
