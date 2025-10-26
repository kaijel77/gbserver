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
        //StartCoroutine(Register("serwer", "1234"));
        //StartCoroutine(Login("user01", "1234"));
    }

    IEnumerator connect(string username)
    {
        yield return SendRequest("/connect", "", "POST", username, null);

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

    IEnumerator Register(string username, string password)
    {
        var body = JsonUtility.ToJson(new UserData(username, password));
        yield return SendRequest("/register", body, "POST", "", null);
    }

    IEnumerator Login(string username, string password)
    {
        var body = JsonUtility.ToJson(new UserData(username, password));
        yield return SendRequest("/login", body, "POST", "", null);

        if (!string.IsNullOrEmpty(jwtToken))
            StartCoroutine(GetProfile());
    }
    IEnumerator GetProfile()
    {
        yield return SendRequest("/profile", null, "GET", "", null);
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

            if (endpoint == "/connect")
            {
                www.SetRequestHeader("user-id", header);
            }
            else if (endpoint == "/game/gameNickCreate")
            {
                www.SetRequestHeader("td-access-token", header);
            }
            else if (endpoint == "/game/startGame")
            {
                www.SetRequestHeader("td-access-token", header);
            }
            else if (endpoint == "/mail/mailList")
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
            if (endpoint == "/connect")
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
}