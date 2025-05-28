import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CustomerManagementComponent } from './customer-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ClientService } from '../../service/cliente.service';
import { ClientRequestPayload } from '../../payload/client-payload';

const mockClientService = {
  getAllClients: jasmine.createSpy().and.returnValue(of([])),
  createClient: jasmine.createSpy().and.returnValue(of(null)),
  updateClient: jasmine.createSpy().and.returnValue(of(null)),
  deleteClient: jasmine.createSpy().and.returnValue(of(null)),
  getClientByCpf: jasmine.createSpy().and.returnValue(of({
    name: 'John Doe',
    cpf: '12345678901',
    phones: [{ number: '999999999' }],
    addresses: [{
      street: 'Street 1',
      complement: '',
      city: 'City',
      state: 'State',
      zipCode: '00000000'
    }]
  }))
};

describe('CustomerManagementComponent', () => {
  let component: CustomerManagementComponent;
  let fixture: ComponentFixture<CustomerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CustomerManagementComponent],
      providers: [
        { provide: ClientService, useValue: mockClientService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form if name is too short or cpf is invalid', () => {
    component.customerForm.setValue({ name: 'Short', cpf: '123', phones: [], addresses: [] });
    expect(component.customerForm.invalid).toBeTrue();
  });

  it('should prevent saving without at least one phone and one address', () => {
    spyOn(window, 'alert');
    component.customerForm.setValue({ name: 'Valid Name Here', cpf: '12345678901', phones: [], addresses: [] });
    component.save();
    expect(window.alert).toHaveBeenCalledWith('Please fill out all required fields correctly.');
  });

  it('should call createClient if form is valid and not editing', () => {
    component.customerForm.patchValue({ name: 'Valid Name Here', cpf: '12345678901' });
    component.addPhone();
    component.addAddress();
    component.customerForm.get('phones')?.setValue([{ number: '999999999' }]);
    component.customerForm.get('addresses')?.setValue([{
      street: 'Street',
      complement: '',
      city: 'City',
      state: 'State',
      zipCode: '12345678'
    }]);

    component.save();
    expect(mockClientService.createClient).toHaveBeenCalled();
  });

  it('should call updateClient if editing is true', () => {
    component.isEditing = true;
    component.originalCpf = '12345678901';
    component.customerForm.patchValue({ name: 'Valid Name Here', cpf: '12345678901' });
    component.addPhone();
    component.addAddress();
    component.customerForm.get('phones')?.setValue([{ number: '999999999' }]);
    component.customerForm.get('addresses')?.setValue([{
      street: 'Street',
      complement: '',
      city: 'City',
      state: 'State',
      zipCode: '12345678'
    }]);

    component.save();
    expect(mockClientService.updateClient).toHaveBeenCalled();
  });

  it('should load customer for editing', fakeAsync(() => {
    component.editCustomer({ name: 'John Doe', cpf: '12345678901', phones: [], addresses: [] });
    tick();
    expect(component.customerForm.value.name).toEqual('John Doe');
    expect(component.phones.length).toBe(1);
    expect(component.addresses.length).toBe(1);
  }));

  it('should clear form on clearForm()', () => {
    component.clearForm();
    expect(component.customerForm.value.name).toBeNull();
    expect(component.phones.length).toBe(0);
    expect(component.addresses.length).toBe(0);
    expect(component.isEditing).toBeFalse();
    expect(component.originalCpf).toBeNull();
  });
});
