import React from "react";
import { useState } from "react";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, JobCard, ListBox } from "../../components";
import { jobs, jobTypes } from "../../utils/data";
import { experience } from "../../utils/data";

const FindJob = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numberPage, setNumberPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);

  const [filterExp, setFilterExp] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // handle filter by job type
  const filterJobs = (val) => {
    // kiểm tra xem type job đã được user checked hay chưa
    if (filterJobTypes?.includes(val)) {
      // nếu trong mảng filterJobTypes đã có giá trị user checked thì sẽ không thêm vào nữa
      setFilterJobTypes(filterJobTypes.filter((item) => item != val));
    } else {
      // Tạo ra một một bản sao của mảng hiện tại và thêm 'val = value' vào cuối mảng
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  // handle filter by experience
  const filterExperience = async (e) => {
    setFilterExp(e);
  };
  // console.log(filterJobTypes);

  return (
    <div>
      <Header
        title="Find Your Dream Job With Ease"
        type="home"
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setJobLocation={setJobLocation}
      />
      <div
        className="container mx-auto flex gap-6 
        2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]"
      >
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm">
          <p className="text-lg font-semibold text-slate-600">Filter Search</p>
          {/* Filter by Job type */}
          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>
              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jobType, idx) => {
                return (
                  <div className="flex gap-2 text-sm md:text-base" key={idx}>
                    <input
                      type="checkbox"
                      value={jobType}
                      className="w-4 h-4"
                      onClick={(e) => filterJobs(e.target.value)}
                    />
                    <span>{jobType}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter by experience */}
          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {experience.map((exp) => (
                <div key={exp.title} className="flex gap-3">
                  <input
                    type="checkbox"
                    value={exp?.value}
                    className="w-4 h-4"
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base">
              Showing: <span className="font-semibold">1,902</span> Jobs
              Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
              <p className="text-sm md:text-base">Sort By:</p>
              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-4">
            {jobs.map((item, idx) => (
              <JobCard job={item} key={idx} />
            ))}
          </div>

          {numberPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-16">
              <CustomButton
                title="Load More"
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJob;
