<script setup lang="ts">
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout.vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

// Types
interface Clinic {
      id: string;
      name: string;
      email: string;
      phone_no: string;
      address: string;
      state: string;
      country: string;
      status: 'active' | 'inactive' | 'suspended';
      staff_no?: string;
      created_at: string;
}

interface Patient {
      id: string;
      patient_id: string;
      full_name: string;
      email: string;
      phone_no: string;
      date_of_birth: string;
      gender: 'male' | 'female' | 'other';
      address: string;
      created_at: string;
}

interface PatientResult {
      id: string;
      clinic_id: string;
      patient_id: string;
      result_type: string;
      test_name: string;
      test_date: string;
      file_path?: string;
      file_type?: string;
      status: 'pending' | 'processed' | 'sent' | 'archived';
      uploaded_at: string;
}

interface EmailDelivery {
      id: string;
      patient_result_id: string;
      patient_email: string;
      sent_by: string;
      subject: string;
      status: 'sent' | 'pending' | 'failed' | 'bounced';
      sent_at: string;
      delivery_attempts: number;
      error_message?: string;
}

interface Admin {
      id: string;
      name: string;
      email: string;
      phone_no: string;
      role: 'admin' | 'super_admin';
      status: 'active' | 'inactive' | 'suspended';
      created_at: string;
}

interface Props {
      clinics?: Clinic[];
      patients?: Patient[];
      results?: PatientResult[];
      emails?: EmailDelivery[];
      admins?: Admin[];
      stats?: {
            totalClinics: number;
            activeClinics: number;
            totalPatients: number;
            totalResults: number;
            pendingResults: number;
            emailsSent: number;
            emailsFailed: number;
      };
}

const props = defineProps<Props>();

// State
const activeTab = ref<'overview' | 'clinics' | 'patients' | 'results' | 'emails' | 'admins'>('overview');
const showModal = ref(false);
const modalType = ref<'clinic' | 'patient' | 'admin'>('clinic');
const selectedItem = ref<any>(null);
const searchQuery = ref('');
const filterStatus = ref('all');

// Mock Stats (replace with props.stats when backend is ready)
const stats = computed(() => props.stats || {
      totalClinics: 24,
      activeClinics: 18,
      totalPatients: 1247,
      totalResults: 3456,
      pendingResults: 89,
      emailsSent: 2834,
      emailsFailed: 23
});

// Mock Data (replace with props when backend is ready)
const clinics = ref<Clinic[]>(props.clinics || [
      {
            id: '1',
            name: 'City Medical Center',
            email: 'admin@citymedical.com',
            phone_no: '+234-801-234-5678',
            address: '123 Health Street',
            state: 'Lagos',
            country: 'Nigeria',
            status: 'active',
            staff_no: 'STF001',
            created_at: '2025-01-15T10:00:00'
      },
      {
            id: '2',
            name: 'General Hospital',
            email: 'contact@generalhospital.com',
            phone_no: '+234-802-345-6789',
            address: '456 Care Avenue',
            state: 'Abuja',
            country: 'Nigeria',
            status: 'active',
            staff_no: 'STF002',
            created_at: '2025-02-20T14:30:00'
      },
      {
            id: '3',
            name: 'Wellness Clinic',
            email: 'info@wellnessclinic.com',
            phone_no: '+234-803-456-7890',
            address: '789 Wellness Road',
            state: 'Rivers',
            country: 'Nigeria',
            status: 'suspended',
            staff_no: 'STF003',
            created_at: '2025-03-10T09:15:00'
      }
]);

const patients = ref<Patient[]>(props.patients || [
      {
            id: '1',
            patient_id: 'PAT001',
            full_name: 'John Doe',
            email: 'john.doe@email.com',
            phone_no: '+234-901-234-5678',
            date_of_birth: '1985-05-15',
            gender: 'male',
            address: '12 Patient Street, Lagos',
            created_at: '2025-01-20T10:00:00'
      },
      {
            id: '2',
            patient_id: 'PAT002',
            full_name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone_no: '+234-902-345-6789',
            date_of_birth: '1990-08-22',
            gender: 'female',
            address: '34 Care Avenue, Abuja',
            created_at: '2025-02-15T11:30:00'
      }
]);

