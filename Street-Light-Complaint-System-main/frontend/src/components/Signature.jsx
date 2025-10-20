import React, { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { X } from "lucide-react";
import { ImageStorage } from "../../services/firebaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Signature({ onClose, setSignatureLink }) {
  const [signature, setSignature] = useState(null);
  const [signatureData, setSignatureData] = useState(null);

  const handleClear = () => {
    signature.clear();
    setSignature(null);
    setSignatureData(null);
  };

  useEffect(() => {
    console.log('signatureData', signatureData);
    console.log("signature",typeof signature?.toDataURL("image/png"),  signature?.toDataURL("image/png"));
    
    
  }, [signature, signatureData]);

  const handleGetSignature = () => {
    setSignatureData(signature.toDataURL("image/png"));

    setSignatureLink(signature?.toDataURL("image/png"));

    console.log("signatureData", signature?.toDataURL("image/png"));

    onClose();

  };

  return (
    <div className="fixed flex justify-center z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="mt-60 flex flex-col gap-2">
        <button className="place-self-end" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="bg-white border-2 border-gray-300 rounded-lg ">
          <SignatureCanvas
            penColor="black"
            ref={(ref) => setSignature(ref)}
            backgroundColor="rgb(255, 255, 255)"
            canvasProps={{ width: 400, height: 200, className: "sigCanvas" }}
          />
          <div className="flex justify-center items-center gap-3 p-3">
            <button
              onClick={handleGetSignature}
              className="bg-red-100 text-red-500  border-2 border-red-400 p-0 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500"
            >
              Submit
            </button>
            <button
              onClick={handleClear}
              className="bg-red-100 text-red-500  border-2 border-red-400 p-0 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500"
            >
              Clear
            </button>
          </div>
        </div>
        {signatureData && <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Preview</p>
          <img src={signatureData} alt="" className="max-w-full h-auto" />
        </div>}
      </div>
    </div>
  );
}

export default Signature;
