import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/slices/CourseSlice';
import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../Layouts/HomeLayout';

const AllCourseList = () => {
    const dispatch = useDispatch();
    const {courseData} = useSelector((state)=>state.course);

    async function loadCourses(){
        await dispatch(getAllCourses());
    }
    useEffect(()=>{
        loadCourses();
    },[]);
  return (
    <HomeLayout>
            <div className="min-h-[90vh] pl-5 pt-12 sm:pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center mt-5 sm:mt-0 text-xl sm:text-3xl font-semibold mb-1 sm:mb-5">
                    Explore the courses made by &nbsp;
                    <span className="font-bold text-yellow-500">
                        Industry experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((element) => {
                        return <CourseCard key={element._id} data={element} />
                    })}
                </div>
                

            </div>
        </HomeLayout>
  )
}

export default AllCourseList
