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

    [System.Serializable]
    public class UserData
    {
        public string username;
        public string password;
        public UserData(string u, string p)
        {
            username = u;
            password = p;
        }
    }

    [System.Serializable]
    public class cryptData
    {
        public string crypt;
        public cryptData(string u)
        {
            crypt = u;
        }
    }


    [System.Serializable]
    public class gamecharname
    {
        public string gamechar_name;
        public gamecharname(string u)
        {
            gamechar_name = u;
        }
    }

    [System.Serializable]
    public class LoginResponse
    {
        public bool success;
        public string authToken;
    }

    [System.Serializable]
    public class UserInfo
    {
        public int accountno;
        public string user_id;
        public string password;
    }

    [System.Serializable]
    public class Data
    {
        public string server_time;
        public bool isCreateAccount;
        public bool isNickSetting;
        public string authToken;
        public UserInfo userInfo;
        // serverAddress가 빈 객체 {} 이므로, 임시로 string 처리 가능
        public string serverAddress;
    }

    [System.Serializable]
    public class Login2Response
    {
        public int errorCode;
        public bool isSuccess;
        public Data data;
    }




    [System.Serializable]
    public class NickCreate
    {
        public string result;
    }

    [System.Serializable]
    public class gameNickCreate
    {
        public int errorCode;
        public bool isSuccess;
        public NickCreate data;
    }



    [System.Serializable]
    public class startgameList
    {
        public string itemList;
        public string heroList;
        public string equipList;
    }

    [System.Serializable]
    public class startGame
    {
        public int errorCode;
        public bool isSuccess;
        public startgameList data;
    }


    [System.Serializable]
    public class itemAdd
    {
        public int item_no;
        public int item_id;
        public int item_type;
        public int item_count;

        public itemAdd(int itemno, int itemid, int itemtype, int itemcount)
        {
            item_no = itemno;

            item_id = itemid;
            
            item_type = itemtype;
            
            item_count = itemcount;
        }
    }


    [System.Serializable]
    public class itemUse
    {
        public int item_no;
        public int item_count;

        public itemUse(int itemno, int itemcount)
        {
            item_count = itemcount;

            item_no = itemno;
        }
    }


    [System.Serializable]
    public class itemRemove
    {
        public int item_no;

        public itemRemove(int itemno)
        {

            item_no = itemno;
        }
    }



    [System.Serializable]
    public class heroCreate
    {
        public int hero_id;
        public int hero_type;
        public int hero_grade;
        public int hero_star;

        public heroCreate(int heroid, int herotype, int herograde, int herostar)
        {
            hero_id = heroid;

            hero_type = herotype;

            hero_grade = herograde;

            hero_star = herostar;
        }
    }


    [System.Serializable]
    public class heroLevel
    {
        public int hero_no;
        public int hero_grade;
        public int hero_star;
        public int hero_level;
        public int hero_exp;

        public heroLevel(int herono, int herograde, int herostar, int herolevel, int heroexp)
        {
            hero_no = herono;

            hero_grade = herograde;

            hero_star = herostar;

            hero_level = herolevel;

            hero_exp = heroexp;
        }
    }


    [System.Serializable]
    public class heroLocation
    {
        public int hero_no;
        public int hero_location;
        public int hero_task;

        public heroLocation(int herono, int herolocation, int herotask)
        {
            hero_no = herono;
            hero_location = herolocation;
            hero_task = herotask;
        }
    }


    [System.Serializable]
    public class heroRemove
    {
        public int hero_no;

        public heroRemove(int herono)
        {

            hero_no = herono;
        }
    }






    [System.Serializable]
    public class equipCreate
    {
        public int equip_id;
        public int equip_type;
        public int equip_grade;
        public int equip_star;

        public equipCreate(int equipid, int equiptype, int equipgrade, int equipstar)
        {
            equip_id = equipid;

            equip_type = equiptype;

            equip_grade = equipgrade;

            equip_star = equipstar;
        }
    }



    [System.Serializable]
    public class equipInstall
    {
        public int equip_no;
        public int hero_no;
        public int equip_grade;
        public int equip_star;

        public equipInstall(int equipno, int herono)
        {
            equip_no = equipno;

            hero_no = herono;
        }
    }


    [System.Serializable]
    public class equipUninstall
    {
        public int equip_no;

        public equipUninstall(int equipno)
        {
            equip_no = equipno;
        }
    }


    [System.Serializable]
    public class equipLevel
    {
        public int equip_no;
        public int equip_grade;
        public int equip_star;
        public int equip_level;
        public int equip_exp;

        public equipLevel(int equipno, int equipgrade, int equipstar, int equiplevel, int equipexp)
        {
            equip_no = equipno;

            equip_grade = equipgrade;

            equip_star = equipstar;

            equip_level = equiplevel;

            equip_exp = equipexp;
        }
    }


    [System.Serializable]
    public class equipLock
    {
        public int equip_no;
        public int equip_lock;

        public equipLock(int equipno, int equiplock)
        {
            equip_no = equipno;
            equip_lock = equiplock;
        }
    }


    [System.Serializable]
    public class equipRemove
    {
        public int equip_no;

        public equipRemove(int equipno)
        {

            equip_no = equipno;
        }
    }




    [System.Serializable]
    public class deckSetting
    {
        public int deck_type;
        public int deck_hero01;
        public int deck_hero02;
        public int deck_hero03;
        public int deck_hero04;
        public int deck_hero05;
        public int deck_hero06;
        public int deck_hero07;
        public int deck_hero08;

        public deckSetting(int decktype, int deckhero01, int deckhero02, int deckhero03, int deckhero04, int deckhero05, int deckhero06, int deckhero07, int deckhero08)
        {

            deck_type = decktype;

            deck_hero01 = deckhero01;

            deck_hero02 = deckhero02;

            deck_hero03 = deckhero03;

            deck_hero04 = deckhero04;

            deck_hero05 = deckhero05;

            deck_hero06 = deckhero06;

            deck_hero07 = deckhero07;

            deck_hero08 = deckhero08;

        }
    }



    [System.Serializable]
    public class deckRemove
    {
        public int deck_type;

        public deckRemove(int decktype)
        {
            deck_type = decktype;
        }
    }




    [System.Serializable]
    public class missionUpdate
    {
        public int mission_id;
        public int mission_count;

        public missionUpdate(int missionid, int missioncount)
        {

            mission_id = missionid;

            mission_count = missioncount;
        }
    }
    
    [System.Serializable]
    public class missionComplete
    {
        public int mission_id;

        public missionComplete(int missionid)
        {
            mission_id = missionid;
        }
    }

    [System.Serializable]
    public class missionReward
    {
        public int mission_id;

        public missionReward(int missionid)
        {
            mission_id = missionid;
        }
    }

    [System.Serializable]
    public class missionRemove
    {
        public int mission_id;

        public missionRemove(int missionid)
        {
            mission_id = missionid;
        }
    }
}