import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { filterData, apiUrl } from "./data";
import { toast } from "react-toastify";


function App() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category,setCategory]=useState(filterData[0].title);

  //function for API call
  async function fetchData() {
    setLoading(true);
    try {
      const result = await fetch(apiUrl);
      const output = await result.json();
      //save data into variable after converting into json
      setCourses(output.data);
      console.log("Course Value Updated");
      console.log(courses);
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  //use effect for handing effects like to call an API
  useEffect(() => {
    //called API calling function
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-600">
      <div>
        <Navbar />
      </div>
      <div className="bg-slate-600 ">
        <div>
          <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
        </div>

        <div
          className={`w-11/12 mx-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh]`}
        >
          {loading ? <Spinner /> : <Cards courses={courses} category={category} />}
        </div>
      </div>
    </div>
  );
}

export default App;
