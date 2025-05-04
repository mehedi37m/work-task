import  { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const [first, setFirst] = useState([]);
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [formNo, setFormNo] = useState("");
  const [photo, setPhoto] = useState(null); // for image upload

  useEffect(() => {
    fetch(`https://itder.com/api/get-course-list`)
      .then((res) => res.json())
      .then((data) => {
        setFirst(data.courseData);
      });
  }, []);

  const card = first.find((card) => card.id == id);

  if (!card) {
    return <div>Loading course details...</div>; // or a spinner
  }

  const discountPrice = parseFloat(card.discount_price || 0);
  const subtotal = discountPrice * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("formNo", formNo);
    formData.append("gender", gender);
    formData.append("bloodGroup", bloodGroup);
    formData.append("photo", photo);
    formData.append("courseId", card.id);
    formData.append("quantity", quantity);
    formData.append("subtotal", subtotal.toFixed(2));

    try {
      const response = await fetch("https://itder.com/api/course-purchase", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  //   need to get all purchaseData api.....

  return (
    <div className="  mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form className="bg-white shadow-md rounded-lg p-6">
        {/* Trainee Information Section */}
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                defaultValue="Full Name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no:
              </label>
              <input
                type="text"
                id="formNo"
                defaultValue="Form no"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                defaultValue="Father/Mother Name"
                type="text"
                id="parentName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Number:
              </label>
              <input
                defaultValue="Number"
                type="text"
                id="parentNumber"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                defaultValue="School/College name"
                type="text"
                id="school"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                defaultValue="Job Information"
                type="text"
                id="jobInfo"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                defaultValue="Email"
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                defaultValue="present address"
                id="presentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                defaultValue="permanent address"
                id="permanentAddress"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                defaultValue="NID number"
                type="text"
                id="nid"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                defaultValue="Mobile number"
                type="text"
                id="mobile"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian’s Name:
              </label>
              <input
                defaultValue="Guardian Name"
                type="text"
                id="guardianName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                className="w-full border border-gray-300 rounded-md p-2"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-base mb-2">
                Upload Photo:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <div className="pt-p_16px">
            <div className="lg:flex items-start gap-3">
              <div className="w-full lg:w-[58%] bg-white border-2">
                <table className=" overflow-x-auto  w-full">
                  <thead>
                    <tr className="border-b-4 border-gray-300">
                      <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                        Course
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Price
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Quantity
                      </th>
                      <th className="text-[14.4px] font-bold p-[7px] text-black">
                        Sub Total
                      </th>
                    </tr>
                  </thead>

                  <tbody className="overflow-x-auto ">
                    <tr className="border-b border-gray-300 overflow-x-auto">
                      <td>
                        <div className="flex items-center justify-center ">
                          <div className="w-[20%] text-center flex items-center justify-center ">
                            <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                          </div>
                          <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                            <div className="mask">
                              <img
                                className="h-[240px] w-[170px]"
                                src={card.photo}
                                alt="Course"
                              />
                            </div>
                            <p className="text-[14.4px] px-[7px] text-center flex ">
                              {card.course_name}
                              <span className="hidden lg:flex ">
                                - {card.trainer_data.name}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          {card.discount_price}
                        </p>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <div className="border">
                            <button
                              className="px-4 w-[30px] font-bold font_standard my-1.5"
                              onClick={handleDecrement}
                            >
                              -
                            </button>
                          </div>
                          <div className="border-y">
                            <input
                              type="number"
                              className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                              value={quantity}
                              readOnly
                            />
                          </div>
                          <div className="border">
                            <button
                              className="px-4 w-[30px] font-bold font_standard my-1.5"
                              onClick={handleIncrement}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                          {subtotal.toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="lg:w-[41%] bg-white border-2 ">
                <div className="px-[30px]">
                  <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                    Cart Summary
                  </h2>
                  <div className="py-3 flex justify-between border-b border-gray-300">
                    <p className="text-black font-bold">Total Price</p>
                    <p className="text-black font-bold">
                      BDT {subtotal.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onSubmit={handleSubmit}
                    className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
