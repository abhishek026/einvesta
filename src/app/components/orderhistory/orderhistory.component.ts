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
  searchValue: string = '';
  templateDataMap: Map<string, any[]> = new Map<string, any[]>();
  templateDataList: any = [];
  constructor(private http: HttpService,
    private toaster: ToastService) { }

  ngOnInit(): void {
    this.fetchAllTemplate();
  }
  fetchAllTemplate() {
    this.http.get(API_ENDPOINTS.TEMPLATE.GET_ALL).subscribe((res: any) => {
      this.templateData = res.result;
      this.templateList = this.preparedTemplateList(this.templateData);
      this.dbTemplateList = [...this.templateList];
      this.templateDataMap = this.convertJsonToMap(this.templateData);
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
    if (confirm("Do you want to delete template?")) {
      this.http.delete(API_ENDPOINTS.TEMPLATE.DELETE(templateName)).subscribe((res: any) => {
        this.fetchAllTemplate();
        this.toaster.showSuccess("The template has been deleted successfully.")
      })
    }
  }
  searchTemplate() {
    if (this.searchValue == '') {
      this.templateList = this.dbTemplateList;
      return;
    }
    this.templateList = this.dbTemplateList;
    this.templateList = this.templateList.filter((template: any) =>
      template.template_name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
  convertJsonToMap = (json: any): Map<string, any[]> => {
    const map = new Map<string, any[]>();
    Object.keys(json).forEach((key) => {
      if (Array.isArray(json[key])) {
        map.set(key, json[key]);
      }
    });
    return map;
  };
  viewTemplateData(template_name: any) {
    debugger
    this.templateDataList = [];
    if (this.templateDataMap.has(template_name)) {
      this.templateDataList = this.templateDataMap.get(template_name);
    }
  }
}
