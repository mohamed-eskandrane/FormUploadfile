const base = `https://docs.google.com/spreadsheets/d/1N7hg-TeI4e4ctXfp-V3OYBKfNdZfHcv9mVoCH_fgYq4/gviz/tq?`;
let UrlUsers = base + "&sheet=Users&tq=" + encodeURIComponent('Select *');
let DataUsers = [];
let UrlAccounts = base + "&sheet=Purchases&tq=" + encodeURIComponent('Select *');
let DataCustomers = [];

document.addEventListener('DOMContentLoaded', LoadScript)
function LoadScript() {
    let Loading=document.getElementById("LoadingFormBrowser");
    let FormLoad=document.getElementById("FormLoad");
    Loading.className="fa fa-refresh fa-spin";
    ConvertMode();
    LoadUsers();
    const myTimeout = setTimeout(function(){ 
      FormLoad.style.display="none";
      Loading.className="fa fa-refresh";
    clearTimeout(myTimeout);
    }, 2500);
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("PassWord")!=null){
      document.getElementById("User_PassWord").value=localStorage.getItem("PassWord");
    }
    if( localStorage.getItem("User_Index")!=null){
        ShowSelectForm(localStorage.getItem("ActiveForm"));
      if(localStorage.getItem("ActiveForm")=="purchasesWi"){
        LoadpurchasesWi();
      }
      if(localStorage.getItem("ActiveForm")=="purchasesWi1"){
        LoadpurchasesWi1();
      }
      let Myusername =localStorage.getItem("User_Name")
      document.getElementById("Myusername").value= Myusername;
    }
  }
}

function ShowSelectForm(ActiveForm){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("Main").style.display="none";
  document.getElementById("purchasesWi").style.display="none";
  document.getElementById("purchasesWi1").style.display="none";
  document.getElementById(ActiveForm).style.display="flex";
  localStorage.setItem("ActiveForm",ActiveForm);
}


// *************************************Main**************

function ShowpurchasesWi1(){
  ShowSelectForm("purchasesWi1");
  LoadpurchasesWi1();
}

function ShowpurchasesWi(){
  ShowSelectForm("purchasesWi");
   LoadpurchasesWi();
}

function SignOutUser(){
  localStorage.removeItem("User_Index");
  localStorage.removeItem("User_Name");
  localStorage.removeItem("UserCode");
  document.getElementById('Myusername').value="";
  ShowSelectForm("loginPage");
}
function GoToMain(){
  ShowSelectForm("Main");
}
// **********************Loading*****************
function LoadUsers(){
  DataUsers=[];
  fetch(UrlUsers)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataUsers.push(rowUser);
      })
  })
}



// ***************Sign On**************
function IsfoundUser(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < DataUsers.length; index++) {
      if(TPassWord==DataUsers[index].PassWord){
        localStorage.setItem("User_Index", index);
        return true;
      }
    }
      error_User_ID.className="fa fa-warning";
      return false ;
  }

  function foundIndex(TPassWord){
      for (let index = 0; index < DataUsers.length; index++) {
        if(TPassWord==DataUsers[index].PassWord){
          return index;
        }
      }
      return -1
    }
  
function Istrue(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
  if(TPassWord===""){ error_User_ID.className="fa fa-warning"; return false;}else{ error_User_ID.className="" }
  if(IsfoundUser(TPassWord)===false){return false}else{error_User_ID.className=""}
  return true;
}

function Sign_In(){
  let User_PassWord= document.getElementById("User_PassWord");
  if (Istrue(User_PassWord.value)===true){
    let User_Index = localStorage.getItem("User_Index");
    let Myusername = document.getElementById("Myusername");
    Myusername.value= DataUsers[User_Index].UserName;
    localStorage.setItem("User_Name", DataUsers[User_Index].UserName);
    localStorage.setItem("PassWord",DataUsers[User_Index].PassWord);
    ShowSelectForm("Main");
  }
}

function ShowPassword(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Eye_Password= document.getElementById("Eye_Password");
  if (Eye_Password.className=="fa fa-eye"){
    User_PassWord.type="text";
    Eye_Password.className="fa fa-eye-slash";
  }else{
    User_PassWord.type="password";
    Eye_Password.className="fa fa-eye";
  }
}

// ***********************Mode*********************
function ConvertMode(){
  if (localStorage.getItem("FColor")==1){
    ConvertModeToSun();
  }else{
    ConvertModeToMoon();
  }
 }

