import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectsComponent } from '../projects/projects.component';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent {
  public title: string;
  public project: Project;
  public status:string;
  public filesToUpload: Array<File>;
 public save_project:any;
 public url:string;
    constructor (
      private _projectService: ProjectService,
      private _uploadService: UploadService
 ){
    this.title = 'Crear proyecto';
    this.project = new Project('','','','',2023,'','');
    this.status = '';
    this.filesToUpload = new Array<File>();
    this.save_project = "";
    this.url = global.url;
 }

   onSubmit (form:any){
        
        //Guardar daros basicos

        this._projectService.saveProject(this.project).subscribe(
          response => {
            if(response.project)
            {
             
              //Subir la imagen
                if(this.filesToUpload){
              this._uploadService.makeFileRequest(global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
              .then((result:any)=>{
                
                this.save_project = result.project;
                this.status = 'success';
                console.log(result);  
                form.reset();
              });
            }else {
              this.save_project = response.project;
              this.status = 'success';
              form.reset();
            }

             
            }else{
              this.status = 'failed';
            }
          },
          error => {
                console.log(<any>error);
          }
        );
   }
   
   fileChangeEvent(fileInput:any)
   {
      this.filesToUpload = <Array<File>>fileInput.target.files;


   }

   

}
