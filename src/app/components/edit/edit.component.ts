import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectsComponent } from '../projects/projects.component';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit{

  public title: string;
  public project: Project;
  public status:string;
  public filesToUpload: Array<File>;
  public url:string;

 public save_project:any;
    constructor (
      private _projectService: ProjectService,
      private _uploadService: UploadService,
      private _router:Router,
      private _route:ActivatedRoute
 ){
    this.title = 'Editar proyecto';
    this.project = new Project('','','','',0,'','');
    this.status = '';
    this.filesToUpload = new Array<File>();
    this.save_project = "";
    this.url = global.url;
    
 }


 ngOnInit(): void {
  this._route.params.subscribe(params =>
    {
      let id = params['id'];

      this.getProject(id);
    });
}

getProject(id:string){
this._projectService.getProject(id).subscribe(
  response =>
  {
    this.project = response.project;
  },
  error =>{
    console.log(<any>error);
  }
)
}


//metodos del create 

onSubmit (form:any){
        
  //Guardar daros basicos

  this._projectService.updateProject(this.project).subscribe(
    response => {
      if(response.project)
      {
       
        //Subir la imagen

        if(this.filesToUpload){

        
        this._uploadService.makeFileRequest(global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
        .then((result:any)=>{
          
          this.save_project = result.project;
          this.status = 'success';
        
        });
      }
      else {
        this.save_project = response.project;
          this.status = 'success';
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
