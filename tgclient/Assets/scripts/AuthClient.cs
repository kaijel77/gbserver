using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Windows;


public class AuthClient : MonoBehaviour
{
    private string baseUrl = "http://localhost:4700";
    private string jwtToken;
    private Data resultData;
    private string result = "";

    void Start()
    {
        StartCoroutine(connect("serwer"));
    }

    IEnumerator connect(string username)
    {
        yield return SendRequest("/login", "", "POST", username, null);

        if (resultData.isNickSetting == false) {
            Debug.Log($"StartCoroutine(gameNickName())");
            StartCoroutine(gameNickName());
        }
        else {
            Debug.Log($"StartCoroutine(gameStart())");
            StartCoroutine(gameStart());
        }
    }

    IEnumerator gameNickName()
    {
        var data = JsonUtility.ToJson(new gamecharname("zkkkwkwk"));
        Debug.Log($"🔑 gameNickName base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 gameNickName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/game/gameNickCreate", "", "POST", jwtToken, form);

        if (result == "ok")
        {
            Debug.Log($"StartCoroutine(gameStart())");
            StartCoroutine(gameStart());
        }
    }

    IEnumerator gameStart()
    {
        yield return SendRequest("/game/startGame", "", "POST", jwtToken, null);

        if (result == "ok")
        {
            Debug.Log($"StartCoroutine(Mail 확인())");
            StartCoroutine(mailList());
        }
    }


    IEnumerator mailList()
    {
        yield return SendRequest("/mail/mailList", "", "POST", jwtToken, null);
    }



