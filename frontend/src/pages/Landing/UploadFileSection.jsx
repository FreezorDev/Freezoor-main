import React from "react";
import fileIcon from "../../assets/fileIcon.svg";

function UploadFileSection(props) {
  return (
    <div className="bg-[#F3F8FF] w-full flex justify-center items-center h-128 border-[#d5ddff] border-4 rounded-lg  customShadow-1">
      <div className="flex flex-col justify-center items-center">
        <p className="brandText">Try for free!</p>
        <img src={fileIcon} alt="file icon" />
        <p className="text-[#828282]">Upload file or Drop files here!</p>
      </div>
    </div>
  );
}

export default UploadFileSection;
