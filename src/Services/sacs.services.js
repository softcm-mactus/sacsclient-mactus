import http from "../http-common";

class SACSDataServices {
    // App Header
    GetAppHeaderdetails() {
        return http.get("/home/GetAppHeaderdetails");
    }

    // Menu

    // Dashboard
    GetAllCurrentInUsers() {
        return http.get("/dashboard/GetAllCurrentInUsers");
    }
    GetAdminUserByUserId(UserId) {
        return http.get(`/Users/GetAdminUserByUserId/${UserId}`);
    }
    UpdateUserAudioName(UserId, AudioName){
        return http.post(`/Users/UpdateUserAudioName/${UserId},${AudioName}`);
    }
    UpdateUserLineAssociate(data){
        return http.post(`/Users/UpdateUserLineAssociate/`,data);
    }
    
    UpdateUserTrainingdetails(data){
        return http.post("/Users/UpdateUserTrainingdetails/",data);
    }
    // GetAllUsersByLineId(lineID){
    //     return http.get("/dashboard/GetAllUsersByLineId",{lineID});
    // }
    GetBioReaders() {
        return http.get("/dashboard/GetBioReaders");
    }
    SaveCommand(cmdId, UserId, Remarks) {

        return http.post(`/dashboard/SaveCommand/${cmdId},${UserId},${Remarks}`);
    }

    GetALlLines() {
        return http.get("/dashboard/GetALlLines");
    }
    GetAllUsersByLineId(lineid) {
        return http.get(`/Dashboard/GetAllUsersByLineId/${lineid}`);
    }
    GetAllHMIStatus() {
        return http.get("/dashboard/GetAllHMIStatus");
    }
    GetAllSACSServerStatus() {
        return http.get("/dashboard/GetAllSACSServerStatus");
    }
    GetAllPLCStatus() {
        return http.get("/dashboard/GetAllPLCStatus");
    }
    CheckUserskLogin(data) {
        return http.post("/Login/Authenticate/", data).catch(e => {            
        });
    }
    CheckUserLoginError(data){
       // alert(JSON.stringify(data) )
        return http.post("/Home/CheckUserLoginError/", data).catch(e => {          
        });
    }
    UpdateUIConfiguration(lineid) {
        return http.get(`/dashboard/UpdateUIConfiguration/${lineid}`);
    }
    LoadDoorStatusPoints(lineid) {
        return http.get(`/dashboard/LoadDoorStatusPoints/${lineid}`);
    }
    LoadLineCommandPoints(lineid) {
        return http.get(`/dashboard/LoadLineCommandPoints/${lineid}`);
    }
    GetCommandNameByCommandId(cmdId) {
        return http.get(`/dashboard/GetCommandNameByCommandId/${cmdId}`);
    }
    GetDashboardAlert() {
        return http.get('/Dashboard/GetDashboardAlert');
    }
    

    //Report
    GetAllAlarmSummary() {
        //alert("hi");
        return http.get("/Reports/GetAllAlarmSummary/");
    }
    GetAllAlarmSummaryByLineID(fromdate, todate, lineid) {
        return http.get(`/Reports/GetAllAlarmSummaryByLineID/${fromdate}, ${todate},${lineid}`);
    }

    //Configurations
    GetAllSiteConfiguration() {
        return http.get("/Configuration/GetAllSiteConfiguration/");
    }
    UpdatePlantConfiguration(ConfigData, UserId) {
        return http.post(`/Configuration/UpdatePlantConfiguration/${UserId}`, ConfigData).catch(e => {
            console.log(e);
        });
    }
    SaveLineConfigurations(data, LineId, UserId) {
        return http.post(`/Configuration/SaveLineConfiguration/${LineId},${UserId}`, data);
    }
    GetAllHealthCheckListName() {
        return http.get("/Configuration/GetAllHealthCheckListName");
    }
    GetAllHealthCheckLisById(Id) {
        return http.get(`/Configuration/GetAllHealthCheckLisById/${Id}`)
    }
    GetLineConfigurationByLineId(LineId) {
        return http.get(`/Configuration/GetLineConfigurationByLineId/${LineId}`);
    }
    UpdateCheckList(data) {      
        return http.post('/Configuration/UpdateCheckList/',data);
    }
    GetAllConfiguredVoiceMessages(){
        return http.get(`/Configuration/GetAllConfiguredVoiceMessages/`);
    }
    GetAllStandardMessages(){
        return http.get(`/Configuration/GetAllStandardMessages/`);
    }
    GetAllFillingLineUsers(LineId){
        return http.get(`/Configuration/GetAllFillingLineUsers/${LineId}`);
    }
    SaveStdVoiceMessages(LineId, UserName, VoiceMessage){
        return http.post(`/Configuration/SaveStdVoiceMessages/${LineId}, ${UserName}, ${VoiceMessage}`);
    }
    GetActiveMessageCount(){
        return http.get(`/Configuration/GetActiveMessageCount`);
    }

