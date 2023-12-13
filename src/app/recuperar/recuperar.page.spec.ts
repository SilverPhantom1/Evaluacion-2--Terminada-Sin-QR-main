import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RecuperarPage } from './recuperar.page';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;
  let apiRestService: any;
  let router: Router;

  beforeEach(async(() => {
    apiRestService = {
      getNombreDocentePorUsuario: jasmine.createSpy('getNombreDocentePorUsuario').and.returnValue(of('NombreDocente')),
    };

    TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: ApiRestService, useValue: apiRestService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('Te redirije a la pagina Home si el usuario es encontrado', () => {
    component.usuario = 'testUser';
    component.recuperarContrasena();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
