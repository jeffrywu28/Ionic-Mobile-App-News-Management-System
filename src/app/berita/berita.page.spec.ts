import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeritaPage } from './berita.page';

describe('BeritaPage', () => {
  let component: BeritaPage;
  let fixture: ComponentFixture<BeritaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeritaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeritaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
