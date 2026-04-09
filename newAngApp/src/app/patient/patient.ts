import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient-service';
import { Patient } from '../../Models/Patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient.html',
  styleUrl: './patient.css',
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  showForm = false;
  isEditing = false;
  searchTerm = '';
  patientForm: FormGroup;
  loading = false;

  constructor(
    private patientService: PatientService,
    private router:Router,
    private fb: FormBuilder
  ) {
    this.patientForm = this.fb.group({
      mrn: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
     if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }

    this.loadPatients();
  }

  loadPatients() {
    this.loading = true;
    this.patientService.getPatients().subscribe({
      next: (patients: Patient[]) => {
        console.log('Success Block')
        this.patients = patients;
       this.filteredPatients = patients;
        this.loading = false;
      },
      error: (error: any) => {
        console.log('Error Block')
        console.error('Error loading patients:', error);
        this.loading = false;
      }
    });
  }

  searchPatients(): void {
    if (this.searchTerm.trim()) {
      
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.patients = this.patients.filter(patient =>
        patient.fullName.toLowerCase().includes(searchLower) ||
        patient.mrn.toLowerCase().includes(searchLower) ||
        patient.phone.includes(searchLower) ||
        (patient.email && patient.email.toLowerCase().includes(searchLower))
      );
    } else {
      this.patients = this.patients;
    }
  }

  showAddForm(): void {
    this.showForm = true;
    this.isEditing = false;
    this.selectedPatient = null;
    this.patientForm.reset();
  }

  editPatient(patient: Patient): void {
    this.showForm = true;
    this.isEditing = true;
    this.selectedPatient = patient;
    this.patientForm.patchValue({
      mrn: patient.mrn,
      fullName: patient.fullName,
      dob: patient.dob,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address
    });
  }

  savePatient(): void {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      
      if (this.isEditing && this.selectedPatient) {
        this.patientService.updatePatient(this.selectedPatient.patientId!, patientData).subscribe({
          next: () => {
            this.loadPatients();
            this.cancelForm();
          },
          error: (error: any) => console.error('Error updating patient:', error)
        });
      } else {
        this.patientService.createPatient(patientData).subscribe({
          next: () => {
            this.loadPatients();
            this.cancelForm();
          },
          error: (error: any) => console.error('Error creating patient:', error)
        });
      }
    }
  }

  deletePatient(patient: Patient): void {
    if (confirm(`Are you sure you want to delete patient: ${patient.fullName}?`)) {
      this.patientService.deletePatient(patient.patientId!).subscribe({
        next: () => {
          this.loadPatients();
        },
        error: (error: any) => console.error('Error deleting patient:', error)
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.selectedPatient = null;
    this.patientForm.reset();
  }
}
