import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountScreenComponent } from './account-screen.component';

describe('AccountScreenComponent', () => {
  let component: AccountScreenComponent;
  let fixture: ComponentFixture<AccountScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
