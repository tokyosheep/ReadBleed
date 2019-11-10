(function(){
    var path = activeDocument.fullName;
    saveAi(path);
    return path.toString();
    
    function saveAi(path){
        var saveOptions = new IllustratorSaveOptions();
        saveOptions.embedICCProfile = true;//profile埋め込み
        saveOptions.compressed = false;//圧縮しない
        var savePath = new File(path);
        try{
            activeDocument.saveAs(path,saveOptions);
            return true;
        }catch(e){
            alert("the file hasn't saved yet");
            return false;
            
        }
    }
})();