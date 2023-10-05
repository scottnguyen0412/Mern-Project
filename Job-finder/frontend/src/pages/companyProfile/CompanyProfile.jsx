import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiEdit3, FiUpload, FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CompanyForm, CustomButton, JobCard, Loading } from "../../components";
import { companies, jobs } from "../../utils/data";

const CompanyProfile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  // const [info, setInfo] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const infoComp = companies.find((item) => item._id === parseInt(id));
  console.log(infoComp);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="">
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-gray-600 text-xl font-semibold">
            Welcome, {infoComp?.name}
          </h2>

          {user?.user?.accountType === undefined &&
            infoComp?._id === user?._id && (
              <div className="flex items-center justify-center py-5 md:py-0 gap-4">
                <CustomButton
                  onClick={() => setOpenForm(true)}
                  iconRight={<FiEdit3 />}
                  containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600
                  hover:bg-blue-700 text-white rounded text-sm md:text-base 
                  border border-blue-600`}
                />

                <Link to="/upload-job">
                  <CustomButton
                    title="Upload Job"
                    iconRight={<FiUpload />}
                    containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none
                    rounded text-sm md:text-base border border-blue-600`}
                  />
                </Link>
              </div>
            )}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm">
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <HiLocationMarker /> {infoComp?.location ?? "No Location"}
          </p>
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <AiOutlineMail /> {infoComp?.email ?? "No Email"}
          </p>
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full">
            <FiPhoneCall /> {infoComp?.contact ?? "No Contact"}
          </p>

          <div className="flex flex-col items-center mt-10 md:mt-0">
            <span className="text-xl">{infoComp?.jobPosts?.length}</span>
            <p className="text-blue-600 ">Job Post</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 flex flex-col gap-2">
        <p>Jobs Posted</p>

        <div className="flex flex-wrap gap-3">
          {jobs?.map((job, index) => {
            const data = {
              name: infoComp?.name,
              email: infoComp?.email,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>

      <CompanyForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