function ConvertModeToSun(){
  localStorage.setItem("FColor", 1);
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333");
  document.querySelector(':root').style.setProperty('--THColor', "wheat");  
  document.querySelector(':root').style.setProperty('--TDColor', "yellow"); 
} 
function ConvertModeToMoon(){
  localStorage.setItem("FColor", 2);
  document.getElementById("Sun").style.display="inline-block";
  document.getElementById("Moon").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#424242"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
  document.querySelector(':root').style.setProperty('--THColor', "gray");  
  document.querySelector(':root').style.setProperty('--TDColor', "Red"); 
}  

// ********************purchasesWi
function LoadpurchasesWi(){
  let Loading=document.getElementById("LoadingFormBrowser");
  let FormLoad=document.getElementById("FormLoad");
  Loading.className="fa fa-refresh fa-spin";
  FormLoad.style.display="flex";
  const myTimeout = setTimeout(function(){ 
    FormLoad.style.display="none";
    Loading.className="fa fa-refresh";
  clearTimeout(myTimeout);
  }, 1000);
}
 function OnchangeMyinput(myfile){
    if(myfile.value===undefined){return} ; 
    let curFiles = myfile.files.item(0).name;
    document.getElementById("MyfileTxt").value = curFiles ;
  }
  function OnchangeMyinput1(myfile){
    if(myfile.value===undefined){return} ; 
    let curFiles = myfile.files.item(0).name;
    document.getElementById("MyfileTxt1").value = curFiles ;
  }
  function OnchangeMyinput2(myfile){
    if(myfile.value===undefined){return} ; 
    let curFiles = myfile.files.item(0).name;
    document.getElementById("MyfileTxt2").value = curFiles ;
  }
  
  function DeleteMyinput(){
    document.getElementById("Myfile").value = '' ;
    document.getElementById("MyfileTxt").value = '' ;
  }
  function DeleteMyinput1(){
    document.getElementById("Myfile1").value = '' ;
    document.getElementById("MyfileTxt1").value = '' ;
  }
  function DeleteMyinput2(){
    document.getElementById("Myfile2").value = '' ;
    document.getElementById("MyfileTxt2").value = '' ;
  }

// **************************purchasesBrowser***********

function LoadCustomers(){
  DataCustomers=[];
  fetch(UrlAccounts)
  .then(res => res.text())
  .then(rep => {
      const jsonData1 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzCustomers = [];
      jsonData1.table.cols.forEach((heading1) => {
          if (heading1.label) {
              let columnCustomers = heading1.label;
              colzCustomers.push(columnCustomers);
          }
      })
      jsonData1.table.rows.forEach((rowData1) => {
          const rowCustomers = {};
          colzCustomers.forEach((ele, ind) => {
              rowCustomers[ele] = (rowData1.c[ind] != null) ? rowData1.c[ind].v : '';
          })
          DataCustomers.push(rowCustomers);
      })
  })
}

function ClearSeaDate(){
  document.getElementById("SeaDate").value="";
}

function ClearTypeSH(){
  document.getElementById("TypeSH").value="";
}

function ClearUseNameSh(){
  document.getElementById("UseNameSh").value="";
}

function GetDateFromString(Str){
  let MM,DD;
  let ZZ=[];
  let SS=String(Str).substring(5,String(Str).length-1);
  ZZ=SS.split(",");
  if (Number(ZZ[1])<9 && Number(ZZ[1]).length!= 2){ MM=0 + String(parseInt(ZZ[1]) + 1)}else{ MM=(parseInt(ZZ[1]) + 1)}
  if (Number(ZZ[2])<=9 && Number(ZZ[1]).length!= 2){ DD=0 + ZZ[2]}else{ DD=ZZ[2]}
  return ZZ[0] + "-" + MM + "-" + DD
}

