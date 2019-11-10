window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパス
    
    const fs = require("fs");
    const path = require("path");
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    const callBleed = document.getElementById("callBleed");
    const bleedList = document.getElementById("bleedList");
    
    class ButtonEvent{
        constructor(btn,jsx){
            this.btn = btn;
            this.jsx = jsx;
            this.id = bleedList;
            this.btn.addEventListener("click",this);
        }
        
        async handleEvent(){
            let fullPath = await this.callJsx().catch(e => console.log(e));//jsxの保存処理が終えた後にファイルのパスを受け取る
            fullPath = fullPath.replace(/~\/Desktop/,dir_desktop);//デスクトップパスをnodeでも読み込めるように変換
            let content = fs.readFileSync(fullPath);//読み込み
            content = content.toString();//バイナリデータ変換
            //const bleeds = content.match(/\d+.*\d*(?=(\s\/Real\s\(Bleed(Right|Top|Left|Bottom)))/g);//数値だけ抜き取る場合
            const bleeds = content.match(/\d+.*\d*\s\/Real\s\(Bleed(Top|Bottom|Left|Right).*?\)/g);//正規表現で抜き取り
            console.log(bleeds);
            this.removeChild(this.id);
            bleeds.forEach((value,index)=>{
                const li = document.createElement("li");
                li.textContent = value;
                this.id.appendChild(li);
            });
        }
        
        callJsx(){
            return new Promise((resolve,reject)=>{
                csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                    if(!o||o=="false")reject(false);
                    resolve(o);
                });
            });
        }
        
        removeChild(parent){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
        }
        
    }
    
    const btn = new ButtonEvent(callBleed,"getFullName.jsx");
}