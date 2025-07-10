import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { validateName, validateEmail, validateAddress, validatePassword } from '../../utils/validation';

interface CreateStoreFormProps {
  onSubmit: (storeData: any) => void;
}

export const CreateStoreForm: React.FC<CreateStoreFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors: { [key: string]: string } = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const addressError = validateAddress(formData.address);
    if (addressError) newErrors.address = addressError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSubmit(formData);
    } catch (error) {
      console.error('Error creating store:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Store Name"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        error={errors.name}
        placeholder="Enter store name (20-60 characters)"
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        error={errors.email}
        placeholder="Enter store email address"
        required
      />
      
      <Input
        label="Address"
        value={formData.address}
        onChange={(value) => handleChange('address', value)}
        error={errors.address}
        placeholder="Enter store address (max 400 characters)"
        required
      />
      
      <Input
        label="Store Owner Password"
        type="password"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
        error={errors.password}
        placeholder="8-16 chars with uppercase & special character"
        required
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Create Store
        </Button>
      </div>
    </form>
  );
};