import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { LineChartPayload, ChartElement } from './payloads/Greeting-interface';
import { ColorCode } from './payloads/Color-code';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  user:any;
  roles:any = [''];

  constructor(private http: HttpClient, private _router:Router) {
    const helper = new JwtHelperService();
    
    // this.roles = ['asset_mgt_view','trace_route_view','fota_mgt_view','user_mgt_view','topic_mgt_view','firmware_mgt_view'];
    // this.setUserRoles(this.roles);
    if(localStorage.getItem('REFRESH_TOKEN')!==null){
    var refreshExpired = helper.isTokenExpired(localStorage.getItem('REFRESH_TOKEN'));
    this.user = helper.decodeToken(localStorage.getItem('REFRESH_TOKEN')).sub;
    }    
    if(!refreshExpired){      
      this.isLoginSubject.next(true);      
    }else{            
      this.logout()
    }


  }



  // Java Backend Deflaut URL
   api_user_url = 'http://119.252.208.14:8085';
  // api_user_url = 'http://stagingbn.bt.exicom.in:8085';
  api_user_url1 = 'http://192.168.1.128:8086';
//  api_user_url2 = 'http://localhost:8090';
  api_user_url2 = 'http://119.252.208.14:8090';
  //api_user_url = 'http://192.168.1.88:8085';
   //api_user_url = 'http://192.168.1.167:8085';
  // api_user_url = 'http://localhost:8085';




  isLoading = new BehaviorSubject<boolean>(false);
  public show(): void {
    this.isLoading.next(true);
  }
  public hide(): void {
    this.isLoading.next(false);
  }

  // public isLoginSubject1: BehaviorSubject<Boolean> =
  //   new BehaviorSubject(false);
  isLoginSubject = new BehaviorSubject<boolean>(false);
  isUserAdminSubject = new BehaviorSubject<boolean>(true);

  //Fota Components
  isCompSubject = new BehaviorSubject<boolean>(false);
  isTcuSubject = new BehaviorSubject<boolean>(false);
  isBmsSubject = new BehaviorSubject<boolean>(false);
  isCfgSubject = new BehaviorSubject<boolean>(false);
  isFotaSubject = new BehaviorSubject<boolean>(false);


  isLoggedIn(): Observable<boolean> {
    console.log(this.isLoginSubject.asObservable());

    return this.isLoginSubject.asObservable();
  }
  isUserAdminObs(): Observable<boolean> {
    return this.isUserAdminSubject.asObservable();    
  }

  isUserAdminSub(): void {
    const helper = new JwtHelperService();         
    this.user = helper.decodeToken(localStorage.getItem('REFRESH_TOKEN')).sub;
    if(!(this.user == 'demo@exicom.in' || this.user == 'bigbasket@exicom.in')){
      this.isUserAdminSubject.next(true);
    }else{
      this.isUserAdminSubject.next(false);
    }
  }
  
  isUserAdmin(){
    const helper = new JwtHelperService();         
    this.user = helper.decodeToken(localStorage.getItem('REFRESH_TOKEN')).sub;   
    return !(this.user == 'demo@exicom.in' || this.user == 'bigbasket@exicom.in');
  }

  setUserRoles(roles){    
    this.roles = roles;
  }

  getUserRoles(){
    return this.roles;
  }
  
  isUserRole(role){    
    return this.roles.includes(role);
  }

  isUserExicom(){
    const helper = new JwtHelperService();         
    this.user = helper.decodeToken(localStorage.getItem('REFRESH_TOKEN')).sub;   
    return !(this.user == 'demo@exicom.in');
  }
  login(): void {
    this.isLoginSubject.next(true);
  }
  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('assetData');
    this.isLoginSubject.next(false);
  //  this._router.navigate(['/login']);
  }
  // To Validate User
  public isAuthenticated(): boolean {
    //Checking weather token is Present in Local Storage
    let token: any = localStorage.getItem('JWT_TOKEN');
    if (!!token) {
      return this.ValidateToken(token);
    }
    return false;
    //If Token isPresent then Validate Found token is Expired Or not
    // return this.ValidateToken(token);
  }

  // Subcribe IsTokenExpired Request to Get Value from Server
  public ValidateToken(token): any {
    return this.isTokenExpired()
      .subscribe(res => {
        console.log(res);

        return res
      });

  }

  //Check From Backend Token Is Expired or Not
  isTokenExpired(): Observable<any> {
    //const param = new HttpParams().append('token', "Bearer " + token)
    return this.http.get(this.api_user_url + '/IsTokenExpired');

  }

  //For fota button behaviour
  isCompSelected(flag): void{
    this.isCompSubject.next(flag);
  }

  isCompObservable(): Observable<boolean> {
    return this.isCompSubject.asObservable();
  }

  isTcuSelected(flag): void{
    this.isTcuSubject.next(flag);
  }

  isTcuObservable(): Observable<boolean> {
    return this.isTcuSubject.asObservable();
  }

  isBmsSelected(flag): void{
    this.isBmsSubject.next(flag);
  }

  isBmsObservable(): Observable<boolean> {
    return this.isBmsSubject.asObservable();
  }

  isCfgSelected(flag): void{
    this.isCfgSubject.next(flag);
  }

  isCfgObservable(): Observable<boolean> {
    return this.isCfgSubject.asObservable();
  }

  isFotaSelected(flag): void{
    this.isFotaSubject.next(flag);
  }

  isFotaObservable(): Observable<boolean> {
    return this.isFotaSubject.asObservable();
  }

  //For Login User
  setUserLogin(obj): Observable<any> {
    return this.http.post(this.api_user_url + "/authenticate", obj);
  }

  /* Get User Information By Id  */

  getUserDetailsByToken(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/user/getUserDetailsFromToken');
  }

  public getUserDetails(id: number): Observable<any> {
    console.log(id + "id in service");
    return this.http.get<any>(this.api_user_url + '/user/getUserDetails/' + id);

  }
  // /user/getUserDetails/{id}

  public getOrgDetails(id: number): Observable<any> {
    console.log(id + "id in service");

    return this.http.get<any>(this.api_user_url + '/organistaion/findOrgbyId/' + id);
  }
  public getOrgDetailsByToken(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/organistaion/findOrgByToken');
  }


  public saveOrgDetails(obj: Object): Observable<any> {
    return this.http.post<any>(this.api_user_url + '/organistaion/createOrUpdateOrganistion', obj)
  }

  public saveUserDetails(obj: Object): Observable<any> {
    return this.http.post<any>(this.api_user_url + '/user/createUser', obj)
  }



  public getBatteryData(lineChartObj: LineChartPayload): Observable<any> {
    // Initialize Params Object



    return this.http.post<any>(this.api_user_url + `/battery/data/date`, lineChartObj);
  }

  public getOrganisationData(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/organistaion/findAllOrg');
  }
  public getclientData(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/payload/master');
  }
  public saveDataForClient(obj: Object): Observable<any> {
    return this.http.post<any>(this.api_user_url + '/payload/saveClientPayloadSequenceByOrg', obj)
  }
  public donutDataCount() {
    return this.http.get<any>(this.api_user_url + '/battery/data/donutcount')
  }

  public batteryDataCount() {
    return this.http.get<any>(this.api_user_url + '/battery/data/batterycount')
  }

  public getUserParamTemplate(){
    return this.http.get<any>(this.api_user_url + '/asset/getUserParamTemplate');
  }

  public saveUserParamTemplate(userParam:any){
    return this.http.post<any>(this.api_user_url + '/asset/saveUserTemplateParameter',userParam);
  }

  public getParamValues(imeino){
    return this.http.get<any>(this.api_user_url + '/battery/data/getLatestRecord?imei='+imeino);
  }

  realTimeValue = new BehaviorSubject<any>('');

  castUser = this.realTimeValue.asObservable();

  public getRealTime(obj: any) {

    console.log(JSON.parse(obj.body));
    this.realTimeValue.next(JSON.parse(obj.body));
  }
  public getUpdatedData(id: number): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/payload/findClientPayloadSequenceByOrg/' + id);
  }

  public getAllBatteryMapData(): Observable<any> {
    //AllLatestBatteryDataMap
    return this.http.get<any>(this.api_user_url + '/battery/data/AllLatestBatteryDataMap');
  }

  public getAllAssets(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/asset/getAllAsset');
  }

  public getPingedbatteryData(id: number): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/battery/data/dashboardLine/` + id)
  }

  public getGainerBatteryData(id: number): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/battery/data/dashboardGainer/` + id)
  }
  public getDashboardActiveInactiveBar(id: number): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/battery/data/dashboardActiveInactiveBar/` + id)
  }
  public getBatteryModel(): Observable<any> {
    return this.http.get<any>(this.api_user_url1 + '/getAllModelWithPage');
  }
  //dashboardActiveInactiveBar

  public getBatterModelByName(Name: String): Observable<any> {
    return this.http.get<any>(this.api_user_url1 + "/getBatteryModelByName/" + Name);
  }

  public getAllBatteryChartData(timeInterval: string, senderId: number, startDate: Date, endDate: Date): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/battery/data/lineChartData?intervol=${timeInterval}&imei=${senderId}&startDate=${startDate}&endDate=${endDate}`);
  }

  public getTraceMapData(senderId: number, startDate:string, endDate: string): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/battery/data/getTraceRouteData?imei=${senderId}&startDate=${startDate}&endDate=${endDate}`);
  }


  public getBatteryInfoByImei(imei: number): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/asset/findByimei/${imei}`);

  }

  public getErrorWarningCount(imei: number): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/battery/data/errorWarningCount?imei=${imei}`)
  }

  public getAssetTreeData(imei: number): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/battery/data/getAssetTreeData?imei=${imei}`)
  }

  getBatteryInfoById(assetId):Observable<any>{
    return this.http.post<any>(this.api_user_url + `/asset/getAssetById?id=${assetId}`,{});
  }

  getAllAssetByOrgId(orgId): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/asset/getAllActiveAssetByOrgWithFilter/${orgId}`);
  }

  //FOTA API'S

  uploadBatchDetails(formdata,orgId): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/upload-csv-file/${orgId}`,formdata);
  }

  getBatches(): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + '/getBatch');
  }

  getAllBatchDetails(): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + '/getBatchDetails');
  }

  getAssetListForFota(orgId): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/get_asset_data_/${orgId}`);
  }

  // runFotaForSingleImei(orgId,imei,obj): Observable<any> {
  //   return this.http.post<any>(this.api_user_url2 + `/single_imei_run/${orgId}/${imei}`,obj);
  // }

  deleteBatch(batchId: any) : Observable<any>{
    return this.http.delete<any>(this.api_user_url2 + `/delete_batch_ByBatchId/${batchId}`); 
  }

  getImeiStatus(imei): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/status/${imei}`);
  }

  runBatchById(bid): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/batch_imei_run/${bid}`);
  }

  getBatchLogById(bid): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/get_t_batch_details_log_By_Batch_id_orderByDate/${bid}`);
  }

  getLogsByImeiAndId(imei,bid): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/get_t_batch_details_log_By_IMEI_AND_BATCH_orderByDate/${imei}/${bid}`);
  }

  getImeiListByBatch(bid): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/getBatchDetailsByBatchId/${bid}`);
  }

  createTopicByOrgId(orgId,cname): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/createTopic/${orgId}?clientName=${cname}`,'');   
  }

  displayTopicByOrgId(orgId): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/api/bms/displayTopicsByOrgId/${orgId}`);
  }

  getFirmwareList(): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/api/bms/firmwares/`);
  }

  firmwareExists(orgId,firmwareType,firmwareVersion): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/compare/${orgId}/${firmwareType}/${firmwareVersion}`,'');
  }

  createFirmware(orgId,firmwareType,firmwareVersion,file): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/create/${orgId}/${firmwareType}/${firmwareVersion}`,file);
  }

  retryFota(orgId,compType,imei): Observable<any>{
    return this.http.post<any>(this.api_user_url2 + `/retryFota/${orgId}/${compType}/${imei}`,'');
  }

  getBatchByOrgId(orgId): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/getBatchByOrgId/${orgId}`,'');
  }

  getAllCommands(): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/api/bms/commands`);
  }

  getSysCommands(): Observable<any> {
    return this.http.get<any>(this.api_user_url2 + `/api/bms/command/SYSCONFIG`);
  }

  runFotaSingleImei(request,orgId,imei): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/excute/single/${orgId}/${imei}`,request);
  }

  createBatch(file,orgId,bid): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/create/batch/${orgId}?batchId=${bid}`,file);
  }

  runBatch(bid,request): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/execute/batch/${bid}`,request);
  }

  deleteBatchById(bid): Observable<any> {
    return this.http.delete<any>(this.api_user_url2 + `/api/bms/delete/batch/${bid}`);
  }

  runConfigForSingleImei(orgId,imei,obj): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/excute/config/single/${orgId}/${imei}`,obj);
  }

  runConfigForBatch(batchId,obj): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/execute/config/batch/${batchId}`,obj);
  }

  getFirmwareVersions(): Observable<any>{
    return this.http.get<any>(this.api_user_url2 + `/api/bms/firmwares`);
  }

  pushCustomFota(orgId,imei,obj): Observable<any> {
    return this.http.post<any>(this.api_user_url2 + `/api/bms/excute/custom/${orgId}/${imei}`,obj);
  }

  // User Management

  getCurrentRolesList(): Observable<any> {
    return this.http.get<any>(this.api_user_url + '/api/admin/menu/bar');
  }

  getPrivilegeList(): Observable<any>{
    return this.http.get<any>(this.api_user_url + '/api/admin/privileges');
  }

  createRole(obj): Observable<any> {
    return this.http.post<any>(this.api_user_url + '/api/admin/role',obj);
  }

  getRoleData(id): Observable<any> {
    return this.http.get<any>(this.api_user_url + `/api/admin/role/${id}`);
  }

  getCategory(type): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/api/bms/category/${type}`);
  }

  getAssignRolesList(): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/api/admin/roles?size=1000&sort=id&order=Asc`);
  }

  assignRole(obj): Observable<any>{ 
    return this.http.post<any>(this.api_user_url + '/api/admin/role/assign/user',obj);
  }

  getUserById(id): Observable<any>{
    return this.http.get<any>(this.api_user_url + `/user/findUserbyId/${id}`);
  }

  updatePassword(obj): Observable<any>{
    return this.http.post<any>(this.api_user_url + '/api/bms/password/update',obj);
  }

  getCurrentRolesByPromise(): Observable<any> {
    return this.getCurrentRolesList().pipe(tap(res=>{
      return res;
    }));
  }

  savePayload(orgId,obj){
    return this.http.post<any>(this.api_user_url +  `/payload/${orgId}`,obj);
  }

  getPayload(orgId){
    return this.http.get<any>(this.api_user_url + `/payload/${orgId}`);
  }

  /*  */
  tranfromArray(columnName: any[], dataList: any, x: string, y: string) {
    let filterdata: any = {};
    let cellVoltageColumn: any=[];
    let cellSensorCol: any[] =[];
    console.log(columnName);
    
    console.log(dataList);

    if (dataList == 0) { return null }
    columnName.forEach(col => {
      filterdata[col] = dataList.map(f => f[col]);
      if (col == "cell_voltages") {
        let cellVoltages = filterdata[col];
        let cellDataArr: any[] = this.innerCellArrayExtract(cellVoltages, "cell");

        cellVoltageColumn = Object.keys(cellDataArr[0])
        cellVoltageColumn.forEach(element => {
          filterdata[element] = cellDataArr.map(f => f[element]);

        });
      }
      if (col == "cell_temperatures") {
        let cellVoltages = filterdata[col];
        let cellDataArr: any[] = this.innerCellArrayExtract(cellVoltages, "sensor");
        cellSensorCol =[];
        cellSensorCol = Object.keys(cellDataArr[0]);
        cellSensorCol.forEach(element => {
          filterdata[element] = cellDataArr.map(f => f[element]);

        });
      }
    });
    let margeCellCol = cellVoltageColumn.concat(cellSensorCol);
    let finalColName: any = columnName.concat(margeCellCol);
    console.log(finalColName);

    return this.createChartObject({ filterdata, finalColName, x, y });
  }

  private innerCellArrayExtract(cellVoltages: any, colName: string) {
    let cellDataArr: any[] = [];
    cellVoltages.forEach(element => {
      let cellArr = element.replace(/[[\]]/g, '').split(',');
      let celldata: any = {};
      for (let index = 1; index <= cellArr.length; index++) {
        const element = cellArr[index-1];
        celldata[colName + index] = element;
      }
      cellDataArr.push(celldata);
    });
    return cellDataArr;
  }
  createChartObject({ filterdata, finalColName, x, y }: { filterdata: any; finalColName: any; x: string, y: string }): ChartElement[] {
    let chartDataArray: any = [];
    console.log(finalColName);

    finalColName.forEach(col => {
      let chart = new ChartElement();
      if (col != 'timestamp' && col != 'tcu_date_ist' && col != 'tcu_date' && col != 'cell_voltages'
        && col != 'cell_temperatures' && col != 'bin') {
        chart.y = filterdata[col];
        chart.x = filterdata.timestamp;
        chart.legendgroup = col;
        chart.name = col;
        chart.type = "scatter";
        chart.xaxis = x;
        chart.yaxis = y;
        chart.hovertemplate = '<b>%{text}</b>';
        chart.mode = "lines+markers";
        chart.text = filterdata[col];
        chart.visible = "legend";
        chart.marker = {
          "size": "2",
          "line": {
            "width": 2,
            "color": ColorCode[col]
          }
        },
          chart.line = {
            "color": ColorCode[col],
            'width': 1.5
          }



      }
      chartDataArray.push(chart);
    });
    return chartDataArray;
  }

}
