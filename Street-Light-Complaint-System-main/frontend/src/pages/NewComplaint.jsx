import Signature from "../components/Signature";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImageStorage } from "../../services/firebaseConfig";
import { v4 } from "uuid";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const types = [
  {
    id: 1,
    name: "INDIVIDUAL",
  },
  {
    id: 2,
    name: "METER",
  },
  {
    id: 3,
    name: "EMERGENCY",
  },
  {
    id: 4,
    name: "AREA",
  },
  {
    id: 5,
    name: "CMHOUSE",
  },
  {
    id: 6,
    name: "STREETLIGHT",
  },
];

export default function NewComplaint() {
  const [signatureTab, setSignatureTab] = useState("");
  const [image, setImage] = useState();
  const [signatureLink, setSignatureLink] = useState();

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"))?.user || null;
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const [location, setLocation] = useState("");
  const [centre, setCentre] = useState("");
  const [category, setCategory] = useState("");
  const [fault, setFault] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [division, setDivision] = useState("");
  const [centrePhone, setCentrePhone] = useState("");
  const [callerPhone, setCallerPhone] = useState(user?.phoneNo || "");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [remarks, setRemarks] = useState("");

  const [allAreas, setAllAreas] = useState([]);
  const [allCentres, setAllCentres] = useState([]);
  const [allDivision, setAllDivision] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(
    //   "values: ",
    //   alternatePhone,
    //   area,
    //   address,
    //   name,
    //   callerPhone,
    //   category,
    //   centre,
    //   centrePhone,
    //   division,
    //   location,
    //   remarks,
    //   fault
    // );
    // console.log('images: ', image, signatureLink);

    try {
      const response = await axios
        .post(
          "https://street-light-complaint-system.onrender.com/api/v1/complaints/create",
          {
            username: user?.username || null,
            alternatePhone,
            area,
            callerAddress: address,
            callerName: name,
            callerPhone,
            category,
            complainCentre: centre,
            complainCentrePhone: centrePhone,
            division,
            location,
            remarks,
            picture: image,
            signature: signatureLink,
            typeOfFault: fault,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // console.log(response);
          alert("Complaint Submitted Successfully");
          navigate("/complaint");
        })
        .catch((error) => {
          console.error("Error creating complaint:", error);
          alert("Fill all the fields");
        });
      console.log("response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignatureTab = (e) => {
    e.preventDefault();
    setSignatureTab(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setArea("");
    setLocation("");
    setCentre("");
    setCategory("");
    setFault("");
    setName("");
    setAddress("");
    setDivision("");
    setCentrePhone("");
    setCallerPhone("");
    setAlternatePhone("");
    setRemarks("");
    setImage("");
    setSignatureLink("");
  };

  const handleImage = (e) => {
    const imageUploaded = e.target.files[0];

    const imgRef = ref(ImageStorage, `images/${v4()}`);
    uploadBytes(imgRef, imageUploaded).then((snapshot) => {
      // console.log("Uploaded a blob or file!", snapshot);
      setImage(snapshot.metadata.fullPath);
      // console.log('image:', image);
    });
    // console.log('imgRef: ', imgRef);
  };

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const data = await axios.get("https://street-light-complaint-system.onrender.com/api/v1/complaints/allarea/a");
        // console.log('data', data);
        setAllAreas(data.data.data);
      } catch (error) {
        // alert("Error fetching areas");
      }
    };
    fetchArea();
  }, []);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const data = await axios.get(`https://street-light-complaint-system.onrender.com/api/v1/complaints/center/${area}`);
        setAllCentres(data.data.data);
      } catch (error) {
        // alert("Error fetching centers");
      }
    };
    fetchCentres();
  }, [area]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const data = await axios.get(`https://street-light-complaint-system.onrender.com/api/v1/complaints/division/${centre}`);
        // console.log("data", data.data);
        setAllDivision(data.data.data);
      } catch (error) {
        // console.error("Error fetching division:", error);
      }
    };
    fetchDivisions();
  }, [centre, area]);

  useEffect(() => {
    if (division) {
      // console.log("division", division);
      const divisionData = allDivision.find((div) => div._id === division);
      // console.log('divisionData', divisionData);

      if (divisionData) {
        setCentrePhone(divisionData.centrePhone);
      } else {
        setCentrePhone("");
      }
    }
  }, [division, allDivision]);

  return (
    <>
      <Link to={"/"}>
        <Navigation text="Street Light Complaint" />
      </Link>
      <main className="mx-2 overflow-y-scroll h-[90vh] ">
        <div className="text-2xl font-bold text-center mx-10 text-red-500 border py-4 mb-8 rounded-lg">
          New Complaint Page
        </div>

        <form className="flex flex-col items-start gap-4 mx-10 sm:mx-20 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="area" className="text-blue-500">
              Area
            </label>
            <select
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            >
              <option value="" className="bg-black/60">
                Select Area
              </option>
              {allAreas?.map((ar, index) => (
                <option value={ar._id} key={index} className="bg-black/90">
                  {ar._id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="centre" className="text-blue-500">
              Complaint Centre
            </label>
            <select
              type="text"
              id="centre"
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            >
              <option value="" className="bg-black/60">
                Select Centre
              </option>

              {allCentres.map((cen) => (
                <option value={cen._id} className="bg-black/90">
                  {cen._id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="category" className="text-blue-500">
              Complaint Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="fault" className="text-blue-500">
              Type of Fault
            </label>
            <select
              type="text"
              id="fault"
              value={fault}
              onChange={(e) => setFault(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            >
              <option value="" className="bg-black/60">
                Select Fault Type
              </option>
              {types.map((type) => (
                <option value={type.name} className="bg-black/90">
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="name" className="text-blue-500">
              Caller Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="address" className="text-blue-500">
              Caller Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="division" className="text-blue-500">
              Division
            </label>
            <select
              type="text"
              id="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            >
              <option value="" className="bg-black/60">
                Select Division
              </option>
              {allDivision.map((div) => (
                <option value={div._id} className="bg-black/90">
                  {div._id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="centrePhone" className="text-blue-500">
              Complaint Center Phone
            </label>
            <input
              type="text"
              id="centrePhone"
              disabled={true}
              value={centrePhone}
              onChange={(e) => setCentrePhone(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="callerPhone" className="text-blue-500">
              Caller Phone
            </label>
            <input
              type="text"
              id="callerPhone"
              value={callerPhone}
              onChange={(e) => setCallerPhone(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="alternatePhone" className="text-blue-500">
              Alternate Phone
            </label>
            <input
              type="text"
              id="alternatePhone"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="remarks" className="text-blue-500">
              Remarks
            </label>
            <input
              type="text"
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="location" className="text-blue-500">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border-b-2 w-full bg-transparent border-gray-500 text-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 pb-10 items-center justify-center w-full gap-8 mt-10 align-middle text-center px-8">
            {/* buttons for camera, signature, register and reset */}

            <div className="flex relative border-2 h-full border-red-500 rounded-lg hover:bg-red-500 w-full transition-all duration-500">
              <span className="w-full h-full p-2 font-semibold justify-center items-center">
                Upload Image
              </span>
              <input
                type="file"
                onChange={handleImage}
                className="absolute opacity-0 block bg-transparent top-0 w-full p-2 rounded-lg hover:bg-red-600 cursor-pointer border-red-600 transition-all duration-500"
                required
              />
            </div>
            <button
              onClick={handleSignatureTab}
              className="bg-transparent  border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Signature
            </button>
            <button
              type="submit"
              onClick={handleRegister}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Register
            </button>

            <button
              type="submit"
              onClick={handleReset}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Reset
            </button>
          </div>
        </form>
        {signatureTab && (
          <Signature
            setSignatureLink={setSignatureLink}
            onClose={() => setSignatureTab(false)}
          />
        )}
      </main>
    </>
  );
}
