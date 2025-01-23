import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { API_ENDPOINTS } from 'src/app/utils/api-constants';

@Component({
  selector: 'app-strategy-home',
  templateUrl: './strategy-home.component.html',
  styleUrls: ['./strategy-home.component.scss']
})
export class StrategyHomeComponent implements OnInit {
  dateList: { key: string; displayValue: string }[] = [];
  selectedDate: string = '';
  tradeList: any;
  orderDataList: any=[];
  brokerList: any=[];
  constructor(
    private http: HttpService,
    private loader: LoaderService,
    private toaster: ToastService
  ) { }

  ngOnInit(): void {
    this.getDateList();
  }
  getDateList() {
    this.loader.showLoader();
    this.http.get(API_ENDPOINTS.STRAGEGY.DATE).subscribe(res => {
      this.dateList = this.preparedDateDropDown(res);
      this.loader.hideLoader();
    })
  }
  preparedDateDropDown(res: any): { key: string; displayValue: string; }[] {
    return Object.keys(res).map((key) => ({
      key,
      displayValue: res[key],
    }));
  }
  onDateChange(event: any) {
    if (this.selectedDate == '') {
      this.toaster.showError('Please Select Validate Date!!', "Error!");
      return;
    }
    this.getTradeList(this.selectedDate);
  }
  getTradeList(selectedDate: string) {
    this.loader.showLoader();
    this.http.get(API_ENDPOINTS.STRAGEGY.GET_BY_DATE(selectedDate)).subscribe((res:any) => {
      this.tradeList=res;
      this.orderDataList = res.orderDataList;
      this.brokerList=res.brokers;
      this.loader.hideLoader();
    })
  }
}
