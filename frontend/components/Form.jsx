import { useFormik } from "formik";
import { object, string, number } from "yup";

export default function Form() {
  const formik = useFormik({
    initialValues: {
      description: "",
      requestedContribution: "",
    },
    validationSchema: object({
      description: string()
        .min(10, "Must be at least 10 characters")
        .max(100, "Must be 100 character or less!")
        .required("This field is required!"),
      requestedContribution: number()
        .max(18, "Must be 18 character or less!")
        .required("This field is required!")
        .positive(),
    }),
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
          {formik.touched.description && formik.errors.description ? (
            <div className="w-1/2 mt-2 bg-red-600 rounded-lg text-white">
              <span className="p-2">{formik.errors.description}</span>
            </div>
          ) : null}
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
          {formik.touched.requestedContribution &&
          formik.errors.requestedContribution ? (
            <div className="w-1/2 mt-2 bg-red-600 rounded-lg text-white">
              <span className="p-2">{formik.errors.requestedContribution}</span>
            </div>
          ) : null}
        </div>
        <button className="w-1/4 mt-4 border-solid border border-violet-800 rounded-lg hover:bg-gradient-to-br from-orange-600 to-violet-700 hover:text-white">
          Submit
        </button>
      </div>
    </form>
  );
}
