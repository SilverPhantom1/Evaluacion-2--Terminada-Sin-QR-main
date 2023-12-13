import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatosPersonaPage } from './datos-persona.page';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosPersonaPage', () => {
  let component: DatosPersonaPage;
  let fixture: ComponentFixture<DatosPersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatosPersonaPage],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Se consigue el método llamado "ionViewWillEnter"', () => {
    expect(component.ionViewWillEnter).toBeDefined();
  });

  it('ionViewWillEnter  llama a getAlumnoByID con el ID correcto', () => {
    spyOn(component, 'getIdFromURL').and.returnValue(1);
    spyOn(component, 'getAlumnoByID').and.callThrough();

    component.ionViewWillEnter();

    expect(component.getIdFromURL).toHaveBeenCalled();
    expect(component.getAlumnoByID).toHaveBeenCalledWith(1);
  });

  it('Se consigue un método llamado "getIdFromURL"', () => {
    expect(component.getIdFromURL).toBeDefined();
  });

  it('Se consigue un método llamado "getAlumnoByID"', () => {
    expect(component.getAlumnoByID).toBeDefined();
  });

});