    public IEnumerator send_itemList()
    {
        yield return SendRequest("/item/itemList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_itemAdd()
    {

        var data = JsonUtility.ToJson(new itemAdd(0, 20001, 2, 2));
        Debug.Log($"🔑 ItemAdd  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 ItemAdd encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/item/itemAdd", "", "POST", jwtToken, form);
    }

    public IEnumerator send_itemUse()
    {

        var data = JsonUtility.ToJson(new itemUse(11, 2));
        Debug.Log($"🔑 itemUse  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemUse encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/item/itemUse", "", "POST", jwtToken, form);
    }

    public IEnumerator send_itemRemove()
    {

        var data = JsonUtility.ToJson(new itemRemove(11));
        Debug.Log($"🔑 itemRemove  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemRemove encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/item/itemRemove", "", "POST", jwtToken, form);
    }




    public IEnumerator send_heroList()
    {
        yield return SendRequest("/hero/heroList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_heroCreate()
    {

        var data = JsonUtility.ToJson(new heroCreate(20001, 2, 2, 2));
        Debug.Log($"🔑 ItemAdd  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 ItemAdd encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/hero/heroCreate", "", "POST", jwtToken, form);
    }

    public IEnumerator send_heroLevel()
    {

        var data = JsonUtility.ToJson(new heroLevel(1, 2, 2, 2, 333));
        Debug.Log($"🔑 itemUse  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemUse encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/hero/heroLevelExp", "", "POST", jwtToken, form);
    }

    public IEnumerator send_heroLocation()
    {

        var data = JsonUtility.ToJson(new heroLocation(1, 2, 3));
        Debug.Log($"🔑 itemUse  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemUse encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/hero/heroLocation", "", "POST", jwtToken, form);
    }

    public IEnumerator send_heroRemove()
    {

        var data = JsonUtility.ToJson(new heroRemove(1));
        Debug.Log($"🔑 itemRemove  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemRemove encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/hero/heroRemove", "", "POST", jwtToken, form);
    }







    public IEnumerator send_equipList()
    {
        yield return SendRequest("/equip/equipList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_equipCreate()
    {

        var data = JsonUtility.ToJson(new equipCreate(20001, 2, 2, 2));
        Debug.Log($"🔑 ItemAdd  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 ItemAdd encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipCreate", "", "POST", jwtToken, form);
    }
    public IEnumerator send_equipInstall()
    {

        var data = JsonUtility.ToJson(new equipInstall(1, 2));
        Debug.Log($"🔑 ItemAdd  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 ItemAdd encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipInstall", "", "POST", jwtToken, form);
    }
    public IEnumerator send_equipUninstall()
    {

        var data = JsonUtility.ToJson(new equipUninstall(1));
        Debug.Log($"🔑 ItemAdd  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 ItemAdd encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipUninstall", "", "POST", jwtToken, form);
    }

    public IEnumerator send_equipLevel()
    {

        var data = JsonUtility.ToJson(new equipLevel(1, 2, 2, 2, 333));
        Debug.Log($"🔑 itemUse  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemUse encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipLevelup", "", "POST", jwtToken, form);
    }

    public IEnumerator send_equipLock()
    {

        var data = JsonUtility.ToJson(new equipLock(1, 1));
        Debug.Log($"🔑 itemUse  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemUse encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipLocked", "", "POST", jwtToken, form);
    }

    public IEnumerator send_equipRemove()
    {

        var data = JsonUtility.ToJson(new equipRemove(1));
        Debug.Log($"🔑 itemRemove  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 itemRemove encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/equip/equipRemove", "", "POST", jwtToken, form);
    }




    public IEnumerator send_deckList()
    {
        yield return SendRequest("/deck/deckList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_deckSetting()
    {

        var data = JsonUtility.ToJson(new deckSetting(1, 2, 0, 0, 0, 0, 0, 0, 0));
        Debug.Log($"🔑 deckSetting  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 deckSetting encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/deck/deckSetting", "", "POST", jwtToken, form);
    }
    public IEnumerator send_deckRemove()
    {

        var data = JsonUtility.ToJson(new deckRemove(1));
        Debug.Log($"🔑 deckRemove  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 deckRemove encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/deck/deckRemove", "", "POST", jwtToken, form);
    }




    public IEnumerator send_missionList()
    {
        yield return SendRequest("/mission/missionList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_missionUpdate()
    {
        var data = JsonUtility.ToJson(new missionUpdate(1, 2));
        Debug.Log($"🔑 missionSetting  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 missionSetting encr: {encyData}");

        form.AddField("crypt", encyData);

        yield return SendRequest("/mission/missionUpdate", "", "POST", jwtToken, form);
    }

    public IEnumerator send_missionComplete()
    {
        var data = JsonUtility.ToJson(new missionComplete(1));
        Debug.Log($"🔑 missionSetting  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 missionSetting encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/mission/missionComplete", "", "POST", jwtToken, form);
    }
    public IEnumerator send_missionReward()
    {
        var data = JsonUtility.ToJson(new missionReward(1));
        Debug.Log($"🔑 missionSetting  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 missionSetting encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/mission/missionReward", "", "POST", jwtToken, form);
    }

    public IEnumerator send_missionRemove()
    {
        var data = JsonUtility.ToJson(new missionRemove(1));
        Debug.Log($"🔑 missionRemove  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 missionRemove encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/mission/missionRemove", "", "POST", jwtToken, form);
    }




    public IEnumerator send_guildList()
    {
        yield return SendRequest("/guild/guildList", "", "POST", jwtToken, null);
    }

    public IEnumerator send_guildSearch()
    {
        var data = JsonUtility.ToJson(new guildSearch("tesguildte"));
        Debug.Log($"🔑 guildSearch  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildSearch encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildSearch", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildMemberList()
    {
        var data = JsonUtility.ToJson(new guildMemberList(1));
        Debug.Log($"🔑 guildMemberList  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildMemberList encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildMemberList", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildRequestList()
    {
        var data = JsonUtility.ToJson(new guildRequestList(1));
        Debug.Log($"🔑 guildRequestList  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildRequestList encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildRequestList", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildCheckName()
    {
        var data = JsonUtility.ToJson(new guildCheckName("tesguildte"));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildCheckName", "", "POST", jwtToken, form);
    }



    public IEnumerator send_guildCreate()
    {
        var data = JsonUtility.ToJson(new guildCreate("tesguildte"));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildCreate", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildBreakUp()
    {
        var data = JsonUtility.ToJson(new guildBreakUp(1));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildBreakUp", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildChangeName()
    {
        var data = JsonUtility.ToJson(new guildChangeName(1, "wer234"));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildChangeName", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildRequestJoin()
    {
        var data = JsonUtility.ToJson(new guildRequestJoin(1));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildRequestJoin", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildRequestCancel()
    {
        var data = JsonUtility.ToJson(new guildRequestCancel(1));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildRequestCancel", "", "POST", jwtToken, form);
    }

    public IEnumerator send_guildRequestAccept()
    {
        var data = JsonUtility.ToJson(new guildRequestAccept(1,2));
        Debug.Log($"🔑 guildCheckName  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildCheckName encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildRequestAccept", "", "POST", jwtToken, form);
    }






    public IEnumerator send_guildWithdrawal()
    {
        var data = JsonUtility.ToJson(new guildWithdrawal(1));
        Debug.Log($"🔑 guildWithdrawal  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildWithdrawal encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildWithdrawal", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildKickOut()
    {
        var data = JsonUtility.ToJson(new guildKickOut(1, 2));
        Debug.Log($"🔑 guildKickOut  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildKickOut encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildKickOut", "", "POST", jwtToken, form);
    }


    public IEnumerator send_guildChangeUserGrade()
    {
        var data = JsonUtility.ToJson(new guildChangeUserGrade(1, 2, 33));
        Debug.Log($"🔑 guildChangeUserGrade  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 guildChangeUserGrade encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/guild/guildChangeUserGrade", "", "POST", jwtToken, form);
    }




    public IEnumerator send_friendList()
    {
        yield return SendRequest("/friend/friendList", "", "POST", jwtToken, null);
    }


    public IEnumerator send_friendInviteList()
    {
        yield return SendRequest("/friend/friendInviteList", "", "POST", jwtToken, null);
    }


    public IEnumerator send_friendRequestList()
    {
        yield return SendRequest("/friend/friendRequestList", "", "POST", jwtToken, null);
    }


    public IEnumerator send_friendInvite()
    {
        var data = JsonUtility.ToJson(new friendInvite(2));
        Debug.Log($"🔑 friendInvite  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 friendInvite encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/friend/friendInvite", "", "POST", jwtToken, form);
    }


    public IEnumerator send_friendInviteCancel()
    {
        var data = JsonUtility.ToJson(new friendInviteCancel(2));
        Debug.Log($"🔑 friendInviteCancel  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 friendInviteCancel encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/friend/friendInviteCancel", "", "POST", jwtToken, form);
    }


    public IEnumerator send_friendAcceptCancel()
    {
        var data = JsonUtility.ToJson(new friendAcceptCancel(2));
        Debug.Log($"🔑 friendAcceptCancel  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 friendAcceptCancel encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/friend/friendAcceptCancel", "", "POST", jwtToken, form);
    }


    public IEnumerator send_friendAcceptConfirm()
    {
        var data = JsonUtility.ToJson(new friendAcceptConfirm(2));
        Debug.Log($"🔑 friendAcceptConfirm  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 friendAcceptConfirm encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/friend/friendAcceptConfirm", "", "POST", jwtToken, form);
    }


    public IEnumerator send_friendKickOut()
    {
        var data = JsonUtility.ToJson(new friendKickOut(2));
        Debug.Log($"🔑 friendKickOut  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 friendKickOut encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/friend/friendKickOut", "", "POST", jwtToken, form);
    }



    public IEnumerator send_buildingList()
    {
        yield return SendRequest("/building/buildingList", "", "POST", jwtToken, null);
    }


    public IEnumerator send_buildingBuild()
    {
        var data = JsonUtility.ToJson(new buildingBuild(2));
        Debug.Log($"🔑 buildingBuild  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 buildingBuild encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/building/buildingBuild", "", "POST", jwtToken, form);
    }


    public IEnumerator send_buildingUpgrade()
    {
        var data = JsonUtility.ToJson(new buildingUpgrade(2));
        Debug.Log($"🔑 buildingUpgrade  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 buildingUpgrade encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/building/buildingUpgrade", "", "POST", jwtToken, form);
    }


    public IEnumerator send_buildingEndtime()
    {
        var data = JsonUtility.ToJson(new buildingEndtime(2));
        Debug.Log($"🔑 buildingEndtime  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 buildingEndtime encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/building/buildingEndtime", "", "POST", jwtToken, form);
    }


    public IEnumerator send_buildingDestroy()
    {
        var data = JsonUtility.ToJson(new buildingDestroy(2));
        Debug.Log($"🔑 buildingDestroy  base: {data}");
        string encyData = AESUtil.Encrypt(data);
        WWWForm form = new WWWForm();
        Debug.Log($"🔑 buildingDestroy encr: {encyData}");

        form.AddField("crypt", encyData);
        yield return SendRequest("/building/buildingDestroy", "", "POST", jwtToken, form);
    }




    IEnumerator SendRequest(string endpoint, string json, string method, string header, WWWForm form)
    {
        UnityWebRequest www;
        if (method == "POST")
        {
            if (form == null)
            {
                Debug.Log($"🔑 form off:  baseUrl + endpoint");
                www = new UnityWebRequest(baseUrl + endpoint, "POST");

                byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);
                www.uploadHandler = new UploadHandlerRaw(bodyRaw);
                www.downloadHandler = new DownloadHandlerBuffer();
            }
            else
            {
                Debug.Log($"🔑 form on: baseUrl + endpoint");
                www = UnityWebRequest.Post(baseUrl + endpoint, form);
            }

            if (endpoint == "/login")
            {
                www.SetRequestHeader("user-id", header);
            }
            else
            {
                www.SetRequestHeader("td-access-token", header);
            }
        }
        else
        {
            www = UnityWebRequest.Get(baseUrl + endpoint);  
        }

//        if (!string.IsNullOrEmpty(jwtToken))
//            www.SetRequestHeader("Authorization", "Bearer " + jwtToken);

        yield return www.SendWebRequest();

        if (www.result == UnityWebRequest.Result.Success)
        {
            Debug.Log($"✅ {endpoint} 응답: {www.downloadHandler.text}");
            if (endpoint == "/login")
            {
                Login2Response result = JsonUtility.FromJson<Login2Response>(www.downloadHandler.text);
                Debug.Log($"🔑 Data 토큰: {result.data}");
                resultData = result.data;
                Debug.Log($"🔑 data2 토큰: {result.data.authToken}");
                jwtToken = result.data.authToken;
                Debug.Log($"🔑 JWT 토큰: {jwtToken}");
            }
            else if (endpoint == "/game/gameNickCreate")
            {
                gameNickCreate resultCreate = JsonUtility.FromJson<gameNickCreate>(www.downloadHandler.text);
                Debug.Log($"🔑 Data 토큰: {resultCreate.data}");
                result = resultCreate.data.result;
            }
            else if (endpoint == "/game/startGame")
            {
                result = "ok";
            }
        }
        else
        {
            Debug.LogError($"❌ 요청 실패 ({endpoint}): {www.error}");
        }
    }

}