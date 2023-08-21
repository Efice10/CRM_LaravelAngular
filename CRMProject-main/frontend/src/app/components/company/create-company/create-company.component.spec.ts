// Import necessary testing dependencies from Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component being tested
import { CreateCompanyComponent } from './create-company.component';

// Define a test suite for the CreateCompanyComponent
describe('CreateCompanyComponent', () => {
  // Declare variables to hold component instance and testing fixture
  let component: CreateCompanyComponent;
  let fixture: ComponentFixture<CreateCompanyComponent>;

  // Set up the testing environment before each test case
  beforeEach(async () => {
    // Configure the testing module with necessary declarations
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyComponent ]
    })
    .compileComponents();

    // Create an instance of the component and testing fixture
    fixture = TestBed.createComponent(CreateCompanyComponent);
    component = fixture.componentInstance;

    // Trigger initial change detection
    fixture.detectChanges();
  });

  // Define a test case: Check if the component can be created
  it('should create', () => {
    // Assert that the component instance is truthy (component was created)
    expect(component).toBeTruthy();
  });
});
