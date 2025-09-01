import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddSchool = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const watchImage = watch('image');

  React.useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchImage]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new FormData();
      
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }

      const response = await axios.post('https://school-management-backend-01hi.onrender.com/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitMessage('School added successfully!');
      reset();
      setImagePreview(null);
    } catch (error) {
      setSubmitMessage('Error adding school. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-school-container">
      <div className="form-wrapper">
        <h2>Add New School</h2>
        
        {submitMessage && (
          <div className={`message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="school-form">
          <div className="form-group">
            <label htmlFor="name">School Name *</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'School name is required',
                minLength: {
                  value: 2,
                  message: 'School name must be at least 2 characters'
                }
              })}
              className={errors.name ? 'error' : ''}
              placeholder="Enter school name"
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              {...register('address', {
                required: 'Address is required',
                minLength: {
                  value: 10,
                  message: 'Address must be at least 10 characters'
                }
              })}
              className={errors.address ? 'error' : ''}
              placeholder="Enter complete address"
              rows="3"
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                {...register('city', {
                  required: 'City is required',
                  minLength: {
                    value: 2,
                    message: 'City must be at least 2 characters'
                  }
                })}
                className={errors.city ? 'error' : ''}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                {...register('state', {
                  required: 'State is required',
                  minLength: {
                    value: 2,
                    message: 'State must be at least 2 characters'
                  }
                })}
                className={errors.state ? 'error' : ''}
                placeholder="Enter state"
              />
              {errors.state && <span className="error-message">{errors.state.message}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number *</label>
            <input
              type="tel"
              id="contact"
              {...register('contact', {
                required: 'Contact number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Please enter a valid 10-digit Indian mobile number'
                }
              })}
              className={errors.contact ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.contact && <span className="error-message">{errors.contact.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email_id">Email ID *</label>
            <input
              type="email"
              id="email_id"
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className={errors.email_id ? 'error' : ''}
              placeholder="Enter email address"
            />
            {errors.email_id && <span className="error-message">{errors.email_id.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image">School Image *</label>
            <input
              type="file"
              id="image"
              {...register('image', {
                required: 'School image is required'
              })}
              className={errors.image ? 'error' : ''}
              accept="image/*"
            />
            {errors.image && <span className="error-message">{errors.image.message}</span>}
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="School preview" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Adding School...' : 'Add School'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;