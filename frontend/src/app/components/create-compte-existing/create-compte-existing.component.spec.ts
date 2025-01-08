import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompteExistingComponent } from './create-compte-existing.component';

describe('CreateCompteExistingComponent', () => {
  let component: CreateCompteExistingComponent;
  let fixture: ComponentFixture<CreateCompteExistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompteExistingComponent]
    });
    fixture = TestBed.createComponent(CreateCompteExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
