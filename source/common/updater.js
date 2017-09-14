import React, {
	NetInfo,
    Alert
} from 'react-native';

import codePush from 'react-native-code-push';

// check the code-push doc:
// https://github.com/Microsoft/react-native-code-push#getting-started

export function getNetStatus() {
	return NetInfo.fetch().then((netinfo=> {
		return netinfo.toUpperCase() == 'WIFI';
	}));
}

export function callCodePush(){

    //隐式更新
    codePush.sync();

    
    // let updateDialogOptions = {
    //     title: "更新提示",
    //     optionalUpdateMessage: "检测到可用的新版本，是否升级？",
    //     optionalIgnoreButtonLabel: "无视",
    //     optionalInstallButtonLabel: "升级",
    // };
    // //显式更新
	// codePush.sync(
    //     { 
    //         updateDialog: updateDialogOptions
    //     }, 
    //     (status)=>{
    //         if (status == codePush.SyncStatus.INSTALLING_UPDATE) {
               
    //         }
    //     }
    // );

    // codePush.checkForUpdate().then((update) => {
    //   if (!update) {
    //     Alert.alert("提示", "已是最新版本--", [
    //       {
    //         text: "Ok", onPress: () => {
    //           console.log("点了OK");
    //         }
    //       }
    //     ]);
    //   }
    //   else {
    //     codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
    //   }
    // });

    
}

export function update() {
	getNetStatus().done((status)=>status && callCodePush());
}