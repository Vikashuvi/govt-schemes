import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Alert from '../components/Alert';

const EligibilityFormPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      gender: '',
      occupation: '',
      annualIncome: '',
      caste: '',
      maritalStatus: '',
      education: '',
      disability: 'No',
      state: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
      gender: Yup.string().required('Gender is required'),
      occupation: Yup.string().required('Occupation is required'),
      annualIncome: Yup.number().required('Annual income is required').min(0, 'Income cannot be negative'),
      caste: Yup.string().required('Caste/Category is required'),
      maritalStatus: Yup.string().required('Marital status is required'),
      education: Yup.string().required('Education qualification is required'),
      disability: Yup.string().required('Disability status is required'),
      state: Yup.string().required('State is required')
    }),
    onSubmit: (values) => {
      try {
        // In a real app, we would send this data to an API
        // For now, we'll just store it in localStorage and navigate
        localStorage.setItem('userProfile', JSON.stringify(values));
        navigate('/results');
      } catch (err) {
        setError('There was an error processing your request. Please try again.');
      }
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Find Eligible Government Schemes
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Fill in your details below to discover government schemes you may be eligible for.
          </p>

          {error && (
            <Alert 
              type="error" 
              message={error} 
              onClose={() => setError(null)} 
            />
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('fullName')}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.fullName}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.age && formik.errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('age')}
                />
                {formik.touched.age && formik.errors.age && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.age}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('gender')}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.gender}</p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <select
                  id="occupation"
                  name="occupation"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.occupation && formik.errors.occupation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('occupation')}
                >
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Government Employee">Government Employee</option>
                  <option value="Private Sector">Private Sector</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Retired">Retired</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.occupation && formik.errors.occupation && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.occupation}</p>
                )}
              </div>

              {/* Annual Income */}
              <div>
                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income (₹)
                </label>
                <input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.annualIncome && formik.errors.annualIncome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('annualIncome')}
                />
                {formik.touched.annualIncome && formik.errors.annualIncome && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.annualIncome}</p>
                )}
              </div>

              {/* Caste/Category */}
              <div>
                <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">
                  Caste/Category
                </label>
                <select
                  id="caste"
                  name="caste"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.caste && formik.errors.caste ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('caste')}
                >
                  <option value="">Select Caste/Category</option>
                  <option value="General">General</option>
                  <option value="SC/ST">SC/ST</option>
                  <option value="OBC">OBC</option>
                  <option value="EWS">EWS</option>
                </select>
                {formik.touched.caste && formik.errors.caste && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.caste}</p>
                )}
              </div>

              {/* Marital Status */}
              <div>
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.maritalStatus && formik.errors.maritalStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('maritalStatus')}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.maritalStatus}</p>
                )}
              </div>

              {/* Educational Qualification */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Educational Qualification
                </label>
                <select
                  id="education"
                  name="education"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.education && formik.errors.education ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('education')}
                >
                  <option value="">Select Education</option>
                  <option value="Below 10th">Below 10th</option>
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Doctorate">Doctorate</option>
                  <option value="Other">Other</option>
                </select>
                {formik.touched.education && formik.errors.education && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.education}</p>
                )}
              </div>

              {/* Disability Status */}
              <div>
                <label htmlFor="disability" className="block text-sm font-medium text-gray-700 mb-1">
                  Disability Status
                </label>
                <select
                  id="disability"
                  name="disability"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.disability && formik.errors.disability ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('disability')}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {formik.touched.disability && formik.errors.disability && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.disability}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...formik.getFieldProps('state')}
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.state}</p>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Find Schemes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EligibilityFormPage;