function LoadpurchasesWi1(){
  let Num,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2,Cou;
  let SeaDate=document.getElementById("SeaDate");
  let TypeSH=document.getElementById("TypeSH");
  let UseNameSh=document.getElementById("UseNameSh");
  let Loading=document.getElementById("LoadingFormBrowser");
  let FormLoad=document.getElementById("FormLoad");
  Loading.className="fa fa-refresh fa-spin";
  FormLoad.style.display="flex";
  LoadCustomers();
  document.getElementById("bodydataP").innerHTML=""
  const myTimeout = setTimeout(function(){ 
    if (isNaN(DataCustomers[0].Number)==false){
      for (let index = 0; index < DataCustomers.length; index++) {
        Num=DataCustomers[index].Number;
        if(Num!=""){
          Cou=1;
          Mydate=DataCustomers[index].Mydate;
          UserName=DataCustomers[index].UserName;
          Type=DataCustomers[index].Type;
          Note=DataCustomers[index].Note;
          fileUrl=DataCustomers[index].fileUrl;
          fileUrl1=DataCustomers[index].fileUrl1;
          fileUrl2=DataCustomers[index].fileUrl2;
          if(SeaDate.value!="" && TypeSH.value!="" && UseNameSh.value!= ""){
            if(SeaDate.value==Mydate && TypeSH.value==Type && UseNameSh.value==UserName){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value=="" && TypeSH.value!="" && UseNameSh.value!=""){
            if(UseNameSh.value==UserName && TypeSH.value==Type){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value=="" && TypeSH.value=="" && UseNameSh.value!=""){
            if(UseNameSh.value==UserName){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value!="" && TypeSH.value=="" && UseNameSh.value==""){
            if(SeaDate.value==Mydate){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value!="" && TypeSH.value=="" && UseNameSh.value!=""){
            if(SeaDate.value==Mydate  && UseNameSh.value==UserName){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value=="" && TypeSH.value!="" && UseNameSh.value==""){
            if(TypeSH.value==Type){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value!="" && TypeSH.value!="" && UseNameSh.value==""){
            if(TypeSH.value==Type && SeaDate.value==Mydate){AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)}
          }else if(SeaDate.value=="" && TypeSH.value=="" && UseNameSh.value==""){
            AddRowPrS1(Cou,index,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2)
          }          
        }
        Cou+=1
      }
    }
    FormLoad.style.display="none";
    Loading.className="fa fa-refresh";
  clearTimeout(myTimeout);
  }, 2500);
}

function AddRowPrS1(Num,ind,Mydate,UserName,Type,Note,fileUrl,fileUrl1,fileUrl2) {
  let bodydata=document.getElementById("bodydataP");
  let row = bodydata.insertRow();
  row.id="P" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "Num";
  cell.innerHTML = Num;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "ind";
  cell.innerHTML = ind;
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "Mydate";
  cell.innerHTML = GetDateFromString(Mydate);
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "UserName";
  cell.innerHTML = UserName;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "Type";
  cell.innerHTML = Type;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "Note";
  cell.innerHTML = Note;
  row.appendChild(td=document.createElement('td'));
  var aa = document.createElement('a');
  if(fileUrl!=null && fileUrl!=""){
    aa.href=fileUrl;
    aa.innerText="الرابط1";
    aa.target="_blank";
  }
  aa.id="aa" + bodydata.childElementCount;
  td.appendChild(aa);
  row.appendChild(td=document.createElement('td'));
  var aa1 = document.createElement('a');
  if(fileUrl1!=null && fileUrl!=""){
    aa1.href=fileUrl1;
    aa1.innerText="الرابط2";
    aa1.target="_blank";
}
  aa1.id="aa1" + bodydata.childElementCount;
  td.appendChild(aa1);
  row.appendChild(td=document.createElement('td'));
  var aa2 = document.createElement('a');
  if(fileUrl2!=null && fileUrl!=""){
  aa2.href=fileUrl2;
  aa2.innerText="الرابط3";
  aa2.target="_blank";
  }
  aa2.id="aa2" + bodydata.childElementCount;
  td.appendChild(aa2);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('button');
  btb.type = "button";
  btb.id="ButPA" + bodydata.childElementCount;
  btb.onclick=function(){showdatarowsP()};
  btb.innerHTML=`<a class='fa fa-edit' style='color:#ff5e00 ; width:100% ;'> </a>`
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.style.width="100%";
  };


  function showdatarowsP() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    console.log(indextable);
    let IndexRow=document.getElementById(indextable).children.item(1).textContent;
    console.log(IndexRow);
    let Loading=document.getElementById("LoadingFormBrowser");
    let FormLoad=document.getElementById("FormLoad");
    Loading.className="fa fa-refresh fa-spin";
    FormLoad.style.display="flex";
    const myTimeout = setTimeout(function(){ 
      FormLoad.style.display="none";
      Loading.className="fa fa-refresh";
      ShowSelectForm("purchasesWi");
    for (let index = 0; index < DataCustomers.length; index++) {
      if(index== IndexRow){
        document.getElementById("Mydate").value=GetDateFromString(DataCustomers[index].Mydate);
        document.getElementById("Myrow").value=index;
        document.getElementById("UserName").value=DataCustomers[index].UserName;
        document.getElementById("Type").value=DataCustomers[index].Type;
        document.getElementById("Note").value=DataCustomers[index].Note;
        document.getElementById("MyfileTxt").value=DataCustomers[index].fileUrl;
        document.getElementById("MyfileTxt1").value=DataCustomers[index].fileUrl1;
        document.getElementById("MyfileTxt2").value=DataCustomers[index].fileUrl2;
      }
    }
    clearTimeout(myTimeout);
  }, 2000);
  };


