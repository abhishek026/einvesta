import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { API_ENDPOINTS } from 'src/app/utils/api-constants';
declare var $: any;
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
  QTYArr: number[] = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];
  selectedMultiplyer: number = 1;
  template_name: string = ''
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
  selectTrade(data: any, is_pe_order: boolean, action: string) {
    this.setValueOnSelected(data, is_pe_order, action);
    let key_trading_symbol = this.getUniqeKey(data);
    if (this.tradeMap.has(key_trading_symbol)) {
      this.tradeMap.set(key_trading_symbol, { ...this.tradeMap.get(key_trading_symbol), ...data });
    } else {
      this.tradeMap.set(key_trading_symbol, { ...data });
    }
    this.selectedTrades = Array.from(this.tradeMap.values());
  }
  getUniqeKey(data: any): string {
    return data.order_status == 'PE' ? data.pe_trading_symbol : data.ce_trading_symbol;
  }
  setValueOnSelected(data: any, is_pe_order: boolean, action: string): any {
    data.action = action;
    data.multiplier = 1;
    data.order_status = is_pe_order ? 'PE' : 'CE'
  }
  deleteTrade(data: any) {
    if (this.tradeMap.has(data.trading_symbol)) {
      this.tradeMap.delete(data.trading_symbol);
      this.selectedTrades = Array.from(this.tradeMap.values());
    }
  }
  updateQty(multiplier: any) {
    this.selectedMultiplyer = multiplier;
    this.selectedTrades = this.selectedTrades.map((trade: any) => {
      return { ...trade, multiplier: multiplier };
    });
  }
  updateType(data: any) {
    if (data.inst_type == 'PE') {
      data.inst_type = 'CE'
    } else {
      data.inst_type = 'PE'
    }
  }
  updateStrike(data: any, action: string) {
    if (action == 'Add') {
      data.strike = Number(data.strike) + 50;
    } else {
      data.strike = Number(data.strike) - 50;
    }
  }
  mergeCEAndPEWithEqualStrike(data: any) {
    return Object.values(
      data.reduce((acc: any, item: any) => {
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
  dateList1 = [
    { id: 1, displayValue: '01 Jan 2025' },
    { id: 2, displayValue: '02 Jan 2025' },
    { id: 3, displayValue: '03 Jan 2025' },
    { id: 4, displayValue: '04 Jan 2025' },
    { id: 5, displayValue: '05 Jan 2025' },
  ];

  selectedDates: any[] = [];

  // Check if the date is already selected
  isSelected(date: any): boolean {
    return this.selectedDates.some(selected => selected.id === date.id);
  }

  // Toggle selection for a date
  toggleSelection(date: any): void {
    const index = this.selectedDates.findIndex(selected => selected.id === date.id);
    if (index === -1) {
      this.selectedDates.push(date);
    } else {
      this.selectedDates.splice(index, 1);
    }
  }
  getValue() {
    return this.selectedDates.map(date => date.displayValue).join(', ')
  }
  saveIntoDraft() {
    debugger
    if (this.validatePayload()) {
      let reqPayload = this.preparedPayload();
      this.http.post(API_ENDPOINTS.STRAGEGY.SAVE_ORDER_TEMPLATE, reqPayload).subscribe((res: any) => {
        this.toaster.showSuccess("Template Save Successfully!!");
        this.selectedTrades = [];
        this.tradeMap= new Map<string, any>();

      });
    }
  }
  preparedPayload() {
    const prepareOrders = (data: any[]): any[] => {
      return data.map((item: any) => {
        if (item.order_status == 'PE') {
          return {
            exchange_token: item.pe_exchange_token,
            instrument_token: item.pe_instrument_token,
            trading_symbol: item.pe_trading_symbol,
            expiry: this.selectedDate,
            expiry_value: this.selectedDate,
            strike: item.strike,
            inst_type: item.pe_inst_type,
            lot_size: item.pe_lot_size,
            stop_loss: item.pe_stop_loss,
            broker: item.broker,
            lots: item.pe_lots,
            qty: item.pe_qty,
            exchange: item.pe_exchange,
            order_type: item.pe_order_type,
            transaction_type: item.action,
            template_name: this.template_name,
            active: true,
          };
        } else if (item.order_status == 'CE') {
          return {
            exchange_token: item.ce_exchange_token,
            instrument_token: item.ce_instrument_token,
            trading_symbol: item.ce_trading_symbol,
            expiry: this.selectedDate,
            expiry_value: this.selectedDate,
            strike: item.strike,
            inst_type: item.ce_inst_type,
            lot_size: item.ce_lot_size,
            stop_loss: item.ce_stop_loss,
            broker: item.ce_broker,
            lots: item.ce_lots,
            qty: item.ce_qty,
            exchange: item.ce_exchange,
            order_type: item.ce_order_type,
            transaction_type: item.action,
            template_name: this.template_name,
            active: true,
          };
        }
        return null; // Optional: handle invalid cases
      }).filter(order => order !== null); // Filter out invalid or null entries
    };

    return prepareOrders(this.selectedTrades);
  }

  validatePayload() {
    return true;
  }
  openPopUp() {
    ($("#add_to_draft_popup") as any).modal("show");
  }
  closePopUp() {
    ($("#add_to_draft_popup") as any).modal("hide");

  }
  clearSelectedTrade(){
    if(confirm("Do you want to clear all selected trades?")) {
    this.selectedTrades = [];
    this.tradeMap= new Map<string, any>();
    }
  }
}