    GetAllPendingAlarms() {
        return http.get("/Reports/GetAllPendingAlarms");
    }
    GetAllPendingDescrepancy() {
        return http.get("/Reports/GetAllPendingDescrepancy");
    }
    SaveAlarmAllAckkowledgement(Remarks, UserId) {
        return http.post(`Reports/SaveAlarmAllAckkowledgement/${Remarks},${UserId}`);
    }
    SaveAlarmSingleAckkowledgement(Id, Remarks, UserId) {
        return http.post(`Reports/SaveAlarmSingleAckkowledgement/${Id},${Remarks},${UserId}`);
    }
    SaveDesrepancyAcknowledgement(Id, Remarks, UserId) {
        return http.post(`Reports/SaveDesrepancyAcknowledgement/${Id},${Remarks},${UserId}`);
    }
    GetAuditTrailReportByDate(fromdate, todate) {
        return http.get(`Reports/GetAuditTrailReportByDate/${fromdate},${todate}`);
    }
    GetConfigurationChangeReportByDate(fromdate, todate) {
        return http.get(`Reports/GetConfigurationChangeReportByDate/${fromdate},${todate}`);
    }
    GetVisitorsReportByDate(fromdate, todate) {
        return http.get(`Reports/GetVisitorsReportByDate/${fromdate},${todate}`);
    }
    GetEntryExitReportByDate(fromdate, todate, LineId) {
        return http.get(`Reports/GetEntryExitReportByDate/${fromdate},${todate},${LineId}`);
    }

    GetDiscrepancyReportByDate(fromdate, todate,UserId){              
        return http.get(`Reports/GetDiscrepancyReportByDate/${fromdate},${todate},${UserId}`);
    }
    GetUsersEntryExitReportByDate(fromdate, todate,UserId){
        return http.get(`Reports/GetUsersEntryExitReportByDate/${fromdate},${todate},${UserId}`);
    }
    GetLineDiscrepancyReportByDate(fromdate, todate){
        return http.get(`Reports/GetLineDiscrepancyReportByDate/${fromdate},${todate}`);
    }
    GetEventReportByDate(fromdate, todate,UserId){
        return http.get(`Reports/GetEventReportByDate/${fromdate},${todate},${UserId}`);
    }
    GetEventLineReportByDate(fromdate, todate,LineId){
        return http.get(`Reports/GetEventLineReportByDate/${fromdate},${todate},${LineId}`);
    }
    //User management strat
    GetAllDepartments() {
        return http.get("/Users/GetAllDepartments")
    }
    GetAllRoles() {
        return http.get("/Users/GetAllRoles")
    }
    GetAllBioUsres() {
        return http.get("/Users/GetAllBioUsres")
    }
    UpdateIsSupervisors(UserId) {
        return http.post(`/Users/UpdateIsSupervisors/${UserId}`)
    }
    GetLineAssociationByUserId(UserId) {
        return http.get(`Users/GetLineAssociationByUserId/${UserId}`)
    }
    ResetHMIPINByUserId(UserId) {
        return http.post(`Users/ResetHMIPINByUserId/${UserId}`)
    }
    GetTrainigExpDetailsByUserId(UserId) {
        return http.get(`/Users/GetTrainigExpDetailsByUserId/${UserId}`);
    }
    UpdateUserDepartmentByUserId(UserId, DeptName) {
        return http.put(`/Users/UpdateUserDepartmentByUserId/${UserId},${DeptName}`);
    }
    UpdateUserEnableDisabelByUserId(UserId) {
        return http.put(`/Users/UpdateUserEnableDisabelByUserId/${UserId}`);
    }
    UpdateUserActiveorInactiveByUserId(UserId) {
        return http.put(`/Users/UpdateUserActiveorInactiveByUserId/${UserId}`);
    }
    SaveAdminUsersDetails(Users, ActionName) {
        //alert(JSON.stringify (Users))
        return http.post(`/Users/SaveAdminUsersDetails/${ActionName}`, Users)
    }
    GetAllAdminUsers() {
        return http.get("/Users/GetAllAdminUsers")
    }
    GetAllActiveAdminUsers(){
        return http.get("/Users/GetAllActiveAdminUsers")
    }
    SaveLinkAdmin(UserId,  AdminId){
        return http.post(`/Users/SaveLinkAdmin/${UserId}, ${AdminId}`)
    }
    GetHMICheckListAssociation(){
        return http.get(`/Configuration/GetHMICheckListAssociation/`)
    }
    SaveHMICheckListAssociation(data){
        return http.post(`/Configuration/SaveHMICheckListAssociation/`, data)
    }
    GetAllBioUsersName(){
        return http.get(`/Users/GetAllBioUsersName/`);
    }
}
export default new SACSDataServices();