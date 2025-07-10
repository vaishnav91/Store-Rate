import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { StarRating } from '../ui/StarRating';
import { Modal } from '../ui/Modal';
import { Store, UserRating } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [userRatings, setUserRatings] = useState<{ [storeId: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Mock data loading
    const mockStores: Store[] = [
      {
        id: '1',
        name: 'The Best Electronics Store',
        email: 'electronics@example.com',
        address: '123 Electronics Street, Tech City, State 12345',
        rating: 4.2,
        totalRatings: 156,
        ownerId: '2',
        createdAt: '2024-01-10T08:15:00Z',
      },
      {
        id: '2',
        name: 'Fashion Forward Boutique',
        email: 'fashion@example.com',
        address: '456 Fashion Avenue, Style City, State 67890',
        rating: 4.7,
        totalRatings: 203,
        ownerId: '4',
        createdAt: '2024-01-12T11:30:00Z',
      },
      {
        id: '3',
        name: 'Gourmet Food Market & Deli',
        email: 'gourmet@example.com',
        address: '789 Culinary Lane, Food City, State 54321',
        rating: 4.5,
        totalRatings: 178,
        ownerId: '5',
        createdAt: '2024-01-08T16:45:00Z',
      },
      {
        id: '4',
        name: 'Healthy Living Pharmacy',
        email: 'pharmacy@example.com',
        address: '321 Health Boulevard, Wellness City, State 98765',
        rating: 4.3,
        totalRatings: 89,
        ownerId: '6',
        createdAt: '2024-01-06T13:20:00Z',
      },
      {
        id: '5',
        name: 'Creative Arts & Crafts Studio',
        email: 'arts@example.com',
        address: '654 Creative Street, Art City, State 45678',
        rating: 4.8,
        totalRatings: 92,
        ownerId: '7',
        createdAt: '2024-01-04T09:10:00Z',
      },
    ];

    // Mock user ratings
    const mockUserRatings: { [storeId: string]: number } = {
      '1': 4,
      '3': 5,
    };

    setStores(mockStores);
    setUserRatings(mockUserRatings);
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRatingSubmit = (storeId: string, rating: number) => {
    setUserRatings(prev => ({
      ...prev,
      [storeId]: rating,
    }));
    
    // Update store rating (mock implementation)
    setStores(prev => prev.map(store => {
      if (store.id === storeId) {
        const currentTotal = store.totalRatings * store.rating;
        const newTotal = store.totalRatings + 1;
        const newRating = (currentTotal + rating) / newTotal;
        return {
          ...store,
          rating: newRating,
          totalRatings: newTotal,
        };
      }
      return store;
    }));
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    try {
      // Mock password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsPasswordModalOpen(false);
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully!');
    } catch (error) {
      alert('Failed to update password');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600">Discover and rate amazing stores</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Change Password
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          label=""
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search stores by name or address..."
          className="flex-1"
        />
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{store.name}</CardTitle>
              <div className="flex items-center text-gray-600 text-sm space-x-2">
                <Mail className="w-4 h-4" />
                <span>{store.email}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{store.address}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Overall Rating</p>
                    <StarRating rating={store.rating} readonly />
                    <p className="text-xs text-gray-500 mt-1">
                      {store.totalRatings} reviews
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {userRatings[store.id] ? 'Your Rating' : 'Rate this store'}
                  </p>
                  <StarRating
                    rating={userRatings[store.id] || 0}
                    onRatingChange={(rating) => handleRatingSubmit(store.id, rating)}
                  />
                  {userRatings[store.id] && (
                    <p className="text-xs text-green-600 mt-1">
                      You rated this store {userRatings[store.id]} stars
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No stores found matching your search.</p>
        </div>
      )}

      {/* Password Update Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordUpdate}>
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};