const results = ref<PatientResult[]>(props.results || [
      {
            id: '1',
            clinic_id: '1',
            patient_id: '1',
            result_type: 'Blood Test',
            test_name: 'Complete Blood Count',
            test_date: '2025-11-05T10:00:00',
            file_path: '/storage/results/blood_test.pdf',
            file_type: 'pdf',
            status: 'processed',
            uploaded_at: '2025-11-05T10:30:00'
      },
      {
            id: '2',
            clinic_id: '2',
            patient_id: '2',
            result_type: 'X-Ray',
            test_name: 'Chest X-Ray',
            test_date: '2025-11-07T14:00:00',
            file_path: '/storage/results/xray.jpg',
            file_type: 'image',
            status: 'pending',
            uploaded_at: '2025-11-07T14:30:00'
      }
]);

const emails = ref<EmailDelivery[]>(props.emails || [
      {
            id: '1',
            patient_result_id: '1',
            patient_email: 'john.doe@email.com',
            sent_by: 'admin@citymedical.com',
            subject: 'Your Blood Test Results',
            status: 'sent',
            sent_at: '2025-11-05T11:00:00',
            delivery_attempts: 1
      },
      {
            id: '2',
            patient_result_id: '2',
            patient_email: 'jane.smith@email.com',
            sent_by: 'contact@generalhospital.com',
            subject: 'Your X-Ray Results',
            status: 'failed',
            sent_at: '2025-11-07T15:00:00',
            delivery_attempts: 3,
            error_message: 'Invalid email address'
      }
]);

const admins = ref<Admin[]>(props.admins || [
      {
            id: '1',
            name: 'Super Admin',
            email: 'superadmin@system.com',
            phone_no: '+234-900-000-0001',
            role: 'super_admin',
            status: 'active',
            created_at: '2025-01-01T00:00:00'
      },
      {
            id: '2',
            name: 'John Admin',
            email: 'john.admin@system.com',
            phone_no: '+234-900-000-0002',
            role: 'admin',
            status: 'active',
            created_at: '2025-02-01T10:00:00'
      }
]);

// Forms
const clinicForm = useForm({
      name: '',
      email: '',
      phone_no: '',
      address: '',
      state: '',
      country: '',
      password: '',
      staff_no: ''
});

const patientForm = useForm({
      patient_id: '',
      full_name: '',
      email: '',
      phone_no: '',
      date_of_birth: '',
      gender: 'male' as 'male' | 'female' | 'other',
      address: ''
});

const adminForm = useForm({
      name: '',
      email: '',
      phone_no: '',
      password: '',
      role: 'admin' as 'admin' | 'super_admin'
});

// Computed
const filteredClinics = computed(() => {
      let filtered = clinics.value;

      if (filterStatus.value !== 'all') {
            filtered = filtered.filter(c => c.status === filterStatus.value);
      }

      if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            filtered = filtered.filter(c =>
                  c.name.toLowerCase().includes(query) ||
                  c.email.toLowerCase().includes(query) ||
                  c.state.toLowerCase().includes(query)
            );
      }

      return filtered;
});

const filteredPatients = computed(() => {
      let filtered = patients.value;

      if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            filtered = filtered.filter(p =>
                  p.full_name.toLowerCase().includes(query) ||
                  p.email.toLowerCase().includes(query) ||
                  p.patient_id.toLowerCase().includes(query)
            );
      }

      return filtered;
});

const filteredResults = computed(() => {
      let filtered = results.value;

      if (filterStatus.value !== 'all') {
            filtered = filtered.filter(r => r.status === filterStatus.value);
      }

      if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            filtered = filtered.filter(r =>
                  r.test_name.toLowerCase().includes(query) ||
                  r.result_type.toLowerCase().includes(query)
            );
      }

      return filtered;
});

// Methods
const openModal = (type: 'clinic' | 'patient' | 'admin', item?: any) => {
      modalType.value = type;
      selectedItem.value = item;

      if (item) {
            if (type === 'clinic') {
                  clinicForm.name = item.name;
                  clinicForm.email = item.email;
                  clinicForm.phone_no = item.phone_no;
                  clinicForm.address = item.address;
                  clinicForm.state = item.state;
                  clinicForm.country = item.country;
                  clinicForm.staff_no = item.staff_no || '';
            } else if (type === 'patient') {
                  patientForm.patient_id = item.patient_id;
                  patientForm.full_name = item.full_name;
                  patientForm.email = item.email;
                  patientForm.phone_no = item.phone_no;
                  patientForm.date_of_birth = item.date_of_birth;
                  patientForm.gender = item.gender;
                  patientForm.address = item.address;
            } else if (type === 'admin') {
                  adminForm.name = item.name;
                  adminForm.email = item.email;
                  adminForm.phone_no = item.phone_no;
                  adminForm.role = item.role;
            }
      } else {
            clinicForm.reset();
            patientForm.reset();
            adminForm.reset();
      }

      showModal.value = true;
};

