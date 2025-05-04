import { useState } from "react";
import { useEffect } from "react";
import AllCourse from "./AllCourse";


const Courses = () => {

    const [first, setFirst] = useState([]);
    useEffect(() => {
      fetch(`https://itder.com/api/get-course-list`)
        .then((res) => res.json())
        .then((data) => {
          // const nike = data.filter(data=>data.brand == 'Nike')
          setFirst(data.courseData);
        //   console.log(data.courseData)
        });
    }, []);

    console.log(first)

    return (
        <div className="m-mt_16px">
          

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    
            {first.map((item, index) => {
          return <AllCourse key={index} item={item} />;
        })}

                    

            </div>
        </div>
    );
};

export default Courses;