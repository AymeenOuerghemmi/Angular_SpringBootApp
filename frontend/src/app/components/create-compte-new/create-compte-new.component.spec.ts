import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompteNewComponent } from './create-compte-new.component';

describe('CreateCompteNewComponent', () => {
  let component: CreateCompteNewComponent;
  let fixture: ComponentFixture<CreateCompteNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompteNewComponent]
    });
    fixture = TestBed.createComponent(CreateCompteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