const closeModal = () => {
      showModal.value = false;
      selectedItem.value = null;
      clinicForm.reset();
      patientForm.reset();
      adminForm.reset();
};

const submitForm = () => {
      const endpoint = selectedItem.value
            ? `/admin/${modalType.value}s/${selectedItem.value.id}/update`
            : `/admin/${modalType.value}s/create`;

      if (modalType.value === 'clinic') {
            clinicForm.post(endpoint, {
                  onSuccess: () => closeModal()
            });
      } else if (modalType.value === 'patient') {
            patientForm.post(endpoint, {
                  onSuccess: () => closeModal()
            });
      } else if (modalType.value === 'admin') {
            adminForm.post(endpoint, {
                  onSuccess: () => closeModal()
            });
      }
};

const updateStatus = (type: string, id: string, status: string) => {
      router.post(`/admin/${type}s/${id}/status`, { status });
};

const deleteItem = (type: string, id: string) => {
      if (confirm(`Are you sure you want to delete this ${type}?`)) {
            router.delete(`/admin/${type}s/${id}`);
      }
};

const retryEmail = (emailId: string) => {
      router.post(`/admin/emails/${emailId}/retry`);
};

const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
      });
};

const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
            processed: 'bg-blue-100 text-blue-800',
            sent: 'bg-green-100 text-green-800',
            archived: 'bg-purple-100 text-purple-800',
            failed: 'bg-red-100 text-red-800',
            bounced: 'bg-orange-100 text-orange-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
};
</script>

