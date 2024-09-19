import { useState } from "react";
import { Link } from "react-router-dom";
import subscription from "../assets/subscription.jpg";
import Modal from "../components/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF

export default function Signup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [instructionType, setInstructionType] = useState(""); // Track which button is clicked

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    email_error: "",
    password_error: "",
    confirm_password_error: "",
    selectedCheckboxes: [],
  });

  const {
    fullname,
    email,
    password,
    confirm_password,
    email_error,
    password_error,
    confirm_password_error,
    selectedCheckboxes,
  } = formData;

  // Handle Download Button Click
  const handleDownloadButtonClick = (type) => {
    setInstructionType(type);
    setShowDownloadModal(true);
  };

  const handleDownloadInstructions = () => {
    const doc = new jsPDF();
    let instructions = "";

    if (instructionType === "bios") {
      instructions = `Instructions to Install into System 32/BIOS:

1. Open the BIOS menu by pressing the BIOS key.
2. Navigate to the "System 32" folder in File Explorer.
3. Run the installer and follow the prompts.
4. Restart your computer after installation.
5. Verify the BIOS settings after installation.`;
    } else if (instructionType === "taskScheduler") {
      instructions = `Instructions to Install into Task Scheduler:

1. Open Task Scheduler from the Start menu.
2. Click on "Create Task" on the right panel.
3. In the "General" tab, name the task and set your preferences.
4. Navigate to the "Actions" tab and select the installer script.
5. Confirm the schedule and run the task.`;
    }

    doc.text(instructions, 10, 10);
    doc.save(`installation_instructions_${instructionType}.pdf`);
  };

  const handleCloseDownloadModal = () => {
    setShowDownloadModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        errorMessage = "Invalid email address";
      }
    } else if (name === "password") {
      if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters long";
      }
    } else if (name === "confirm_password") {
      if (value !== formData.password) {
        errorMessage = "Passwords do not match";
      }
    }

    setFormData({
      ...formData,
      [name]: value,
      [name + "_error"]: errorMessage,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        selectedCheckboxes: [...selectedCheckboxes, name],
      });
    } else {
      setFormData({
        ...formData,
        selectedCheckboxes: selectedCheckboxes.filter(
          (checkbox) => checkbox !== name
        ),
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          fullname,
          email,
          password,
          selectedCheckboxes,
        }
      );
      if (response.data.success) {
        alert("Signup successful");
        localStorage.setItem("token", response.data.token);
        navigate("/chats");
      } else {
        alert("Signup failed");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isPasswordValid = password.length >= 6;

    const isConfirmPasswordValid = password === confirm_password;

    return (
      fullname &&
      email &&
      password &&
      confirm_password &&
      emailRegex.test(email) &&
      isPasswordValid &&
      isConfirmPasswordValid
    );
  };

  return (
    <>
      <div className="flex justify-center relative">
  <h1 className="absolute top-64 text-8xl font-extrabold">
    D O W N L O A D S
  </h1>
  <img src={subscription} alt="subs" />
  <div className="absolute top-96 flex space-x-4">
    <button
      onClick={() => handleDownloadButtonClick("bios")}
      className="text-white font-bold text-lg py-3 px-8 border-2 border-white rounded-lg bg-transparent shadow-inner hover:shadow-[0_0_15px_#ec4e00,inset_0_0_10px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out"
    >
      Install into system 32/BIOS
    </button>
    <button
      onClick={() => handleDownloadButtonClick("taskScheduler")}
      className="text-white font-bold text-lg py-3 px-8 border-2 border-white rounded-lg bg-transparent shadow-inner hover:shadow-[0_0_15px_#ec4e00,inset_0_0_10px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out"
    >
      Install into Task Scheduler
    </button>
  </div>
</div>

      {/* Modal for different instructions */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Installation Instructions</h2>
            <ul className="list-disc list-inside space-y-2">
              {instructionType === "bios" && (
                <>
                  <li>Open the BIOS menu by pressing the BIOS key.</li>
                  <li>Navigate to the "System 32" folder in File Explorer.</li>
                  <li>Run the installer and follow the prompts.</li>
                  <li>Restart your computer after installation.</li>
                  <li>Verify the BIOS settings after installation.</li>
                </>
              )}
              {instructionType === "taskScheduler" && (
                <>
                  <li>Open Task Scheduler from the Start menu.</li>
                  <li>Click on "Create Task" on the right panel.</li>
                  <li>Name the task and set your preferences in the "General" tab.</li>
                  <li>In the "Actions" tab, select the installer script.</li>
                  <li>Confirm the schedule and run the task.</li>
                </>
              )}
            </ul>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleCloseDownloadModal}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={handleDownloadInstructions}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Download Instructions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        onChange={handleCheckboxChange}
      />
    </>
  );
}
