import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { VeterinarySidebar } from './VeterinarySidebar';
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Calendar,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'emergency';
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  status: 'completed' | 'pending' | 'follow-up';
  attachments?: string[];
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientName: 'Max',
    patientId: 'PAT-001',
    date: '2024-01-15',
    type: 'checkup',
    veterinarian: 'Dr. Sarah Johnson',
    diagnosis: 'Annual wellness check',
    treatment: 'Routine examination, vaccinations updated',
    notes: 'Patient in excellent health. Weight stable at 30.2kg. All vital signs normal.',
    status: 'completed',
    attachments: ['blood_test.pdf', 'xray_chest.jpg']
  },
  {
    id: '2',
    patientName: 'Luna',
    patientId: 'PAT-002',
    date: '2024-01-14',
    type: 'treatment',
    veterinarian: 'Dr. Michael Chen',
    diagnosis: 'Digestive issues',
    treatment: 'Prescribed probiotics, dietary changes',
    notes: 'Patient showing signs of digestive discomfort. Recommended switching to sensitive stomach formula.',
    status: 'follow-up',
    attachments: ['stool_sample.pdf']
  },
  {
    id: '3',
    patientName: 'Buddy',
    patientId: 'PAT-003',
    date: '2024-01-13',
    type: 'vaccination',
    veterinarian: 'Dr. Sarah Johnson',
    diagnosis: 'Annual vaccination',
    treatment: 'Rabies, DHPP, Bordetella vaccines administered',
    notes: 'All vaccines administered successfully. No adverse reactions observed.',
    status: 'completed'
  },
  {
    id: '4',
    patientName: 'Whiskers',
    patientId: 'PAT-004',
    date: '2024-01-12',
    type: 'emergency',
    veterinarian: 'Dr. Michael Chen',
    diagnosis: 'Foreign object ingestion',
    treatment: 'Emergency surgery to remove obstruction',
    notes: 'Patient ingested small toy. Emergency surgery successful. Recovery progressing well.',
    status: 'follow-up',
    attachments: ['surgery_report.pdf', 'xray_abdomen.jpg']
  }
];

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const filteredRecords = mockMedicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkup': return <Stethoscope className="w-4 h-4" />;
      case 'vaccination': return <CheckCircle className="w-4 h-4" />;
      case 'treatment': return <FileText className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'follow-up': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Sidebar */}
      <VeterinarySidebar currentPage="medical-records" />

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2A4B7C] mb-2">Medical Records</h1>
              <p className="text-muted-foreground">Manage patient medical records and history</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Records
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Record
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6 mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search records by patient, diagnosis, or veterinarian..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="checkup">Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="treatment">Treatment</option>
                <option value="emergency">Emergency</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>
          </Card>

          {/* Records List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Records List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2A4B7C]">Recent Records</h3>
              {filteredRecords.map((record) => (
                <Card 
                  key={record.id} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(record.type)}
                      <div>
                        <h4 className="font-medium text-[#2A4B7C]">{record.patientName}</h4>
                        <p className="text-sm text-muted-foreground">ID: {record.patientId}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Veterinarian:</strong> {record.veterinarian}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Record Details */}
            <div>
              {selectedRecord ? (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#2A4B7C]">Record Details</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Patient</label>
                        <p className="font-medium">{selectedRecord.patientName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p>{new Date(selectedRecord.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Type</label>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(selectedRecord.type)}
                          <span className="capitalize">{selectedRecord.type}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <Badge className={getStatusColor(selectedRecord.status)}>
                          {selectedRecord.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Veterinarian</label>
                      <p>{selectedRecord.veterinarian}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                      <p>{selectedRecord.diagnosis}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Treatment</label>
                      <p>{selectedRecord.treatment}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Notes</label>
                      <p className="text-sm">{selectedRecord.notes}</p>
                    </div>

                    {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Attachments</label>
                        <div className="space-y-2">
                          {selectedRecord.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{attachment}</span>
                              <Button variant="outline" size="sm" className="ml-auto">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="text-center text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a medical record to view details</p>
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
