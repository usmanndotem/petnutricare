// API utility functions for PetNutriCare frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// API service class
export class ApiService {
  // Authentication endpoints
  static async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    // Store token in localStorage
    if (data.data?.token) {
      localStorage.setItem('authToken', data.data.token);
    }
    
    return data;
  }

  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  }

  static async getProfile() {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return response.json();
  }

  static logout() {
    localStorage.removeItem('authToken');
  }

  // Animal endpoints
  static async getAnimals() {
    const response = await fetch(`${API_BASE_URL}/api/animals`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch animals');
    }

    return response.json();
  }

  static async getAnimalById(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/animals/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch animal');
    }

    return response.json();
  }

  static async createAnimal(animalData: any) {
    const response = await fetch(`${API_BASE_URL}/api/animals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(animalData),
    });

    if (!response.ok) {
      throw new Error('Failed to create animal');
    }

    return response.json();
  }

  static async updateAnimal(id: string, animalData: any) {
    const response = await fetch(`${API_BASE_URL}/api/animals/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(animalData),
    });

    if (!response.ok) {
      throw new Error('Failed to update animal');
    }

    return response.json();
  }

  static async deleteAnimal(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/animals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete animal');
    }

    return response.json();
  }

  // Medical records endpoints
  static async getMedicalRecords(animalId: string) {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/animal/${animalId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch medical records');
    }

    return response.json();
  }

  static async createMedicalRecord(recordData: any) {
    const response = await fetch(`${API_BASE_URL}/api/medical-records`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(recordData),
    });

    if (!response.ok) {
      throw new Error('Failed to create medical record');
    }

    return response.json();
  }

  // Meal plans endpoints
  static async getMealPlans(animalId: string) {
    const response = await fetch(`${API_BASE_URL}/api/meal-plans/animal/${animalId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meal plans');
    }

    return response.json();
  }

  static async generateAIMealPlan(animalId: string) {
    const response = await fetch(`${API_BASE_URL}/api/meal-plans/animal/${animalId}/generate-ai`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI meal plan');
    }

    return response.json();
  }

  static async createMealPlan(mealPlanData: any) {
    const response = await fetch(`${API_BASE_URL}/api/meal-plans`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(mealPlanData),
    });

    if (!response.ok) {
      throw new Error('Failed to create meal plan');
    }

    return response.json();
  }

  // Progress tracking endpoints
  static async getProgressEntries(animalId: string) {
    const response = await fetch(`${API_BASE_URL}/api/progress/animal/${animalId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch progress entries');
    }

    return response.json();
  }

  static async getProgressAnalytics(animalId: string) {
    const response = await fetch(`${API_BASE_URL}/api/progress/animal/${animalId}/analytics`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch progress analytics');
    }

    return response.json();
  }

  static async createProgressEntry(progressData: any) {
    const response = await fetch(`${API_BASE_URL}/api/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(progressData),
    });

    if (!response.ok) {
      throw new Error('Failed to create progress entry');
    }

    return response.json();
  }

  // Health check
  static async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
}

// Export the API base URL for direct use if needed
export { API_BASE_URL };
