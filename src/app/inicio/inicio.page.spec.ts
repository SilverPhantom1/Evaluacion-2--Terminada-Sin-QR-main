import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { InicioPage } from './inicio.page';
import { ApiRestService } from '../api-rest.service';
import { of } from 'rxjs';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let apiRestService: any;

  beforeEach(async(() => {
    apiRestService = jasmine.createSpyObj('ApiRestService', ['listarAlumnos']);
    apiRestService.listarAlumnos.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [InicioPage],
      providers: [
        { provide: ApiRestService, useValue: apiRestService },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se inicializa la lista de alumnos al entrar en la vista', () => {
    component.ionViewWillEnter();
    expect(component.alumnos).toEqual([]);
  });

  it('Se cambia el estado de codigoQRGenerado a false inicialmente', () => {
    expect(component.codigoQRGenerado).toBeFalsy();
  });
});