import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoPageModule, PoDividerModule, PoToasterModule } from '@po-ui/ng-components';

import { ClientService } from '../../service/cliente.service';
import { ClientRequestPayload } from '../../payload/client-payload';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoButtonModule,
    PoFieldModule,
    PoPageModule,
    PoDividerModule,
    PoToasterModule
  ],
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent {
  customerForm: FormGroup;
  customers: ClientRequestPayload[] = [];

  originalCpf: string | null = null;
  isEditing = false;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phones: this.fb.array([]),
      addresses: this.fb.array([])
    });

    this.loadCustomers();
  }

  get phones(): FormArray {
    return this.customerForm.get('phones') as FormArray;
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  addPhone(): void {
    this.phones.push(
      this.fb.group({
        number: ['', Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(20)]
      })
    );
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  addAddress(): void {
    this.addresses.push(
      this.fb.group({
        street: ['', Validators.required],
        complement: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    );
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  save(): void {
    if (!this.isFormValid()) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    const payload: ClientRequestPayload = {
      name: this.customerForm.value.name,
      cpf: this.customerForm.value.cpf,
      phones: this.customerForm.value.phones,
      addresses: this.customerForm.value.addresses
    };


    if (this.isEditing && this.originalCpf) {
      this.clientService.updateClient(this.originalCpf, payload).subscribe({
        next: () => {
          alert('Client updated successfully!');
          this.clearForm();
          this.loadCustomers();
        },
        error: err => {
          const errorMessage = typeof err.error === 'string' ? err.error : 'Unexpected error occurred.';
          alert(errorMessage);
          console.error(err);
        }
      });
    } else {
      this.clientService.createClient(payload).subscribe({
        next: () => {
          alert('Client created successfully!');
          this.clearForm();
          this.loadCustomers();
        },
        error: err => {
          const errorMessage = typeof err.error === 'string' ? err.error : 'Unexpected error occurred.';
          alert(errorMessage);
          console.error(err);
        }
      });
    }
  }

  editCustomer(customer: ClientRequestPayload): void {
    this.clientService.getClientByCpf(customer.cpf).subscribe({
      next: (fullCustomer: ClientRequestPayload) => {
        this.customerForm.patchValue({
          name: fullCustomer.name,
          cpf: fullCustomer.cpf
        });

        this.phones.clear();
        fullCustomer.phones?.forEach(phone => {
          this.phones.push(this.fb.group({ number: phone.number }));
        });

        this.addresses.clear();
        fullCustomer.addresses?.forEach(address => {
          this.addresses.push(
            this.fb.group({
              street: address.street,
              complement: address.complement,
              city: address.city,
              state: address.state,
              zipCode: address.zipCode
            })
          );
        });

        this.originalCpf = fullCustomer.cpf;
        this.isEditing = true;
      },
      error: err => {
        alert('Error loading customer data.');
        console.error(err);
      }
    });
  }

  clearForm(): void {
    this.customerForm.reset();
    this.phones.clear();
    this.addresses.clear();
    this.isEditing = false;
    this.originalCpf = null;
  }

  loadCustomers(): void {
    this.clientService.getAllClients().subscribe({
      next: data => (this.customers = data),
      error: () => console.error('Error fetching clients')
    });
  }

  deleteCustomer(cpf: string): void {
    if (confirm(`Are you sure you want to delete the client with CPF ${cpf}?`)) {
      this.clientService.deleteClient(cpf).subscribe({
        next: () => this.loadCustomers(),
        error: err => {
          alert('Error deleting client. Check console.');
          console.error(err);
        }
      });
    }
  }

  private isFormValid(): boolean {
    const phonesValid = this.phones.length > 0;
    const addressesValid = this.addresses.length > 0;
    return this.customerForm.valid && phonesValid && addressesValid;
  }
}
