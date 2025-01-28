import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { API_ENDPOINTS } from 'src/app/utils/api-constants';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent implements OnInit {
  templateList: any = [];
  dbTemplateList: any = [];
  templateData: any;
  searchValue:string='';
  constructor(private http: HttpService,
    private toaster: ToastService) { }

  ngOnInit(): void {
    this.fetchAllTemplate();
  }
  fetchAllTemplate() {
    debugger
    this.http.get(API_ENDPOINTS.TEMPLATE.GET_ALL).subscribe((res: any) => {
      debugger
      this.templateData = res.result;
      this.templateList = this.preparedTemplateList(this.templateData);
      this.dbTemplateList=[...this.templateList];
    })
  }
  preparedTemplateList(res: any): { template_name: string; created_date: string; }[] {
    return Object.keys(res).map((key) => (
      {
        template_name: key,
        created_date: moment(res[key][0].create_date).format('DD-MMM-YYYY h:mm A'),
      }));
  }
  deleteTemplate(templateName: any) {
    debugger
    if (confirm("Do you want to delete template?")) {
      this.http.delete(API_ENDPOINTS.TEMPLATE.DELETE(templateName)).subscribe((res: any) => {
        debugger
        this.fetchAllTemplate();
        this.toaster.showSuccess("Template Deleted Successfully!!")
      })
    }
  }
  searchTemplate(){
    debugger
    if (this.searchValue=='') {
      this.templateList=this.dbTemplateList;
      return;
    }  
    this.templateList=this.dbTemplateList;
    this.templateList=this.templateList.filter((template:any) =>
      template.template_name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
}
