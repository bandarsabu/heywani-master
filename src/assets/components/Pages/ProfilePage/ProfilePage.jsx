import Footer from "../../Fragments/Footer/Footer";
import { Navbar } from "../../Fragments/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const profilePicture = "/images/ProfilePage/foto_profil.png";
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(profilePicture);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [isToken, setToken] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/logout");
      localStorage.clear();
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    refreshToken();
    fetchUserData();
  }, []);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const refreshToken = () => {
    try {
      const tokenStorage = localStorage.getItem("token");
      if (tokenStorage) {
        setToken(true);
      } else {
        setToken(false);
      }
      const decoded = parseJwt(tokenStorage);
      setName(decoded.name);
      setEmail(decoded.email);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user");
      const user = response.data;
      setName(user.name);
      setJob(user.job);
      setGender(user.gender);
      setEmail(user.email);
      setBirthdate(user.birthdate);
      setPhone(user.phone);
      setAddress(user.address);
      setProfileImage(user.profileImage || profilePicture);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMsg("Gagal memuat data pengguna.");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-7xl w-full mx-auto mt-40 mb-20">
          {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}
          <div className="flex items-center border border-black rounded-lg p-4 mb-8 relative gap-12">
            <input
              type="file"
              id="profile-picture-input"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              src={profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full cursor-pointer object-cover"
              onClick={() =>
                document.getElementById("profile-picture-input").click()
              }
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Hai</h2>
              <p className="text-black text-xl font-bold">{name}</p>
            </div>
          </div>
          <div className="border border-black rounded-lg p-8 relative gap-12">
            <h3 className="text-xl font-semibold mb-6">Informasi Pribadi</h3>
            <button className="bg-[#FA9F42] text-white py-2 px-4 rounded-lg absolute top-4 right-4">
              <Link to="/edit-profile">Edit</Link>
            </button>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="name">
                  Nama
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="text"
                  id="name"
                  value={name}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="job">
                  Pekerjaan
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="text"
                  id="job"
                  value={job}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="gender">
                  Jenis Kelamin
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="text"
                  id="gender"
                  value={gender}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="email"
                  id="email"
                  value={email}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="birthdate">
                  Tanggal Lahir
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="text"
                  id="birthdate"
                  value={birthdate}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="phone">
                  Nomor Telepon
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="tel"
                  id="phone"
                  value={phone}
                  readOnly
                />
              </div>
              <div className="form-group flex flex-col">
                <label className="text-gray-600 mb-2" htmlFor="address">
                  Alamat
                </label>
                <input
                  className="p-2 border border-black rounded-md text-gray-700"
                  type="text"
                  id="address"
                  value={address}
                  readOnly
                />
              </div>
            </form>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-xl col-span-1 md:col-span-2 justify-self-center mt-10"
          >
            Keluar
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
