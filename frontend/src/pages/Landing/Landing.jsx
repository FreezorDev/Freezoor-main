import React from "react";
import Navbar from "../../Components/Navbar";
import freezor_illustration_1 from "../../assets/freezor_illustration_1.svg";
import UploadFileSection from "./UploadFileSection";
import SimpleTerms from "./SimpleTerms";
import tweetExample from "../../assets/tweetExample.svg";

export default function Landing() {
  return (
    <div className="mb-72">
      <Navbar />

      <div className="flex justify-center flex-col sm:flex-row sm:w-4/5 mx-auto sm:mt-28 mt-10 px-2 sm:space-x-72">
        <p className="text-xl sm:text-3xl leading-relaxed tracking-wide font-semibold">
          Looking for tamper-resistant, proof of the existence of a digital
          asset that is admissible in the court of law? Documents,
          Presentations, Files, we’ve got it all covered.
        </p>
        <img
          src={freezor_illustration_1}
          alt="Freezor Illustration "
          className="px-3 mt-2 sm:mt-0 "
        />
      </div>
      <div className="sm:w-4/5 mx-auto sm:mt-10 mt-7 ">
        <UploadFileSection />
      </div>

      <div className="flex flex-col sm:w-4/5 mx-auto mt-10 px-2 ">
        <p className="text-xl sm:text-3xl leading-relaxed tracking-wide font-semibold">
          How does it work?
        </p>
        <p className="text-lg leading-relax tracking-wide mt-10">
          Your file is converted into an alphanumeric string called hash.
          Nobody, including us, can trace back to your document using this hash.
          We upload this hash on a Blockchain which is an immutable database
          i.e. cannot be changed. As a result, you now have a tamper-resistant
          proof of ownership of a document/file. 
        </p>
        <SimpleTerms />
      </div>

      <div className="flex justify-center flex-col sm:flex-row sm:w-4/5 mx-auto sm:mt-28 mt-10 px-2 sm:space-x-72">
        <div>
        <p className="text-xl sm:text-3xl leading-relaxed tracking-wide font-semibold">
          How do I prove this in the court?
        </p>
        <p className="leading-realxed tracking-wide mt-10">
          Simply download our timestamp certificate and keep it handy. <br></br> <br></br>The
          certificate includes the hash number of the document. Every time you
          will try to upload the same document (with absolutely no changes) on
          our platform it will generate the same hash number. Since this hash
          number is on Blockchain (as shown in the certificate), the existence
          of the document is proved. 
        </p>
        </div>
        <img
          src={tweetExample}
          alt="tweetExample"
          className="px-3 mt-2 sm:mt-0 "
        />
      </div>
    </div>
  );
}
