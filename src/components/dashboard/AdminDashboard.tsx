import React, { useState, useEffect } from 'react';
import { Users, Store, Star, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { StarRating } from '../ui/StarRating';
import { User, Store as StoreType, DashboardStats } from '../../types';
import { CreateUserForm } from './CreateUserForm';
import { CreateStoreForm } from './CreateStoreForm';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<StoreType[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'stores'>('overview');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateStoreModalOpen, setIsCreateStoreModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  useEffect(() => {
    // Mock data loading
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe Smith Wilson',
        email: 'john@example.com',
        address: '123 Main Street, City, State 12345',
        role: 'NORMAL_USER',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'Jane Smith Johnson Brown',
        email: 'jane@example.com',
        address: '456 Oak Avenue, City, State 67890',
        role: 'STORE_OWNER',
        storeId: '1',
        createdAt: '2024-01-10T08:15:00Z',
      },
      {
        id: '3',
        name: 'Michael Johnson Williams Davis',
        email: 'michael@example.com',
        address: '789 Pine Road, City, State 54321',
        role: 'SYSTEM_ADMIN',
        createdAt: '2024-01-05T14:20:00Z',
      },
    ];

    const mockStores: StoreType[] = [
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
    ];

    setUsers(mockUsers);
    setStores(mockStores);
    setStats({
      totalUsers: mockUsers.length,
      totalStores: mockStores.length,
      totalRatings: mockStores.reduce((sum, store) => sum + store.totalRatings, 0),
    });
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredStores = stores.filter(store => {
    return store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           store.address.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCreateUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    setStats(prev => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
    setIsCreateUserModalOpen(false);
  };

  const handleCreateStore = (storeData: any) => {
    const newStore: StoreType = {
      id: Date.now().toString(),
      ...storeData,
      rating: 0,
      totalRatings: 0,
      ownerId: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStores(prev => [...prev, newStore]);
    setStats(prev => ({ ...prev, totalStores: prev.totalStores + 1 }));
    setIsCreateStoreModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsCreateUserModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <Button
            onClick={() => setIsCreateStoreModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Store
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: <Star className="w-4 h-4" /> },
            { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
            { id: 'stores', label: 'Stores', icon: <Store className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Stores</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStores}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Ratings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRatings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                label=""
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search users by name, email, or address..."
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="NORMAL_USER">Normal Users</option>
                <option value="STORE_OWNER">Store Owners</option>
                <option value="SYSTEM_ADMIN">System Admins</option>
              </select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 max-w-xs truncate">{user.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'SYSTEM_ADMIN' 
                              ? 'bg-red-100 text-red-800'
                              : user.role === 'STORE_OWNER'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stores Tab */}
      {activeTab === 'stores' && (
        <div className="space-y-4">
          <div className="flex">
            <Input
              label=""
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search stores by name, email, or address..."
              className="w-full"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Store Management</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Ratings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStores.map((store) => (
                      <tr key={store.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{store.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{store.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 max-w-xs truncate">{store.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StarRating rating={store.rating} readonly />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {store.totalRatings}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        title="Create New User"
        maxWidth="lg"
      >
        <CreateUserForm onSubmit={handleCreateUser} />
      </Modal>

      <Modal
        isOpen={isCreateStoreModalOpen}
        onClose={() => setIsCreateStoreModalOpen(false)}
        title="Create New Store"
        maxWidth="lg"
      >
        <CreateStoreForm onSubmit={handleCreateStore} />
      </Modal>
    </div>
  );
};