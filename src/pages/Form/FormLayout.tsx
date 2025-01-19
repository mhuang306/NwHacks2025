import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { db } from '../../Firebase'; // Firestore setup
import { collection, addDoc } from 'firebase/firestore';

const FormLayout = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;

    if (!name || !subject || !message) {
      toast.error('Please fill out all fields!');
      return;
    }

    try {
      // Here we add the 'fulfilled' field and random author-generated titles
      await addDoc(collection(db, 'posts'), {
        author: name,
        title: subject,
        body: message,
        createdAt: new Date(),
        fulfilled: false, // Add the "fulfilled" field
      });

      toast.success('Request submitted successfully!');
      setFormData({
        name: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error saving post: ', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="New Request" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex gap-6">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter the subject"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Provide detailed information about your request. Include specifics, relevant contact details, and your availability."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
