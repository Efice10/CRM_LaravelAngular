// Import necessary testing dependencies from Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component being tested
import { DashboardComponent } from './dashboard.component';

// Define a test suite for the DashboardComponent
describe('DashboardComponent', () => {
  // Declare variables to hold component instance and testing fixture
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // Set up the testing environment before each test case
  beforeEach(async () => {
    // Configure the testing module with necessary declarations
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();

    // Create an instance of the component and testing fixture
    fixture = TestBed.createComponent(DashboardComponent);
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
