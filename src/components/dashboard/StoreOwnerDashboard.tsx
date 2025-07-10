import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { StarRating } from '../ui/StarRating';
import { Rating, Store } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const StoreOwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Mock store data
    const mockStore: Store = {
      id: '1',
      name: 'The Best Electronics Store',
      email: 'electronics@example.com',
      address: '123 Electronics Street, Tech City, State 12345',
      rating: 4.2,
      totalRatings: 156,
      ownerId: user?.id || '2',
      createdAt: '2024-01-10T08:15:00Z',
    };

    // Mock ratings data
    const mockRatings: Rating[] = [
      {
        id: '1',
        userId: '1',
        storeId: '1',
        rating: 5,
        userName: 'John Doe Smith Wilson',
        createdAt: '2024-01-20T14:30:00Z',
      },
      {
        id: '2',
        userId: '2',
        storeId: '1',
        rating: 4,
        userName: 'Jane Smith Johnson Brown',
        createdAt: '2024-01-19T11:15:00Z',
      },
      {
        id: '3',
        userId: '3',
        storeId: '1',
        rating: 3,
        userName: 'Michael Johnson Williams Davis',
        createdAt: '2024-01-18T09:45:00Z',
      },
      {
        id: '4',
        userId: '4',
        storeId: '1',
        rating: 5,
        userName: 'Sarah Williams Brown Taylor',
        createdAt: '2024-01-17T16:20:00Z',
      },
      {
        id: '5',
        userId: '5',
        storeId: '1',
        rating: 4,
        userName: 'David Brown Taylor Anderson',
        createdAt: '2024-01-16T13:10:00Z',
      },
    ];

    setStore(mockStore);
    setRatings(mockRatings);
  }, [user?.id]);

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

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const ratingDistribution = {
    5: ratings.filter(r => r.rating === 5).length,
    4: ratings.filter(r => r.rating === 4).length,
    3: ratings.filter(r => r.rating === 3).length,
    2: ratings.filter(r => r.rating === 2).length,
    1: ratings.filter(r => r.rating === 1).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
          <p className="text-gray-600">{store.name}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsPasswordModalOpen(true)}
        >
          Change Password
        </Button>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{store.rating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{store.totalRatings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Activity</p>
                <p className="text-2xl font-bold text-gray-900">{ratings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-16">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${store.totalRatings > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / store.totalRatings) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{rating.userName}</h4>
                      <StarRating rating={rating.rating} readonly size="sm" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(rating.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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