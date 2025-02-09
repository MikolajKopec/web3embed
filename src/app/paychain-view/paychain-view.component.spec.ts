import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaychainViewComponent } from './paychain-view.component';

describe('PaychainViewComponent', () => {
  let component: PaychainViewComponent;
  let fixture: ComponentFixture<PaychainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaychainViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaychainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
