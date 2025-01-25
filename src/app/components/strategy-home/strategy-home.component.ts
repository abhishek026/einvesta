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
  QTYArr: number[] = [25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500];
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
      this.orderDataList = this.mergeCEAndPEWithEqualStrike(this.tradeList.order_data_list);
      this.brokerList = this.tradeList.brokers;
      // this.loader.hideLoader();
    })
  }
  onBrokerChange(broker: any) {
    this.selected_broker = broker

  }
  selectTrade(data: any,is_pe_order:boolean,action:string) {
    this.setValueOnSelected(data,is_pe_order,action);
    let key_trading_symbol=this.getUniqeKey(data);
    if (this.tradeMap.has(key_trading_symbol)) {
      this.tradeMap.set(key_trading_symbol, { ...this.tradeMap.get(key_trading_symbol), ...data });
    } else {
      this.tradeMap.set(key_trading_symbol, {...data});
    }
    this.selectedTrades = Array.from(this.tradeMap.values());
  }
  getUniqeKey(data: any): string {
    return data.order_status=='PE'?data.pe_trading_symbol:data.ce_trading_symbol;
  }
  setValueOnSelected(data: any,is_pe_order:boolean,action:string): any {
    data.action = action;
    data.multiplier = 1;
    data.order_status=is_pe_order?'PE':'CE'
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
  mergeCEAndPEWithEqualStrike(data:any){
   return Object.values(
    data.reduce((acc:any, item:any) => {
      const strike = item.strike;
      const prefix = item.inst_type.toLowerCase(); // 'ce' or 'pe'
      if (!acc[strike]) {
        acc[strike] = { strike }; // Initialize the object with strike
      }
      Object.keys(item).forEach((key) => {
        if (key !== "strike") {
          acc[strike][`${prefix}_${key}`] = item[key];
        }
      });
  
      return acc;
    }, {})
  );
  }
}