<template>

      <Head title="Admin Panel" />

      <AdminAuthenticatedLayout>
            <div class="flex w-full h-full gap-1 overflow-hidden bg-gray-100">
                  <!-- Main Content -->
                  <div class="w-full p-6 overflow-y-auto">
                        <!-- Header -->
                        <div class="mb-6">
                              <h1 class="text-3xl font-bold text-gray-900">Admin Panel</h1>
                              <p class="text-gray-600">Manage clinics, patients, results, and system administrators</p>
                        </div>

                        <!-- Tab Navigation -->
                        <div class="flex gap-2 mb-6 overflow-x-auto">
                              <button @click="activeTab = 'overview'"
                                    :class="activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    📊 Overview
                              </button>
                              <button @click="activeTab = 'clinics'"
                                    :class="activeTab === 'clinics' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    🏥 Clinics
                              </button>
                              <button @click="activeTab = 'patients'"
                                    :class="activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    👥 Patients
                              </button>
                              <button @click="activeTab = 'results'"
                                    :class="activeTab === 'results' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    📋 Results
                              </button>
                              <button @click="activeTab = 'emails'"
                                    :class="activeTab === 'emails' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    📧 Email Logs
                              </button>
                              <button @click="activeTab = 'admins'"
                                    :class="activeTab === 'admins' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                                    class="px-6 py-3 font-medium rounded-lg whitespace-nowrap transition-colors">
                                    👤 Admins
                              </button>
                        </div>

                        <!-- Overview Tab -->
                        <div v-if="activeTab === 'overview'">
                              <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
                                    <div class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                          <div class="flex items-center justify-between">
                                                <div>
                                                      <p class="text-sm font-medium text-gray-600">Total Clinics</p>
                                                      <p class="mt-2 text-3xl font-bold text-blue-600">{{
                                                            stats.totalClinics }}</p>
                                                      <p class="mt-1 text-xs text-green-600">{{ stats.activeClinics }}
                                                            active</p>
                                                </div>
                                                <div class="p-3 bg-blue-100 rounded-full">
                                                      <span class="text-3xl">🏥</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                          <div class="flex items-center justify-between">
                                                <div>
                                                      <p class="text-sm font-medium text-gray-600">Total Patients</p>
                                                      <p class="mt-2 text-3xl font-bold text-green-600">{{
                                                            stats.totalPatients }}</p>
                                                </div>
                                                <div class="p-3 bg-green-100 rounded-full">
                                                      <span class="text-3xl">👥</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                          <div class="flex items-center justify-between">
                                                <div>
                                                      <p class="text-sm font-medium text-gray-600">Test Results</p>
                                                      <p class="mt-2 text-3xl font-bold text-purple-600">{{
                                                            stats.totalResults }}</p>
                                                      <p class="mt-1 text-xs text-orange-600">{{ stats.pendingResults }}
                                                            pending</p>
                                                </div>
                                                <div class="p-3 bg-purple-100 rounded-full">
                                                      <span class="text-3xl">📋</span>
                                                </div>
                                          </div>
                                    </div>

                                    <div class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                          <div class="flex items-center justify-between">
                                                <div>
                                                      <p class="text-sm font-medium text-gray-600">Email Delivery</p>
                                                      <p class="mt-2 text-3xl font-bold text-indigo-600">{{
                                                            stats.emailsSent }}</p>
                                                      <p class="mt-1 text-xs text-red-600">{{ stats.emailsFailed }}
                                                            failed</p>
                                                </div>
                                                <div class="p-3 bg-indigo-100 rounded-full">
                                                      <span class="text-3xl">📧</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <!-- Quick Actions -->
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <h3 class="mb-4 text-xl font-bold text-gray-900">Quick Actions</h3>
                                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                                          <button @click="openModal('clinic')"
                                                class="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                                <span class="text-2xl">🏥</span>
                                                <p class="mt-2 font-semibold text-gray-900">Add New Clinic</p>
                                                <p class="text-sm text-gray-600">Register a new healthcare facility</p>
                                          </button>
                                          <button @click="openModal('patient')"
                                                class="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                                <span class="text-2xl">👤</span>
                                                <p class="mt-2 font-semibold text-gray-900">Add New Patient</p>
                                                <p class="text-sm text-gray-600">Register a new patient record</p>
                                          </button>
                                          <button @click="openModal('admin')"
                                                class="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                                <span class="text-2xl">⚙️</span>
                                                <p class="mt-2 font-semibold text-gray-900">Add New Admin</p>
                                                <p class="text-sm text-gray-600">Create a new administrator account</p>
                                          </button>
                                    </div>
                              </div>
                        </div>

                        <!-- Clinics Tab -->
                        <div v-if="activeTab === 'clinics'">
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <div class="flex items-center justify-between mb-6">
                                          <h2 class="text-xl font-bold text-gray-900">Manage Clinics</h2>
                                          <button @click="openModal('clinic')"
                                                class="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                                + Add Clinic
                                          </button>
                                    </div>

                                    <!-- Filters -->
                                    <div
                                          class="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                                          <div class="flex gap-2">
                                                <button @click="filterStatus = 'all'"
                                                      :class="filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      All
                                                </button>
                                                <button @click="filterStatus = 'active'"
                                                      :class="filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Active
                                                </button>
                                                <button @click="filterStatus = 'suspended'"
                                                      :class="filterStatus === 'suspended' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Suspended
                                                </button>
                                          </div>

                                          <input v-model="searchQuery" type="text" placeholder="Search clinics..."
                                                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    </div>

                                    <!-- Clinics Table -->
                                    <div class="overflow-x-auto">
                                          <table class="w-full">
                                                <thead class="bg-gray-50">
                                                      <tr>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Clinic Name</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Email</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Phone</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Location</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Status</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                      <tr v-for="clinic in filteredClinics" :key="clinic.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                                  clinic.name }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ clinic.email
                                                                  }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  clinic.phone_no }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ clinic.state
                                                                  }}, {{ clinic.country }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <span :class="getStatusColor(clinic.status)"
                                                                        class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                        {{ clinic.status }}
                                                                  </span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <div class="flex gap-2">
                                                                        <button @click="openModal('clinic', clinic)"
                                                                              class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                                                                              Edit
                                                                        </button>
                                                                        <button v-if="clinic.status === 'active'"
                                                                              @click="updateStatus('clinic', clinic.id, 'suspended')"
                                                                              class="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200">
                                                                              Suspend
                                                                        </button>
                                                                        <button v-else
                                                                              @click="updateStatus('clinic', clinic.id, 'active')"
                                                                              class="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                                                                              Activate
                                                                        </button>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        <!-- Patients Tab -->
                        <div v-if="activeTab === 'patients'">
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <div class="flex items-center justify-between mb-6">
                                          <h2 class="text-xl font-bold text-gray-900">Manage Patients</h2>
                                          <button @click="openModal('patient')"
                                                class="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                                                + Add Patient
                                          </button>
                                    </div>

                                    <!-- Search -->
                                    <div class="mb-6">
                                          <input v-model="searchQuery" type="text"
                                                placeholder="Search patients by name, email, or ID..."
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                    </div>

                                    <!-- Patients Table -->
                                    <div class="overflow-x-auto">
                                          <table class="w-full">
                                                <thead class="bg-gray-50">
                                                      <tr>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Patient ID</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Full Name</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Email</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Phone</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Gender</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Date of Birth</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                      <tr v-for="patient in filteredPatients" :key="patient.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                                  patient.patient_id }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  patient.full_name }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ patient.email
                                                                  }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  patient.phone_no }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">
                                                                  <span class="capitalize">{{ patient.gender }}</span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  patient.date_of_birth }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <div class="flex gap-2">
                                                                        <button @click="openModal('patient', patient)"
                                                                              class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                                                                              Edit
                                                                        </button>
                                                                        <button
                                                                              @click="deleteItem('patient', patient.id)"
                                                                              class="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200">
                                                                              Delete
                                                                        </button>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        <!-- Results Tab -->
                        <div v-if="activeTab === 'results'">
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <div class="flex items-center justify-between mb-6">
                                          <h2 class="text-xl font-bold text-gray-900">Patient Results</h2>
                                    </div>

                                    <!-- Filters -->
                                    <div
                                          class="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                                          <div class="flex gap-2">
                                                <button @click="filterStatus = 'all'"
                                                      :class="filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      All
                                                </button>
                                                <button @click="filterStatus = 'pending'"
                                                      :class="filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Pending
                                                </button>
                                                <button @click="filterStatus = 'processed'"
                                                      :class="filterStatus === 'processed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Processed
                                                </button>
                                                <button @click="filterStatus = 'sent'"
                                                      :class="filterStatus === 'sent' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                                      class="px-4 py-2 font-medium rounded-lg transition-colors">
                                                      Sent
                                                </button>
                                          </div>

                                          <input v-model="searchQuery" type="text" placeholder="Search results..."
                                                class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    </div>

                                    <!-- Results Table -->
                                    <div class="overflow-x-auto">
                                          <table class="w-full">
                                                <thead class="bg-gray-50">
                                                      <tr>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Test Name</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Result Type</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Test Date</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  File Type</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Status</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Uploaded</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                      <tr v-for="result in filteredResults" :key="result.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                                  result.test_name }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  result.result_type }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  formatDate(result.test_date) }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">
                                                                  <span class="uppercase">{{ result.file_type || 'N/A'
                                                                        }}</span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <span :class="getStatusColor(result.status)"
                                                                        class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                        {{ result.status }}
                                                                  </span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  formatDate(result.uploaded_at) }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <button v-if="result.file_path"
                                                                        @click="window.open(result.file_path, '_blank')"
                                                                        class="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                                                                        View
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        <!-- Emails Tab -->
                        <div v-if="activeTab === 'emails'">
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <div class="flex items-center justify-between mb-6">
                                          <h2 class="text-xl font-bold text-gray-900">Email Delivery Logs</h2>
                                    </div>

                                    <!-- Email Stats -->
                                    <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
                                          <div class="p-4 bg-green-50 rounded-lg">
                                                <p class="text-sm font-medium text-gray-600">Sent Successfully</p>
                                                <p class="mt-1 text-2xl font-bold text-green-600">{{emails.filter(e =>
                                                      e.status === 'sent').length}}</p>
                                          </div>
                                          <div class="p-4 bg-yellow-50 rounded-lg">
                                                <p class="text-sm font-medium text-gray-600">Pending</p>
                                                <p class="mt-1 text-2xl font-bold text-yellow-600">{{emails.filter(e =>
                                                      e.status === 'pending').length}}</p>
                                          </div>
                                          <div class="p-4 bg-red-50 rounded-lg">
                                                <p class="text-sm font-medium text-gray-600">Failed</p>
                                                <p class="mt-1 text-2xl font-bold text-red-600">{{emails.filter(e =>
                                                      e.status === 'failed').length}}</p>
                                          </div>
                                          <div class="p-4 bg-orange-50 rounded-lg">
                                                <p class="text-sm font-medium text-gray-600">Bounced</p>
                                                <p class="mt-1 text-2xl font-bold text-orange-600">{{emails.filter(e =>
                                                      e.status === 'bounced').length}}</p>
                                          </div>
                                    </div>

                                    <!-- Emails Table -->
                                    <div class="overflow-x-auto">
                                          <table class="w-full">
                                                <thead class="bg-gray-50">
                                                      <tr>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Recipient</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Subject</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Sent By</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Status</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Attempts</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Sent At</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                      <tr v-for="email in emails" :key="email.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                                  email.patient_email }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ email.subject
                                                                  }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ email.sent_by
                                                                  }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <span :class="getStatusColor(email.status)"
                                                                        class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                        {{ email.status }}
                                                                  </span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  email.delivery_attempts }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  formatDate(email.sent_at) }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <button v-if="email.status === 'failed'"
                                                                        @click="retryEmail(email.id)"
                                                                        class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                                                                        Retry
                                                                  </button>
                                                                  <span v-else class="text-xs text-gray-400">-</span>
                                                            </td>
                                                      </tr>
                                                      <tr v-if="email.error_message" class="bg-red-50">
                                                            <td colspan="7" class="px-4 py-2 text-xs text-red-700">
                                                                  Error: {{ email.error_message }}
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        <!-- Admins Tab -->
                        <div v-if="activeTab === 'admins'">
                              <div class="p-6 bg-white rounded-xl shadow-sm">
                                    <div class="flex items-center justify-between mb-6">
                                          <h2 class="text-xl font-bold text-gray-900">System Administrators</h2>
                                          <button @click="openModal('admin')"
                                                class="px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                                                + Add Admin
                                          </button>
                                    </div>

                                    <!-- Admins Table -->
                                    <div class="overflow-x-auto">
                                          <table class="w-full">
                                                <thead class="bg-gray-50">
                                                      <tr>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Name</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Email</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Phone</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Role</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Status</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Created</th>
                                                            <th
                                                                  class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                                                                  Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                      <tr v-for="admin in admins" :key="admin.id"
                                                            class="hover:bg-gray-50">
                                                            <td class="px-4 py-4 text-sm font-medium text-gray-900">{{
                                                                  admin.name }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{ admin.email
                                                                  }}</td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  admin.phone_no }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <span :class="admin.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                                                                        class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                        {{ admin.role === 'super_admin' ? 'Super Admin'
                                                                              : 'Admin' }}
                                                                  </span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <span :class="getStatusColor(admin.status)"
                                                                        class="px-3 py-1 text-xs font-semibold rounded-full">
                                                                        {{ admin.status }}
                                                                  </span>
                                                            </td>
                                                            <td class="px-4 py-4 text-sm text-gray-700">{{
                                                                  formatDate(admin.created_at) }}</td>
                                                            <td class="px-4 py-4 text-sm">
                                                                  <div class="flex gap-2">
                                                                        <button @click="openModal('admin', admin)"
                                                                              class="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200">
                                                                              Edit
                                                                        </button>
                                                                        <button
                                                                              v-if="admin.status === 'active' && admin.role !== 'super_admin'"
                                                                              @click="updateStatus('admin', admin.id, 'suspended')"
                                                                              class="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200">
                                                                              Suspend
                                                                        </button>
                                                                        <button v-else-if="admin.status !== 'active'"
                                                                              @click="updateStatus('admin', admin.id, 'active')"
                                                                              class="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200">
                                                                              Activate
                                                                        </button>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>

                        <!-- Modal for Add/Edit -->
                        <div v-if="showModal"
                              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                              <div class="w-full max-w-2xl p-6 bg-white rounded-xl max-h-[90vh] overflow-y-auto">
                                    <h3 class="mb-6 text-2xl font-bold text-gray-900">
                                          {{ selectedItem ? 'Edit' : 'Add New' }}
                                          {{ modalType === 'clinic' ? 'Clinic' : modalType === 'patient' ? 'Patient' :
                                                'Administrator' }}
                                    </h3>

                                    <!-- Clinic Form -->
                                    <form v-if="modalType === 'clinic'" @submit.prevent="submitForm" class="space-y-4">
                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Clinic
                                                            Name *</label>
                                                      <input v-model="clinicForm.name" type="text" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Email
                                                            *</label>
                                                      <input v-model="clinicForm.email" type="email" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                          </div>

                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Phone
                                                            Number *</label>
                                                      <input v-model="clinicForm.phone_no" type="tel" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Staff
                                                            Number</label>
                                                      <input v-model="clinicForm.staff_no" type="text"
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                          </div>

                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Address
                                                      *</label>
                                                <textarea v-model="clinicForm.address" required rows="3"
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                                          </div>

                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">State
                                                            *</label>
                                                      <input v-model="clinicForm.state" type="text" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Country
                                                            *</label>
                                                      <input v-model="clinicForm.country" type="text" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                                </div>
                                          </div>

                                          <div v-if="!selectedItem">
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Password
                                                      *</label>
                                                <input v-model="clinicForm.password" type="password"
                                                      :required="!selectedItem"
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                          </div>

                                          <div class="flex gap-3 pt-4">
                                                <button type="submit" :disabled="clinicForm.processing"
                                                      class="flex-1 px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                                                      {{ clinicForm.processing ? 'Saving...' : (selectedItem ? 'Update'
                                                            : 'Create') }}
                                                </button>
                                                <button type="button" @click="closeModal"
                                                      class="flex-1 px-4 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>

                                    <!-- Patient Form -->
                                    <form v-if="modalType === 'patient'" @submit.prevent="submitForm" class="space-y-4">
                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Patient
                                                            ID *</label>
                                                      <input v-model="patientForm.patient_id" type="text" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Full
                                                            Name *</label>
                                                      <input v-model="patientForm.full_name" type="text" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                </div>
                                          </div>

                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Email
                                                            *</label>
                                                      <input v-model="patientForm.email" type="email" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Phone
                                                            Number *</label>
                                                      <input v-model="patientForm.phone_no" type="tel" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                </div>
                                          </div>

                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Date
                                                            of Birth *</label>
                                                      <input v-model="patientForm.date_of_birth" type="date" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Gender
                                                            *</label>
                                                      <select v-model="patientForm.gender" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                      </select>
                                                </div>
                                          </div>

                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Address
                                                      *</label>
                                                <textarea v-model="patientForm.address" required rows="3"
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                                          </div>

                                          <div class="flex gap-3 pt-4">
                                                <button type="submit" :disabled="patientForm.processing"
                                                      class="flex-1 px-4 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                                                      {{ patientForm.processing ? 'Saving...' : (selectedItem ? 'Update'
                                                            : 'Create') }}
                                                </button>
                                                <button type="button" @click="closeModal"
                                                      class="flex-1 px-4 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>

                                    <!-- Admin Form -->
                                    <form v-if="modalType === 'admin'" @submit.prevent="submitForm" class="space-y-4">
                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Name
                                                      *</label>
                                                <input v-model="adminForm.name" type="text" required
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                          </div>

                                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Email
                                                            *</label>
                                                      <input v-model="adminForm.email" type="email" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                                </div>
                                                <div>
                                                      <label class="block mb-2 text-sm font-medium text-gray-700">Phone
                                                            Number *</label>
                                                      <input v-model="adminForm.phone_no" type="tel" required
                                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                                </div>
                                          </div>

                                          <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Role
                                                      *</label>
                                                <select v-model="adminForm.role" required
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                                      <option value="admin">Admin</option>
                                                      <option value="super_admin">Super Admin</option>
                                                </select>
                                          </div>

                                          <div v-if="!selectedItem">
                                                <label class="block mb-2 text-sm font-medium text-gray-700">Password
                                                      *</label>
                                                <input v-model="adminForm.password" type="password"
                                                      :required="!selectedItem"
                                                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                          </div>

                                          <div class="flex gap-3 pt-4">
                                                <button type="submit" :disabled="adminForm.processing"
                                                      class="flex-1 px-4 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-400">
                                                      {{ adminForm.processing ? 'Saving...' : (selectedItem ? 'Update' :
                                                            'Create') }}
                                                </button>
                                                <button type="button" @click="closeModal"
                                                      class="flex-1 px-4 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                                                      Cancel
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>

                  </div>
            </div>
      </AdminAuthenticatedLayout>
</template>