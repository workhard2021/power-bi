import { Component, ElementRef } from '@angular/core';
import * as pbi from 'powerbi-client';
import { AuthAzureService } from '../../service/azure/auth-azure.service';import { PowerbiService } from '../power-bi-report/service/powerbi-auth.service';
;

@Component({
  selector: 'app-power-bi-report2',
  standalone: false,
  templateUrl: './power-bi-report-2.component.html',
  styleUrl: './power-bi-report-2.component.scss'
})

export class PowerBiReport2Component {
  apiUrl:string="https://login.microsoftonline.com/4d24a5e1-43ac-47f2-8666-7018b13dec8a/oauth2/v2.0/token";
  urlReport:string="https://api.powerbi.com/v1.0/myorg/GenerateToken"
  reportId="8655950c-beb7-484c-957a-6879c6004e96"
  datasetId="b642ae4f-c6ab-4dbb-8e47-9faf12b1164b"
  initToken:any;

  constructor(private el: ElementRef,private powerbiService:PowerbiService,private authAzureService: AuthAzureService) {}

  async ngAfterViewInit() {
        const accessToken= await this.authAzureService.acquireTokenPowerBi()|| '';
        const data:any={
         "datasets": [
           {
             "id": this.datasetId
           }
         ],
         "reports": [
           {
             "id": this.reportId
           }
         ]};
         if(accessToken){
          this.powerbiService.getPowerBiReport(data,accessToken).subscribe((powerbiToken:any)=>{
            this.initPowerBi(powerbiToken.token,this.reportId)
           })
         }
  }

  initPowerBi(accessToken:string,reportId:string): void | null {
    if(!accessToken){
      return null;
    }
    const embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}`,
      accessToken,
      tokenType: pbi.models.TokenType.Embed,
      permissions: pbi.models.Permissions.All,
      viewMode: 0,
      settings: {
        panes: {
          filters: {
            visible: false
          },
          pageNavigation: {
            visible: false
          }
        },
        filterPaneEnabled: false,
        navContentPaneEnabled: true
      }
    };
    const reportContainer = this.el.nativeElement.querySelector('#reportContainer');
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    powerbi.embed(reportContainer,embedConfig);
  }

}