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
  displayDate: string = 'Select Date';
  tradeList: any;
  orderDataList: any = [];
  brokerList: any = [];
  selected_broker: any;
  tradeMap: Map<string, any> = new Map<string, any>();
  selectedTrades: any = [];
  multiplierArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedMultiplyer:number=1;
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
    this.http.get(API_ENDPOINTS.STRAGEGY.DATE).subscribe((res: any) => {
      this.dateList = this.preparedDateDropDown(res.result);
      this.loader.hideLoader();
    })
  }
  preparedDateDropDown(res: any): { key: string; displayValue: string; }[] {
    return Object.keys(res).map((key) => ({
      key,
      displayValue: res[key],
    }));
  }
  onDateChange(obj: any) {
    this.selectedDate = obj.key;
    this.displayDate = obj.displayValue;
    if (this.selectedDate == '') {
      this.toaster.showError('Please Select Validate Date!!', "Error!");
      return;
    }
    this.getTradeList(this.selectedDate);
  }
  getTradeList(selectedDate: string) {
    this.loader.showLoader();
    this.http.get(API_ENDPOINTS.STRAGEGY.GET_BY_DATE(selectedDate)).subscribe((res: any) => {
      this.tradeList = res.result;
      this.orderDataList = this.tradeList.order_data_list;
      this.brokerList = this.tradeList.brokers;
      // this.loader.hideLoader();
    })
  }
  onBrokerChange(broker: any) {
    this.selected_broker = broker

  }
  selectTrade(data: any) {
    debugger
    this.setValueOnSelected(data);
    if (this.tradeMap.has(data.trading_symbol)) {
      this.tradeMap.set(data.trading_symbol, { ...this.tradeMap.get(data.trading_symbol), ...data });
    } else {
      this.tradeMap.set(data.trading_symbol, data);
    }
    this.selectedTrades = Array.from(this.tradeMap.values());
  }
  setValueOnSelected(data: any): any {
    data.status = 'S';
    data.multiplier = 1;
  }
  deleteTrade(data: any) {
    if (this.tradeMap.has(data.trading_symbol)) {
      this.tradeMap.delete(data.trading_symbol);
      this.selectedTrades = Array.from(this.tradeMap.values());
    }
  }
  updateQty(multiplier: any) {
    this.selectedMultiplyer=multiplier;
    this.selectedTrades = this.selectedTrades.map((trade:any)=> {
      return { ...trade, multiplier: multiplier }; 
    });
  }
  updateType(data:any){
    if(data.inst_type=='PE'){
      data.inst_type='CE'
    }else{
      data.inst_type='PE'
    }
  }
  updateStrike(data:any,action:string){
    if(action=='Add'){
      data.strike=Number(data.strike)+50;
    }else{
      data.strike=Number(data.strike)-50;
    }
  }
}
