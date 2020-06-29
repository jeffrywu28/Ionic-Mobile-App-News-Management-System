import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddberitaPage } from './addberita.page';

describe('AddberitaPage', () => {
  let component: AddberitaPage;
  let fixture: ComponentFixture<AddberitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddberitaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddberitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
