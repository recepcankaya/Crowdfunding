import { useState } from "react";
import { useFormik } from "formik";

export default function Form() {
  const formik = useFormik({
    initialValues: {
      description: "",
      requestedContribution: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      className="w-2/5 mx-auto mt-20 p-8 border-solid border-2 border-violet-600 rounded-lg"
      onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <label htmlFor="description">
            Please enter the description of your project to get funded
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-1/2 h-8 mt-2 pl-2 border-solid border border-orange-600 rounded-md focus:outline-0"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="requestedContribution">
            Please enter the requested amount for your project
          </label>
          <input
            type="number"
            id="requestedContribution"
            name="requestedContribution"
            onChange={formik.handleChange}
            value={formik.values.requestedContribution}
            className="w-1/2 h-8 mt-2 pl-2 border-solid border border-orange-600 rounded-md focus:outline-0"
          />
        </div>
        <button className="w-1/4 mt-4 border-solid border border-violet-800 rounded-lg hover:bg-gradient-to-br from-orange-600 to-violet-700 hover:text-white">
          Submit
        </button>
      </div>
    </form>
  );
}
