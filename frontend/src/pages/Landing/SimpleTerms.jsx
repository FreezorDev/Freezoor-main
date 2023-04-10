import React from "react";
import hashTagIcon from "../../assets/hashTagIcon.svg";
import timestampIcon from "../../assets/timestampIcon.svg";
import fileIcon from "../../assets/fileIcon.svg";
const SimpleTerms = () => {
  return (
    <div>
      <p className="text-xl sm:text-2xl leading-relaxed tracking-wide font-thin mt-10">
        In Simple terms,
      </p>

      <div className="flex space-x-1 justify-between">
        <div className="">
          <img src={fileIcon} alt="file icon" />
          <p>Your File</p>
        </div>

        <div className="py-2 rounded-lg shadow-xl w-80">
          <div className="flex justify-center flex-col items-center my-3">
            <img src={hashTagIcon} alt="hash tag icon" />
            <p>DFCD3354EEBA4321CUXI</p>
          </div>

       

          <div className="bg-[#e0e3ff] justify-center py-2">
            <p className="text-center">Alphanumeric string</p>
            <p className="text-center font-semibold">Hash</p>
          </div>

          <div className="px-4">
            <p className="font-semibold">Alphanumeric random string</p>
            <p className="mt-4 ">
              {" "}
              <span className="font-semibold">One way:</span> No one including
              us can trace back to the file using string
            </p>
            <p className="mt-4 ">
              {" "}
              <span className="font-semibold">Deterministic: </span> Will yield
              same string when same document is uploaded
            </p>
            <p className="mt-4 ">
              {" "}
              <span className="font-semibold">
                Provable and printed on your timestamp certificate.
              </span>
            </p>
          </div>
        </div>

        <div className="py-2 rounded-lg shadow-xl w-80">
          <div className="flex justify-center flex-col items-center my-3">
            <img src={timestampIcon} alt="hash tag icon" />
            <p className="font-semibold">Timestamping on Blockchain</p>
          </div>

          <div className="bg-[#e0e3ff] justify-center py-2">
            <p className="text-center">Alphanumeric string is</p>
            <p className="text-center font-semibold">Immutable</p>
          </div>

          <div className="px-4">
            <p className="mt-4 ">
              {" "}
              <span className="font-semibold">immutable</span> i.e, cannot be
              changed
            </p>
            <p className="mt-4 ">
              {" "}
              <span className="font-semibold">
                Any hash uploaded on the Blockchain will be recorded forever.{" "}
              </span>{" "}
            </p>
          </div>


         
        </div>
      </div>
    </div>
  );
};

export default SimpleTerms;
