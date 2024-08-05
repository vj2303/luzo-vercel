"use client"

import React, { useState } from 'react'
import FileInput from '@/components/FileInput'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

const Form = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm()

  const submit = async (data) => {
    console.log("data is ", data);
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_HOST}/api/v1/influencer/details/create`,
        data: { ...data, created_by: "web", type_of_entity: "test", other_notes: "be polite" },
      
      })
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("Could not add lead")
    }
  };

  const formFields = [
    { name: 'name', label: 'Name*', type: 'text', validation: { required: "Name is required" } },
    { name: 'contact', label: 'Contact* ', type: 'number', validtion: { required: { value: true, message: "Your contact number is required" }, minLength: { value: 10, message: "Contact number must contain atleast 10 digits" }, maxLength: { value: 12, message: "Contact number can max contain 12 digits" } } },
    { name: 'location', label: 'Where are you based?* Area, city', type: 'text', validation: { required: "Locatin is required" } },
    { name: 'handle', label: 'Your Instagram / Youtube handle*', type: 'text', validation: {required: "Instagram / Youtube handle is required"} },
    { name: 'followers', label: 'Approx followers / subscribers* ', type: 'text', validation: { required: "Follower count is required" } },
    {
      name: 'followers_ratio_image',
      label: 'Attach screenshot of Men Women followers ratio (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
      exampleImage: '/men-women-ratio.jpeg'
    },
    {
      name: 'top_cities_image',
      label: 'Attach screenshot of Top cities (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
       exampleImage: '/cities.jpeg'
    },
    {
      name: 'age_range_image',
      label: 'Attach screenshot of Age range (Optional)',
      type: 'file',
      // validation: { required: "This file is required" },
       exampleImage: '/Age-range.jpeg'
    },
    { name: 'about', label: 'Tell us about you and your audience (optional)', type: 'text' },

  ];

  return (
    <div className='my-8'>
      <h2 className='font-medium text-[20px] text-center'>Join our community </h2>
      <p className='mb-[30px] text-[10px] text-[#707070] text-center'>(All fields are mandatory)</p>

      <form onSubmit={handleSubmit(submit)} className='mx-[22px] text-[13px] flex flex-col gap-[14px]'>
        {formFields.map((field, index) => (
          <div key={index}>
            {(field.type === 'text' || field.type === "number") && (
              <div className="relative w-full">
                <input
                  type={field.type}
                  name={field.name}
                  // value={formData[field.name]}
                  placeholder=""
                  {...register(field.name, field.validation)}
                  // onChange={handleChange}
                  className={`block p-[15px] w-full text-base text-gray-900 bg-white border ${errors[field.name] ? 'border-red-500' : 'border-[#B9B9B9]'} rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 peer`}
                />
                <label
                  htmlFor={field.name}
                  className='absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3'
                >
                  {field.label}
                </label>
                {/* {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>}
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>} */}
              </div>
            )}
            {field.type === 'file' &&
              <Controller
                name={field.name}
                control={control}
                rules={field.validation}
                render={({ field: { onChange } }) => (
                  <FileInput
                    label={field.label}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      onChange(file); // Pass the file to react-hook-form
                    }}
                    name={field.name}
                    exampleImage={field.exampleImage}
                    // exampleImage='/1.png'
                  />
                )}
              />
            }
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>}
          </div>
        ))}

        <button type="submit" className='bg-[#72B5EC] text-white font-semibold text-[16px] px-[50px] py-[15px] rounded-lg'>Submit</button>
      </form>
    </div>
  )
}

export default Form;
