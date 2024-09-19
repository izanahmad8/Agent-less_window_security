import React from "react";

export default function Modal({ isOpen, onClose, onSubmit, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <div className="text-black mb-2">
          <h2 className="text-xl font-bold mb-4">Web Pentesting</h2>
          <input
            type="checkbox"
            name="SQL Injection"
            id="sql"
            value="SQL Injection"
            onChange={onChange}
          />
          <label htmlFor="sql"> SQL Injection</label>
          <br />
          <input
            type="checkbox"
            name="Cross site scripting (XSS)"
            id="xss"
            value="Cross site scripting (XSS)"
            onChange={onChange}
          />
          <label htmlFor="xss"> Cross site scripting (XSS)</label>
          <br />
          <input
            type="checkbox"
            name="Sensitive data exposure"
            id="data"
            value="Sensitive data exposure"
            onChange={onChange}
          />
          <label htmlFor="data"> Sensitive data exposure</label>
          <br />
          <input
            type="checkbox"
            name="Security misconfiguration"
            id="mis"
            value="Security misconfiguration"
            onChange={onChange}
          />
          <label htmlFor="mis"> Security misconfiguration</label>
          <br />
          <input
            type="checkbox"
            name="Insecure file uploads"
            id="file"
            value="Insecure file uploads"
            onChange={onChange}
          />
          <label htmlFor="file"> Insecure file uploads</label>
        </div>
        <hr />
        <div className="text-black mb-2">
          <h2 className="text-xl font-bold mb-4">Network Testing</h2>
          <input
            type="checkbox"
            name="Discover Entry Point"
            id="dis"
            value="Discover Entry Point"
            onChange={onChange}
          />
          <label htmlFor="dis"> Discover Entry Point</label>
          <br />
          <input
            type="checkbox"
            name="Network Configuration"
            id="conf"
            value="Network Configuration"
            onChange={onChange}
          />
          <label htmlFor="conf"> Network Configuration</label>
          <br />
          <input
            type="checkbox"
            name="Detect chainable weakness"
            id="chain"
            value="Detect chainable weakness"
            onChange={onChange}
          />
          <label htmlFor="chain"> Detect chainable weakness</label>
        </div>
        <hr />
        <div className="text-black">
          <h2 className="text-xl font-bold mb-4">API Testing</h2>
          <input
            type="checkbox"
            name="Authentication & Authorization issues"
            id="auth"
            value="Authentication & Authorization issues"
            onChange={onChange}
          />
          <label htmlFor="auth"> Authentication & Authorization issues</label>
          <br />
          <input
            type="checkbox"
            name="Lack of Input validations"
            id="valid"
            value="Lack of Input validations"
            onChange={onChange}
          />
          <label htmlFor="valid"> Lack of Input validations</label>
          <br />
          <input
            type="checkbox"
            name="Session Management"
            id="session"
            value="Session Management"
            onChange={onChange}
          />
          <label htmlFor="session"> Session Management</label>
          <br />
          <input
            type="checkbox"
            name="Injection Flaws"
            id="flaws"
            value="Injection Flaws"
            onChange={onChange}
          />
          <label htmlFor="flaws"> Injection Flaws</label>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
