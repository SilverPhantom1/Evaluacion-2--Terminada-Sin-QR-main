import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiRestService: jasmine.SpyObj<ApiRestService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiRestService', ['validarCredencialesDocente']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: ApiRestService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiRestService = TestBed.inject(ApiRestService) as jasmine.SpyObj<ApiRestService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('No se muestra mensaje de error si las credenciales son validas', fakeAsync(() => {
    apiRestService.validarCredencialesDocente.and.returnValue(of(true));
    spyOn(component, 'mostrarMensajeError');
    component.ingresar();
    tick();
    expect(component.mostrarMensajeError).not.toHaveBeenCalled();
  }));

  it('Se muestra un mensaje de error si las credenciales no son validas', fakeAsync(() => {
    apiRestService.validarCredencialesDocente.and.returnValue(of(false));
    spyOn(component, 'mostrarMensajeError');
    component.ingresar();
    tick();
    expect(component.mostrarMensajeError).toHaveBeenCalled();
  }));
});