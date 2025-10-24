import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { VeterinarySidebar } from './VeterinarySidebar';
import { NotificationService } from '../services/notifications';
import { 
  Search, 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  PawPrint,
  Activity,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  UserPlus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lastCheckup: string;
  nextAppointment?: string;
}

interface Caregiver {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  assignedPets: Pet[];
  totalPets: number;
  activePets: number;
  lastReport: string;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
}

const mockCaregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'owner@petnutricare.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    assignedPets: [
      {
        id: 'p1',
        name: 'Max',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        healthStatus: 'excellent',
        lastCheckup: '2024-01-20',
        nextAppointment: '2024-02-20'
      },
      {
        id: 'p2',
        name: 'Luna',
        species: 'Cat',
        breed: 'Persian',
        age: 2,
        healthStatus: 'good',
        lastCheckup: '2024-01-18',
        nextAppointment: '2024-02-18'
      }
    ],
    totalPets: 2,
    activePets: 2,
    lastReport: '2024-01-22',
    status: 'active',
    notes: 'Very attentive caregiver, excellent communication'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    joinDate: '2024-01-10',
    assignedPets: [
      {
        id: 'p3',
        name: 'Buddy',
        species: 'Dog',
        breed: 'Labrador',
        age: 5,
        healthStatus: 'fair',
        lastCheckup: '2024-01-15',
        nextAppointment: '2024-02-15'
      },
      {
        id: 'p4',
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Maine Coon',
        age: 4,
        healthStatus: 'good',
        lastCheckup: '2024-01-12',
        nextAppointment: '2024-02-12'
      },
      {
        id: 'p5',
        name: 'Bella',
        species: 'Dog',
        breed: 'Beagle',
        age: 1,
        healthStatus: 'excellent',
        lastCheckup: '2024-01-25',
        nextAppointment: '2024-02-25'
      }
    ],
    totalPets: 3,
    activePets: 3,
    lastReport: '2024-01-21',
    status: 'active',
    notes: 'Experienced with multiple pets, reliable reporting'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 345-6789',
    joinDate: '2024-01-05',
    assignedPets: [
      {
        id: 'p6',
        name: 'Charlie',
        species: 'Dog',
        breed: 'Poodle',
        age: 6,
        healthStatus: 'poor',
        lastCheckup: '2024-01-10',
        nextAppointment: '2024-01-30'
      }
    ],
    totalPets: 1,
    activePets: 1,
    lastReport: '2024-01-19',
    status: 'active',
    notes: 'New caregiver, needs guidance with senior pet care'
  }
];

export function Caregivers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [showAddCaregiver, setShowAddCaregiver] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('Your one week plan is due. Please come for a checkup.');

  const filteredCaregivers = mockCaregivers.filter(caregiver => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caregiver.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || caregiver.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendReminder = async (caregiver: Caregiver, message?: string) => {
    setSendingId(caregiver.id);
    try {
      NotificationService.add(
        caregiver.email,
        'Checkup Reminder',
        message || customMessage || 'Your one week plan is due. Please come for a checkup.',
        'reminder'
      );
      // lightweight visual feedback
      alert(`Reminder sent to ${caregiver.name}`);
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <VeterinarySidebar currentPage="caregivers" />

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2A4B7C] mb-2">Caregivers Management</h1>
              <p className="text-muted-foreground">Manage caregivers and their assigned pets</p>
            </div>
            <div className="flex gap-3 items-center">
              <input
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="hidden md:block px-3 py-2 border border-gray-300 rounded-md w-80"
                placeholder="Type reminder message..."
              />
              <Button onClick={() => setShowAddCaregiver(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Caregiver
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-[#7ED9B9]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Total Caregivers</p>
                <Users className="w-5 h-5 text-[#7ED9B9]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">{mockCaregivers.length}</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">+2 this month</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#5EC7E8]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Active Caregivers</p>
                <Activity className="w-5 h-5 text-[#5EC7E8]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">{mockCaregivers.filter(c => c.status === 'active').length}</p>
              <p className="text-xs text-green-600 mt-2 m-0">↑ 100% active</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-[#2A4B7C]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Total Pets</p>
                <PawPrint className="w-5 h-5 text-[#2A4B7C]" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">{mockCaregivers.reduce((sum, c) => sum + c.totalPets, 0)}</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">Under care</p>
            </Card>

            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground m-0">Pending Reports</p>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-2xl text-[#2A4B7C] m-0">3</p>
              <p className="text-xs text-muted-foreground mt-2 m-0">Due this week</p>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search caregivers by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </Card>

          {/* Caregivers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Caregivers List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2A4B7C]">Caregivers</h3>
              {filteredCaregivers.map((caregiver) => (
                <Card 
                  key={caregiver.id} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCaregiver(caregiver)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-[#2A4B7C]">{caregiver.name}</h4>
                      <p className="text-sm text-muted-foreground">{caregiver.email}</p>
                    </div>
                    <Badge className={getStatusColor(caregiver.status)}>
                      {caregiver.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{caregiver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined: {new Date(caregiver.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{caregiver.totalPets} pets</span>
                      <span>Last report: {new Date(caregiver.lastReport).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => { e.stopPropagation(); sendReminder(caregiver); }}
                      disabled={sendingId === caregiver.id}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      {sendingId === caregiver.id ? 'Sending...' : 'Send Reminder'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Caregiver Details */}
            <div>
              {selectedCaregiver ? (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#2A4B7C]">Caregiver Details</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendReminder(selectedCaregiver)}
                        disabled={sendingId === selectedCaregiver.id}
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        {sendingId === selectedCaregiver.id ? 'Sending...' : 'Send Reminder'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Contact Info */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCaregiver.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCaregiver.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Joined: {new Date(selectedCaregiver.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Pets */}
                    <div>
                      <h4 className="font-medium text-[#2A4B7C] mb-3">Assigned Pets ({selectedCaregiver.totalPets})</h4>
                      <div className="space-y-3">
                        {selectedCaregiver.assignedPets.map((pet) => (
                          <div key={pet.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <PawPrint className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{pet.name}</span>
                                <span className="text-sm text-muted-foreground">({pet.species})</span>
                              </div>
                              <Badge className={getHealthColor(pet.healthStatus)}>
                                {pet.healthStatus}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <p>{pet.breed}, {pet.age} years old</p>
                              <p>Last checkup: {new Date(pet.lastCheckup).toLocaleDateString()}</p>
                              {pet.nextAppointment && (
                                <p>Next appointment: {new Date(pet.nextAppointment).toLocaleDateString()}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedCaregiver.notes && (
                      <div>
                        <h4 className="font-medium text-[#2A4B7C] mb-3">Notes</h4>
                        <p className="text-sm text-muted-foreground">{selectedCaregiver.notes}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a caregiver to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
