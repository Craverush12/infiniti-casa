import { simulateDelay, generateId } from '../data/dummyData';

interface UploadOptions {
  bucket?: string;
  path?: string;
  public?: boolean;
}

interface UploadResult {
  success: boolean;
  url?: string;
  fileId?: string;
  error?: string;
}

class MockFileStorageService {
  private static instance: MockFileStorageService;
  private uploadedFiles: Map<string, { url: string; bucket: string; path: string }> = new Map();

  private constructor() {}

  static getInstance(): MockFileStorageService {
    if (!MockFileStorageService.instance) {
      MockFileStorageService.instance = new MockFileStorageService();
    }
    return MockFileStorageService.instance;
  }

  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResult> {
    try {
      await simulateDelay(1500); // Simulate upload delay
      
      const fileId = generateId();
      const bucket = options.bucket || 'default';
      const path = options.path || `uploads/${fileId}/${file.name}`;
      
      // Generate a mock URL
      const mockUrl = `https://mock-storage.example.com/${bucket}/${path}`;
      
      // Store file metadata
      this.uploadedFiles.set(fileId, {
        url: mockUrl,
        bucket,
        path
      });
      
      console.log('📁 File uploaded:', file.name, 'to', mockUrl);
      
      return {
        success: true,
        url: mockUrl,
        fileId
      };
    } catch (error) {
      console.error('MockFileStorageService.uploadFile error:', error);
      return {
        success: false,
        error: 'Failed to upload file'
      };
    }
  }

  async deleteFile(fileId: string, bucket?: string): Promise<boolean> {
    try {
      await simulateDelay(500); // Simulate delete delay
      
      const file = this.uploadedFiles.get(fileId);
      if (!file) {
        console.warn('File not found for deletion:', fileId);
        return false;
      }
      
      this.uploadedFiles.delete(fileId);
      console.log('📁 File deleted:', fileId);
      
      return true;
    } catch (error) {
      console.error('MockFileStorageService.deleteFile error:', error);
      return false;
    }
  }

  async getFileUrl(fileId: string): Promise<string | null> {
    try {
      await simulateDelay(200); // Simulate network delay
      
      const file = this.uploadedFiles.get(fileId);
      return file?.url || null;
    } catch (error) {
      console.error('MockFileStorageService.getFileUrl error:', error);
      return null;
    }
  }

  async listFiles(bucket?: string): Promise<Array<{ id: string; url: string; path: string }>> {
    try {
      await simulateDelay(300); // Simulate network delay
      
      const files = Array.from(this.uploadedFiles.entries()).map(([id, file]) => ({
        id,
        url: file.url,
        path: file.path
      }));
      
      if (bucket) {
        return files.filter(file => file.path.startsWith(bucket));
      }
      
      return files;
    } catch (error) {
      console.error('MockFileStorageService.listFiles error:', error);
      return [];
    }
  }

  async updateFileMetadata(fileId: string, metadata: Record<string, any>): Promise<boolean> {
    try {
      await simulateDelay(400); // Simulate network delay
      
      const file = this.uploadedFiles.get(fileId);
      if (!file) {
        return false;
      }
      
      console.log('📁 File metadata updated:', fileId, metadata);
      return true;
    } catch (error) {
      console.error('MockFileStorageService.updateFileMetadata error:', error);
      return false;
    }
  }

  // Helper method to get upload progress (for demo purposes)
  async getUploadProgress(fileId: string): Promise<number> {
    // Simulate upload progress
    return Math.random() * 100;
  }

  // Helper method to validate file type
  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }

  // Helper method to validate file size
  validateFileSize(file: File, maxSizeMB: number): boolean {
    return file.size <= maxSizeMB * 1024 * 1024;
  }
}

export default MockFileStorageService.getInstance(); 